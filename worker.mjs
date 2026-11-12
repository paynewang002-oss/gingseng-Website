const API_VERSION = '2026-10';
const POLICY_VERSION = '2026-11-12';
const MAX_CART_LINES = 50;
const SITE_ORIGIN = 'https://changbaishanginseng.com';
const ALLOWED_ORIGINS = new Set([SITE_ORIGIN, 'https://www.changbaishanginseng.com']);
const CURRENCIES = ['USD', 'JPY', 'KRW', 'HKD', 'SGD', 'CNY'];
const FX_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const FALLBACK_FX = {
  date: '2026-11-11',
  rates: { USD: 1, JPY: 159.23429496, KRW: 1336.90123124, HKD: 7.84560079, SGD: 1.28255594, CNY: 6.67071088 }
};
const encoder = new TextEncoder();
const adminTokens = new Map();
const catalogCache = new Map();
let fxCache;
let fxRequest;

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function json(value, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
      ...extraHeaders
    }
  });
}

function shopDomain(env) {
  const domain = String(env.SHOPIFY_STORE_DOMAIN || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
  return /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain) ? domain : '';
}

function accountUrl(env) {
  const domain = shopDomain(env);
  const candidate = env.SHOPIFY_ACCOUNT_URL || (domain ? `https://${domain}/account` : '');
  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch {
    return '';
  }
}

function checkoutConfigured(env) {
  return env.CHECKOUT_ENABLED === 'true' && Boolean(shopDomain(env) && env.SHOPIFY_STOREFRONT_TOKEN);
}

function requireDatabase(env) {
  if (!env.DB) throw new HttpError(503, 'STORAGE_UNAVAILABLE', 'The service is being prepared. Please try again shortly.');
  return env.DB;
}

function requireSameOrigin(request) {
  const origin = request.headers.get('Origin');
  const url = new URL(request.url);
  const localOrigin = ['localhost', '127.0.0.1'].includes(url.hostname) && origin === url.origin;
  if (!ALLOWED_ORIGINS.has(origin) && !localOrigin) {
    throw new HttpError(403, 'ORIGIN_REJECTED', 'Please send this request from our website.');
  }
}

async function readJson(request, limit = 8192) {
  if (!/^application\/json(?:;|$)/i.test(request.headers.get('Content-Type') || '')) {
    throw new HttpError(415, 'JSON_REQUIRED', 'Please use a JSON request.');
  }
  const bytes = await readLimitedBody(request, limit);
  try {
    const value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('object required');
    return value;
  } catch {
    throw new HttpError(400, 'INVALID_JSON', 'The request could not be read.');
  }
}

async function readLimitedBody(request, limit) {
  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > limit) throw new HttpError(413, 'BODY_TOO_LARGE', 'The request is too large.');
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new HttpError(413, 'BODY_TOO_LARGE', 'The request is too large.');
    }
    chunks.push(value);
  }
  const output = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

function emailValue(value) {
  if (typeof value !== 'string') throw new HttpError(400, 'EMAIL_REQUIRED', 'Please enter your email address.');
  const email = value.trim();
  if (email.length > 254 || !/^[^\s@<>\u0000-\u001f\u007f]+@[^\s@<>\u0000-\u001f\u007f]+\.[^\s@<>\u0000-\u001f\u007f]+$/u.test(email)) {
    throw new HttpError(400, 'INVALID_EMAIL', 'Please enter a valid email address.');
  }
  return { email, normalized: email.toLowerCase() };
}

function textValue(value, field, maximum, required = false) {
  if (value === undefined && !required) return '';
  if (typeof value !== 'string') throw new HttpError(400, 'INVALID_FIELD', `Please check the ${field} field.`);
  const text = value.trim();
  if ((required && !text) || text.length > maximum || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(text)) {
    throw new HttpError(400, 'INVALID_FIELD', `Please check the ${field} field.`);
  }
  return text;
}

function localeValue(value) {
  return ['en', 'ja', 'ko', 'zh-Hans', 'zh-Hant', 'zh-hans', 'zh-hant'].includes(value) ? value : 'en';
}

function shopifyLanguage(locale) {
  return { en: 'EN', ja: 'JA', ko: 'KO', 'zh-Hans': 'ZH_CN', 'zh-hans': 'ZH_CN', 'zh-Hant': 'ZH_TW', 'zh-hant': 'ZH_TW' }[locale] || 'EN';
}

async function digest(value) {
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function rateLimit(request, env, bucket, limit) {
  const db = requireDatabase(env);
  if (!env.FORM_RATE_SECRET) throw new HttpError(503, 'SERVICE_CONFIGURATION', 'The service is being prepared. Please try again shortly.');
  const now = Math.floor(Date.now() / 1000);
  const window = Math.floor(now / 600);
  const address = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = await digest(`${env.FORM_RATE_SECRET}\n${bucket}\n${window}\n${address}`);
  const row = await db.prepare(`
    INSERT INTO ratelimits (key, requests, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET requests = ratelimits.requests + 1
    RETURNING requests
  `).bind(key, (window + 1) * 600).first();
  if (row.requests > limit) throw new HttpError(429, 'RATE_LIMITED', 'Please wait a few minutes before trying again.');
}

async function formSubmission(request, env, kind) {
  requireSameOrigin(request);
  const body = await readJson(request);
  await rateLimit(request, env, 'forms', 12);
  if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true });
  if (body.website !== undefined && typeof body.website !== 'string') {
    throw new HttpError(400, 'INVALID_FIELD', 'Please check the form.');
  }
  const { email, normalized } = emailValue(body.email);
  const locale = localeValue(body.locale);
  const now = new Date().toISOString();
  const db = requireDatabase(env);
  const marketing = body.marketingConsent === true;
  if (kind === 'subscribe' && !marketing) {
    throw new HttpError(400, 'CONSENT_REQUIRED', 'Please confirm that you would like to receive emails.');
  }
  if (body.marketingConsent !== undefined && typeof body.marketingConsent !== 'boolean') {
    throw new HttpError(400, 'INVALID_CONSENT', 'Please check your email preference.');
  }
  const statements = [];
  if (kind === 'contact') {
    const name = textValue(body.name, 'name', 120);
    const message = textValue(body.message, 'message', 4000, true);
    statements.push(db.prepare(`
      INSERT INTO contacts (id, email, email_normalized, name, message, locale, marketing_consent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(crypto.randomUUID(), email, normalized, name, message, locale, Number(marketing), now));
  }
  if (marketing) {
    statements.push(db.prepare(`
      INSERT INTO subscribers (email_normalized, email, locale, state, email_verified, subscribed_at, updated_at)
      VALUES (?, ?, ?, 'SUBSCRIBED', 0, ?, ?)
      ON CONFLICT(email_normalized) DO UPDATE SET
        email = excluded.email, locale = excluded.locale, state = 'SUBSCRIBED', updated_at = excluded.updated_at
    `).bind(normalized, email, locale, now, now));
    statements.push(db.prepare(`
      INSERT INTO consent_events (id, email_normalized, consent, source, policy_version, created_at)
      VALUES (?, ?, 1, ?, ?, ?)
    `).bind(crypto.randomUUID(), normalized, `${kind}_form`, POLICY_VERSION, now));
  }
  await db.batch(statements);
  return json({ ok: true });
}

async function fallbackRates(env, request) {
  try {
    const response = await env.ASSETS.fetch(new Request(new URL('/data/exchange-rates.json', request.url)));
    if (response.ok) {
      const data = await response.json();
      if (data.base === 'USD' && data.rates?.USD === 1 && CURRENCIES.every(code => Number(data.rates[code]) > 0)) return data;
    }
  } catch { /* The verified rates below also support first deployment. */ }
  return FALLBACK_FX;
}

async function exchangeRates(env, request) {
  if (fxCache && fxCache.expires > Date.now()) return fxCache.value;
  if (fxRequest) return fxRequest;
  fxRequest = (async () => {
    let value;
    try {
      const response = await fetch(FX_URL, { signal: AbortSignal.timeout(7000) });
      if (!response.ok) throw new Error('FX unavailable');
      const xml = await response.text();
      const date = xml.match(/time=['"](\d{4}-\d{2}-\d{2})['"]/)[1];
      const euroRates = Object.fromEntries(Array.from(xml.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g), match => [match[1], Number(match[2])]));
      const rates = Object.fromEntries(CURRENCIES.map(code => [code, code === 'USD' ? 1 : euroRates[code] / euroRates.USD]));
      if (!CURRENCIES.every(code => Number.isFinite(rates[code]) && rates[code] > 0)) throw new Error('FX incomplete');
      value = { base: 'USD', date, rates, source: FX_URL };
    } catch {
      value = fxCache?.value || await fallbackRates(env, request);
    }
    fxCache = { value, expires: Date.now() + 30 * 60 * 1000 };
    return value;
  })();
  try {
    return await fxRequest;
  } finally {
    fxRequest = undefined;
  }
}

async function configuration(request, env) {
  const fx = await exchangeRates(env, request);
  const analytics = /^G-[A-Z0-9]+$/.test(env.GOOGLE_ANALYTICS_ID || '') ? env.GOOGLE_ANALYTICS_ID : undefined;
  return json({
    shopDomain: shopDomain(env), accountUrl: accountUrl(env), checkoutEnabled: checkoutConfigured(env),
    currencies: CURRENCIES.map(code => ({ code, rate: Number(fx.rates[code]) })),
    currencyUpdatedAt: fx.date, currencySource: FX_URL, googleAnalyticsId: analytics
  });
}

async function storefront(env, query, variables = {}) {
  const domain = shopDomain(env);
  if (!domain || !env.SHOPIFY_STOREFRONT_TOKEN) throw new HttpError(503, 'SHOP_NOT_CONNECTED', 'The shop connection is being prepared.');
  const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new HttpError(502, 'SHOP_UNAVAILABLE', 'The shop is temporarily unavailable. Please try again.');
  const result = await response.json();
  if (result.errors?.length || !result.data) throw new HttpError(502, 'SHOP_UNAVAILABLE', 'The shop is temporarily unavailable. Please try again.');
  return result.data;
}

const PRODUCT_FIELDS = `id handle title description
  images(first: 100) { nodes { url altText } }
  variants(first: 100) { nodes { id title selectedOptions { name value } price { amount currencyCode } availableForSale weight weightUnit }
    pageInfo { hasNextPage endCursor } }`;

async function liveCatalog(env, locale = 'en') {
  const language = shopifyLanguage(locale);
  const cacheKey = `${shopDomain(env)}:${env.SHOPIFY_STOREFRONT_TOKEN}:${language}`;
  const cached = catalogCache.get(cacheKey);
  if (cached?.expires > Date.now()) return cached.products;
  const products = [];
  let cursor = null;
  let more = true;
  while (more) {
    const data = await storefront(env, `query Catalog($after: String, $language: LanguageCode!) @inContext(country: US, language: $language) {
      products(first: 50, after: $after) { nodes { ${PRODUCT_FIELDS} } pageInfo { hasNextPage endCursor } }
    }`, { after: cursor, language });
    for (const product of data.products.nodes) {
      let variants = product.variants.nodes;
      let variantPage = product.variants.pageInfo;
      while (variantPage.hasNextPage) {
        const extra = await storefront(env, `query MoreVariants($id: ID!, $after: String, $language: LanguageCode!) @inContext(country: US, language: $language) {
          product(id: $id) { variants(first: 100, after: $after) {
            nodes { id title selectedOptions { name value } price { amount currencyCode } availableForSale weight weightUnit }
            pageInfo { hasNextPage endCursor }
          } }
        }`, { id: product.id, after: variantPage.endCursor, language });
        variants = variants.concat(extra.product.variants.nodes);
        variantPage = extra.product.variants.pageInfo;
      }
      if (variants.some(variant => variant.price.currencyCode !== 'USD')) {
        throw new HttpError(502, 'SHOP_CURRENCY', 'The shop currency configuration is being updated.');
      }
      products.push({
        id: product.id, handle: product.handle, title: product.title, description: product.description,
        images: product.images.nodes.map(image => ({ url: image.url, alt: image.altText || product.title })),
        variants: variants.map(variant => {
          const unit = { GRAMS: 1, KILOGRAMS: 1000, OUNCES: 28.349523125, POUNDS: 453.59237 }[variant.weightUnit];
          return {
            id: variant.id, title: variant.title, options: variant.selectedOptions,
            price: Number(variant.price.amount), available: variant.availableForSale,
            ...(variant.weight > 0 && unit ? { weightGrams: variant.weight * unit } : {})
          };
        })
      });
    }
    more = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }
  catalogCache.set(cacheKey, { products, expires: Date.now() + 60000 });
  return products;
}

async function productsResponse(request, env) {
  try {
    const products = await liveCatalog(env, localeValue(new URL(request.url).searchParams.get('locale')));
    return json({ products, currency: 'USD', source: 'shopify', checkoutEnabled: checkoutConfigured(env) });
  } catch {
    const response = await env.ASSETS.fetch(new Request(new URL('/data/catalog.json', request.url)));
    if (!response.ok) throw new HttpError(503, 'CATALOG_UNAVAILABLE', 'The product list is temporarily unavailable.');
    const catalog = await response.json();
    return json({ ...catalog, currency: 'USD', source: 'reference', checkoutEnabled: false });
  }
}

function cartLines(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > MAX_CART_LINES) {
    throw new HttpError(400, 'INVALID_CART', 'Please check the products in your bag.');
  }
  const quantities = new Map();
  for (const line of input) {
    if (!line || !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(line.variantId) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99) {
      throw new HttpError(400, 'INVALID_CART', 'Please check the products in your bag.');
    }
    const total = (quantities.get(line.variantId) || 0) + line.quantity;
    if (total > 99) throw new HttpError(400, 'INVALID_CART', 'Please check the product quantity.');
    quantities.set(line.variantId, total);
  }
  return Array.from(quantities, ([merchandiseId, quantity]) => ({ merchandiseId, quantity }));
}

function visitorConsent(request, input) {
  if (input !== undefined && (!input || typeof input !== 'object' || Array.isArray(input))) {
    throw new HttpError(400, 'INVALID_CONSENT', 'Please check your privacy choices.');
  }
  const choices = {};
  for (const [key, value] of Object.entries(input || {})) {
    if (!['analytics', 'preferences', 'marketing', 'saleOfData'].includes(key) || typeof value !== 'boolean') {
      throw new HttpError(400, 'INVALID_CONSENT', 'Please check your privacy choices.');
    }
    choices[key] = value;
  }
  if (request.headers.get('Sec-GPC') === '1') {
    choices.marketing = false;
    choices.saleOfData = false;
  }
  return Object.keys(choices).length ? choices : null;
}

async function checkout(request, env) {
  requireSameOrigin(request);
  const body = await readJson(request);
  if (!checkoutConfigured(env)) throw new HttpError(409, 'CHECKOUT_NOT_READY', 'Online checkout is being prepared. Please contact us about your order.');
  if (body.currency !== 'USD') throw new HttpError(400, 'INVALID_CURRENCY', 'Checkout uses US dollars.');
  const lines = cartLines(body.lines);
  const displayCurrency = CURRENCIES.includes(body.displayCurrency) ? body.displayCurrency : 'USD';
  const language = shopifyLanguage(body.locale);
  const privacy = visitorConsent(request, body.visitorConsent);
  await rateLimit(request, env, 'checkout', 30);
  const data = await storefront(env, `mutation Checkout($input: CartInput!, $language: LanguageCode!, $visitorConsent: VisitorConsent) @inContext(country: US, language: $language, visitorConsent: $visitorConsent) {
    cartCreate(input: $input) {
      cart { checkoutUrl totalQuantity lines(first: ${MAX_CART_LINES}) { nodes { quantity merchandise { ... on ProductVariant { id } } } } }
      userErrors { code message }
    }
  }`, { input: { lines, attributes: [{ key: 'Display currency', value: displayCurrency }] }, language, visitorConsent: privacy });
  const result = data.cartCreate;
  if (result.userErrors?.length || !result.cart) throw new HttpError(409, 'CART_UNAVAILABLE', 'A product or quantity is unavailable. Please review your bag.');
  const expected = new Map(lines.map(line => [line.merchandiseId, line.quantity]));
  const actual = result.cart.lines.nodes;
  if (actual.length !== expected.size || actual.some(line => expected.get(line.merchandise.id) !== line.quantity)) {
    throw new HttpError(409, 'CART_CHANGED', 'Product availability has changed. Please review your bag.');
  }
  const url = new URL(result.cart.checkoutUrl);
  if (url.protocol !== 'https:') throw new HttpError(502, 'CHECKOUT_UNAVAILABLE', 'Checkout is temporarily unavailable.');
  return json({ checkoutUrl: url.href });
}

async function adminAccessToken(env, force = false) {
  const domain = shopDomain(env);
  if (!domain || !env.SHOPIFY_CLIENT_ID || !env.SHOPIFY_CLIENT_SECRET) {
    throw new HttpError(503, 'ADMIN_NOT_CONNECTED', 'The store data connection is being prepared.');
  }
  const key = `${domain}:${env.SHOPIFY_CLIENT_ID}:${env.SHOPIFY_CLIENT_SECRET}`;
  const cached = adminTokens.get(key);
  if (!force && cached?.expires > Date.now()) return cached.token;
  const response = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: env.SHOPIFY_CLIENT_ID, client_secret: env.SHOPIFY_CLIENT_SECRET }),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new HttpError(502, 'ADMIN_AUTH_FAILED', 'The store data connection needs attention.');
  const data = await response.json();
  if (!data.access_token) throw new HttpError(502, 'ADMIN_AUTH_FAILED', 'The store data connection needs attention.');
  const ttl = Math.min(Number(data.expires_in) || 86400, 86400);
  adminTokens.set(key, { token: data.access_token, expires: Date.now() + Math.max(60, ttl - 3600) * 1000 });
  return data.access_token;
}

async function adminGraphql(env, query, variables) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const token = await adminAccessToken(env, attempt > 0);
    const response = await fetch(`https://${shopDomain(env)}/admin/api/${API_VERSION}/graphql.json`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(20000)
    });
    if (response.status === 401 && attempt === 0) continue;
    if (!response.ok) throw new HttpError(502, 'CUSTOMER_SYNC_FAILED', 'The store data sync needs attention.');
    const data = await response.json();
    if (data.errors?.length || !data.data) throw new HttpError(502, 'CUSTOMER_SYNC_FAILED', 'The store data sync needs attention.');
    return data.data;
  }
  throw new HttpError(502, 'CUSTOMER_SYNC_FAILED', 'The store data sync needs attention.');
}

function timestamp(value, fallback) {
  const milliseconds = Date.parse(value);
  if (Number.isFinite(milliseconds)) return new Date(milliseconds).toISOString();
  if (fallback) return fallback;
  throw new HttpError(400, 'INVALID_TIMESTAMP', 'The event timestamp is invalid.');
}

function customerId(value) {
  const id = String(value || '');
  if (/^gid:\/\/shopify\/Customer\/\d+$/.test(id)) return id;
  if (/^\d+$/.test(id)) return `gid://shopify/Customer/${id}`;
  throw new HttpError(400, 'INVALID_CUSTOMER', 'The customer identifier is invalid.');
}

function customerStatements(db, customers, now) {
  const payload = JSON.stringify(customers);
  const eligible = `SELECT c.email_normalized, MAX(c.updated_at) AS updated_at
    FROM customers c JOIN subscribers s ON s.email_normalized = c.email_normalized
    WHERE c.shopify_id IN (SELECT json_extract(value, '$.id') FROM json_each(?))
      AND c.deleted = 0 AND c.marketing_state = 'UNSUBSCRIBED'
      AND s.state = 'SUBSCRIBED' AND c.updated_at >= s.updated_at
    GROUP BY c.email_normalized`;
  return [
    db.prepare(`
      INSERT INTO customers (shopify_id, email, email_normalized, marketing_state, updated_at, deleted, synced_at)
      SELECT json_extract(value, '$.id'), json_extract(value, '$.email'), lower(json_extract(value, '$.email')),
        json_extract(value, '$.marketing'), json_extract(value, '$.updated'), 0, ?
      FROM json_each(?)
      WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key = 'shop_redacted' AND value = 'true')
      ON CONFLICT(shopify_id) DO UPDATE SET
        email = excluded.email, email_normalized = excluded.email_normalized,
        marketing_state = excluded.marketing_state, updated_at = excluded.updated_at, synced_at = excluded.synced_at
      WHERE customers.deleted = 0 AND (excluded.updated_at > customers.updated_at
        OR (excluded.updated_at = customers.updated_at AND customers.email IS NULL AND excluded.email IS NOT NULL))
    `).bind(now, payload),
    db.prepare(`INSERT INTO consent_events (id, email_normalized, consent, source, policy_version, created_at)
      SELECT lower(hex(randomblob(16))), email_normalized, 0, 'shopify_unsubscribe', ?, updated_at
      FROM (${eligible})`).bind(POLICY_VERSION, payload),
    db.prepare(`WITH withdrawals AS (${eligible})
      UPDATE subscribers SET state = 'UNSUBSCRIBED',
        updated_at = (SELECT updated_at FROM withdrawals WHERE withdrawals.email_normalized = subscribers.email_normalized)
      WHERE email_normalized IN (SELECT email_normalized FROM withdrawals)`).bind(payload)
  ];
}

async function hmacValid(bytes, signature, secret) {
  if (!signature || !secret) return false;
  try {
    const signatureBytes = Uint8Array.from(atob(signature), character => character.charCodeAt(0));
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    return await crypto.subtle.verify('HMAC', key, signatureBytes, bytes);
  } catch {
    return false;
  }
}

async function webhook(request, env) {
  const secret = env.SHOPIFY_WEBHOOK_SECRET || env.SHOPIFY_CLIENT_SECRET;
  if (!secret || !shopDomain(env)) throw new HttpError(503, 'WEBHOOK_NOT_CONFIGURED', 'The connection is being prepared.');
  const bytes = await readLimitedBody(request, 256 * 1024);
  if (!await hmacValid(bytes, request.headers.get('X-Shopify-Hmac-Sha256'), secret)) {
    throw new HttpError(401, 'INVALID_SIGNATURE', 'The webhook signature is invalid.');
  }
  if (request.headers.get('X-Shopify-Shop-Domain') !== shopDomain(env)) {
    throw new HttpError(401, 'SHOP_MISMATCH', 'The webhook store is invalid.');
  }
  const topic = request.headers.get('X-Shopify-Topic') || '';
  const supported = ['customers/create', 'customers/update', 'customers/delete', 'customers/redact', 'shop/redact', 'customers/data_request'];
  if (!supported.includes(topic)) return json({ ok: true, ignored: true });
  const identifier = request.headers.get('X-Shopify-Event-Id') || request.headers.get('X-Shopify-Webhook-Id');
  if (!identifier || !/^[\w-]{1,128}$/.test(identifier)) throw new HttpError(400, 'EVENT_ID_REQUIRED', 'A webhook event identifier is required.');
  let body;
  try {
    body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('object required');
  } catch {
    throw new HttpError(400, 'INVALID_JSON', 'The webhook could not be read.');
  }
  const db = requireDatabase(env);
  const eventId = `${topic}:${identifier}`;
  if (await db.prepare('SELECT 1 FROM webhook_events WHERE event_id = ?').bind(eventId).first()) return json({ ok: true });
  const now = new Date().toISOString();
  const statements = [];
  let subject = null;
  if (topic === 'customers/create' || topic === 'customers/update') {
    subject = customerId(body.admin_graphql_api_id || body.id);
    const email = typeof body.email === 'string' ? emailValue(body.email).email : null;
    const marketing = body.email_marketing_consent?.state?.toUpperCase() || (body.accepts_marketing === true ? 'SUBSCRIBED' : 'NOT_SUBSCRIBED');
    statements.push(...customerStatements(db, [{
      id: subject, email, marketing,
      updated: timestamp(body.updated_at || request.headers.get('X-Shopify-Triggered-At'), now)
    }], now));
  }
  if (topic === 'customers/delete' || topic === 'customers/redact') {
    subject = customerId(body.customer?.id || body.admin_graphql_api_id || body.id);
    if (topic === 'customers/redact') {
      const suppliedEmail = typeof body.customer?.email === 'string' ? body.customer.email.toLowerCase() : '';
      for (const table of ['contacts', 'subscribers', 'consent_events']) {
        statements.push(db.prepare(`DELETE FROM ${table} WHERE email_normalized = ? OR email_normalized IN
          (SELECT email_normalized FROM customers WHERE shopify_id = ? AND email_normalized IS NOT NULL)`)
          .bind(suppliedEmail, subject));
      }
    }
    statements.push(db.prepare(`
      INSERT INTO customers (shopify_id, email, email_normalized, marketing_state, updated_at, deleted, synced_at)
      VALUES (?, NULL, NULL, 'REDACTED', ?, 1, ?)
      ON CONFLICT(shopify_id) DO UPDATE SET email = NULL, email_normalized = NULL,
        marketing_state = 'REDACTED', deleted = 1, updated_at = MAX(customers.updated_at, excluded.updated_at), synced_at = excluded.synced_at
    `).bind(subject, timestamp(body.updated_at || request.headers.get('X-Shopify-Triggered-At'), now), now));
  }
  if (topic === 'shop/redact') {
    statements.push(db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES ('shop_redacted', 'true', ?)
      ON CONFLICT(key) DO UPDATE SET value = 'true', updated_at = excluded.updated_at`).bind(now));
    statements.push(db.prepare('DELETE FROM customers'));
    statements.push(db.prepare("DELETE FROM settings WHERE key IN ('customer_sync_state', 'customer_sync_lease')"));
  }
  if (topic === 'customers/data_request' && body.customer?.id) subject = customerId(body.customer.id);
  statements.push(db.prepare(`INSERT OR IGNORE INTO webhook_events (event_id, topic, subject_id, received_at) VALUES (?, ?, ?, ?)`)
    .bind(eventId, topic, subject, now));
  await db.batch(statements);
  return json({ ok: true });
}

async function syncCustomers(env) {
  const db = requireDatabase(env);
  if (await db.prepare("SELECT 1 FROM settings WHERE key = 'shop_redacted' AND value = 'true'").first()) {
    return { skipped: true, reason: 'shop_redacted' };
  }
  const lease = crypto.randomUUID();
  const nowSeconds = Math.floor(Date.now() / 1000);
  const now = new Date().toISOString();
  const claimed = await db.prepare(`
    INSERT INTO settings (key, value, updated_at, expires_at) VALUES ('customer_sync_lease', ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at, expires_at = excluded.expires_at
    WHERE COALESCE(settings.expires_at, 0) < ? RETURNING value
  `).bind(lease, now, nowSeconds + 600, nowSeconds).first();
  if (!claimed || claimed.value !== lease) return { running: true };
  try {
    const saved = await db.prepare("SELECT value FROM settings WHERE key = 'customer_sync_state'").first();
    let state = saved ? JSON.parse(saved.value) : {};
    if (!state.until) {
      state = { since: state.completedThrough ? new Date(Date.parse(state.completedThrough) - 300000).toISOString() : null,
        until: now, after: null, completedThrough: state.completedThrough || null };
    }
    let processed = 0;
    let emails = 0;
    let complete = false;
    for (let page = 0; page < 4; page++) {
      const query = `${state.since ? `updated_at:>='${state.since}' ` : ''}updated_at:<='${state.until}'`;
      const data = await adminGraphql(env, `query CustomerSync($after: String, $query: String!) {
        customers(first: 100, after: $after, query: $query, sortKey: ID) {
          nodes { id updatedAt defaultEmailAddress { emailAddress marketingState } }
          pageInfo { hasNextPage endCursor }
        }
      }`, { after: state.after, query });
      const records = data.customers.nodes;
      const customers = records.map(customer => {
        const email = customer.defaultEmailAddress?.emailAddress || null;
        if (email) emails++;
        return { id: customerId(customer.id), email,
          marketing: customer.defaultEmailAddress?.marketingState || 'NOT_SUBSCRIBED', updated: timestamp(customer.updatedAt) };
      });
      const statements = customerStatements(db, customers, now);
      processed += records.length;
      complete = !data.customers.pageInfo.hasNextPage;
      state = complete ? { completedThrough: state.until } : { ...state, after: data.customers.pageInfo.endCursor };
      statements.push(db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES ('customer_sync_state', ?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`)
        .bind(JSON.stringify(state), new Date().toISOString()));
      statements.push(db.prepare("DELETE FROM settings WHERE key = 'customer_sync_error'"));
      await db.batch(statements);
      if (complete) break;
    }
    return { processed, emails, complete, completedThrough: state.completedThrough || null };
  } finally {
    await db.prepare("DELETE FROM settings WHERE key = 'customer_sync_lease' AND value = ?").bind(lease).run();
  }
}

async function requireAdmin(request, env) {
  if (!env.ADMIN_TOKEN) throw new HttpError(503, 'ADMIN_NOT_CONFIGURED', 'Administration is being prepared.');
  const supplied = request.headers.get('Authorization') || '';
  const expected = `Bearer ${env.ADMIN_TOKEN}`;
  const a = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(supplied)));
  const b = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(expected)));
  let difference = 0;
  for (let index = 0; index < a.length; index++) difference |= a[index] ^ b[index];
  if (difference) throw new HttpError(401, 'UNAUTHORIZED', 'Authentication is required.');
}

function csvCell(value) {
  let text = String(value ?? '');
  if (/^[\s]*[=+\-@]/u.test(text) || /^[\t\r\n]/u.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv(request, env) {
  const db = requireDatabase(env);
  const type = new URL(request.url).searchParams.get('type') || 'customers';
  const definitions = {
    customers: { columns: ['shopify_id', 'email', 'marketing_state', 'updated_at'], key: 'shopify_id', filter: 'deleted = 0 AND email IS NOT NULL' },
    contacts: { columns: ['id', 'email', 'name', 'message', 'locale', 'marketing_consent', 'created_at'], key: 'id', filter: '1 = 1' }
  };
  const definition = definitions[type];
  if (!definition) throw new HttpError(400, 'INVALID_EXPORT', 'Choose customers or contacts.');
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode('\uFEFF' + definition.columns.map(csvCell).join(',') + '\r\n'));
        let cursor = '';
        while (true) {
          const result = await db.prepare(`SELECT ${definition.columns.join(', ')} FROM ${type}
            WHERE ${definition.filter} AND ${definition.key} > ? ORDER BY ${definition.key} LIMIT 500`).bind(cursor).all();
          const rows = result.results || [];
          if (!rows.length) break;
          const output = rows.map(row => definition.columns.map(column => csvCell(row[column])).join(',')).join('\r\n') + '\r\n';
          controller.enqueue(encoder.encode(output));
          cursor = rows.at(-1)[definition.key];
        }
        controller.close();
      } catch {
        controller.error(new Error('Export interrupted. Please retry.'));
      }
    }
  });
  return new Response(stream, { headers: {
    'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${type}.csv"`,
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex'
  } });
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

async function dynamicProductPage(request, env, missing) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/(?:((?:ja|ko|zh-hans|zh-hant))\/)?products\/([a-z0-9][a-z0-9-]*)\/?$/);
  if (!match || !['GET', 'HEAD'].includes(request.method)) return missing;
  const [, locale, handle] = match;
  const product = (await liveCatalog(env, locale || 'en')).find(item => item.handle === handle);
  if (!product) return missing;
  const route = `${locale ? `/${locale}` : ''}/products/${handle}/`;
  if (!url.pathname.endsWith('/')) return Response.redirect(`${url.origin}${route}${url.search}`, 308);
  const templatePath = `${locale ? `/${locale}` : ''}/products/_template/`;
  const template = await env.ASSETS.fetch(new Request(new URL(templatePath, url), { headers: { Accept: 'text/html' } }));
  if (!template.ok) throw new HttpError(503, 'PRODUCT_PAGE_UNAVAILABLE', 'The product page is being prepared. Please try again shortly.');
  const title = escapeHtml(product.title);
  const description = escapeHtml(product.description.slice(0, 180));
  const canonical = `${SITE_ORIGIN}${route}`;
  const structured = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.title,
    description: product.description, image: product.images.map(item => item.url), url: canonical,
    ...(product.variants.length ? { offers: {
      '@type': 'AggregateOffer', priceCurrency: 'USD',
      lowPrice: Math.min(...product.variants.map(item => item.price)),
      highPrice: Math.max(...product.variants.map(item => item.price)), offerCount: product.variants.length,
      availability: `https://schema.org/${product.variants.some(item => item.available) ? 'InStock' : 'OutOfStock'}`, url: canonical
    } } : {})
  };
  let html = (await template.text()).replaceAll('products/_template', `products/${handle}`)
    .replace(/<meta name="robots"[^>]*>/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title} | Changbaishan Ginseng</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title"[^>]*>/, () => `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description"[^>]*>/, () => `<meta property="og:description" content="${description}">`)
    .replace(/(<h1\b[^>]*data-dynamic-product-title[^>]*>)[\s\S]*?(<\/h1>)/, (_, open, close) => `${open}${title}${close}`)
    .replace(/(<p\b[^>]*data-dynamic-product-description[^>]*>)[\s\S]*?(<\/p>)/, (_, open, close) => `${open}${escapeHtml(product.description)}${close}`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  if (product.images[0]) {
    html = html.replace(/<meta property="og:image"[^>]*>/, () => `<meta property="og:image" content="${escapeHtml(product.images[0].url)}">`);
  }
  html = html.replace('</head>', () => `<script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script></head>`);
  const headers = new Headers(template.headers);
  for (const name of ['Content-Length', 'ETag', 'Last-Modified', 'X-Robots-Tag']) headers.delete(name);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=60');
  return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers });
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  if (path === '/api/shopify/webhooks' && request.method === 'POST') return webhook(request, env);
  if (path.startsWith('/api/admin/')) {
    await requireAdmin(request, env);
    if (path === '/api/admin/sync' && request.method === 'POST') return json(await syncCustomers(env));
    if (path === '/api/admin/export' && request.method === 'GET') return exportCsv(request, env);
    throw new HttpError(404, 'NOT_FOUND', 'The requested service was not found.');
  }
  if (path === '/api/config' && request.method === 'GET') return configuration(request, env);
  if (path === '/api/products' && request.method === 'GET') return productsResponse(request, env);
  if (path === '/api/contact' && request.method === 'POST') return formSubmission(request, env, 'contact');
  if (path === '/api/subscribe' && request.method === 'POST') return formSubmission(request, env, 'subscribe');
  if (path === '/api/checkout' && request.method === 'POST') return checkout(request, env);
  if (path === '/account' && request.method === 'GET') {
    const destination = accountUrl(env);
    if (!destination) throw new HttpError(503, 'ACCOUNT_NOT_CONNECTED', 'Customer accounts are being prepared. Please contact us for help.');
    return Response.redirect(destination, 302);
  }
  if (path.startsWith('/api/')) throw new HttpError(404, 'NOT_FOUND', 'The requested service was not found.');
  const asset = await env.ASSETS.fetch(request);
  return asset.status === 404 ? dynamicProductPage(request, env, asset) : asset;
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      if (error instanceof HttpError) return json({ ok: false, error: error.code, message: error.message }, error.status,
        error.status === 429 ? { 'Retry-After': '600' } : {});
      return json({ ok: false, error: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable. Please try again.' }, 503);
    }
  },
  async scheduled(event, env, context) {
    context.waitUntil((async () => {
      const db = requireDatabase(env);
      await db.prepare('DELETE FROM ratelimits WHERE expires_at < ?').bind(Math.floor(Date.now() / 1000)).run();
      try {
        await syncCustomers(env);
      } catch {
        await db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES ('customer_sync_error', 'sync_failed', ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`).bind(new Date().toISOString()).run();
      }
    })());
  }
};

export { cartLines, csvCell, emailValue, hmacValid, syncCustomers, visitorConsent };
