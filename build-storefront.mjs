import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { languages, ui } from './content/ui.mjs';
import { retailUi } from './content/retail-ui.mjs';
import { homeContent, homeSources } from './content/home.mjs';
import { articles, about } from './content/editorial.mjs';
import { policyPages } from './content/policies.mjs';

const origin = 'https://changbaishanginseng.com';
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const pathFor = (language, route = '') => `${language.path}${route ? `${route.replace(/^\/+|\/+$/g, '')}/` : ''}`;
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const price = amount => `US$${Number(amount).toFixed(2)}`;
const catalog = JSON.parse(await readFile(new URL('./content/catalog.json', import.meta.url), 'utf8'));
const exchangeRates = JSON.parse(await readFile(new URL('./content/exchange-rates.json', import.meta.url), 'utf8'));
const products = catalog.map(product => ({
  key: product.key, id: `reference:${product.key}`,
  handle: product.source_url.split('/products/')[1], title: product.title,
  description: ui.en.productDescriptions[product.key],
  images: product.images.map(image => ({ url: image.url, alt: product.title })),
  variants: product.variants.map(variant => ({
    id: `reference:${variant.source_sku}`, title: variant.options.join(' / '),
    options: variant.options.filter(option => option !== 'Default Title').map((value, index) => ({ name: index ? 'Weight' : 'Size', value })),
    price: Number(variant.price_usd), available: true
  }))
}));

function icon(name) {
  const shapes = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    account: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${shapes[name]}</svg>`;
}

function inline(markdown) {
  return escape(markdown)
    .replace(/\[([^\]]+)\]\(((?:https:\/\/|mailto:|tel:|\/|#)[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function sectionCopy(sections) {
  return sections.map(section => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map(paragraph => `<p>${inline(paragraph)}</p>`).join('')}</section>`).join('');
}

function productCard(product, language) {
  const c = ui[language.code];
  const r = retailUi[language.code];
  const minimum = Math.min(...product.variants.map(variant => variant.price));
  const href = pathFor(language, `products/${product.handle}`);
  return `<article class="product-card" data-product-card="${escape(product.handle)}">
    <a class="product-card-image" href="${href}"><img src="${product.images[0].url}" width="800" height="800" loading="lazy" alt="${escape(c.productTitles[product.key])}"></a>
    <div class="product-card-copy"><h3><a href="${href}">${escape(r.cardTitles[product.key])}</a></h3>
      <p class="product-card-details">${escape(r.cardDetails[product.key])}</p>
      <p class="product-card-price">${product.variants.length > 1 ? `<span>${c.from}</span> ` : ''}<span data-price="${minimum}">${price(minimum)}</span></p>
      <a class="product-card-action" href="${href}" aria-label="${escape(`${r.viewProduct} ${c.productTitles[product.key]}`)}">${r.viewProduct}</a>
    </div></article>`;
}

function articleCard(article, language) {
  const copy = article.translations[language.code];
  const href = pathFor(language, `knowledge/${article.slug}`);
  return `<article class="article-card"><a class="article-image" href="${href}"><img src="${article.image}" width="960" height="640" loading="lazy" alt="${escape(copy.title)}"></a><h3><a href="${href}">${escape(copy.title)}</a></h3></article>`;
}

function header(language, route) {
  const c = ui[language.code];
  const selected = route.split('/')[0];
  return `<a class="skip" href="#main">${c.skip}</a><header class="site-header"><a class="brand" href="${language.path}">Changbaishan Ginseng</a><nav class="main-nav" aria-label="${c.home}">${[['products', c.products], ['knowledge', c.knowledge], ['about', c.about]].map(([slug, label]) => `<a href="${pathFor(language, slug)}"${selected === slug ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav><div class="header-tools"><a class="icon-button cart-link" href="${pathFor(language, 'cart')}" data-open-cart aria-label="${c.cart}">${icon('bag')}<span class="cart-count" data-cart-count hidden>0</span></a><label class="currency-control"><span class="visually-hidden">${c.currency}</span><select data-currency aria-label="${c.currency}">${['USD', 'JPY', 'KRW', 'HKD', 'SGD'].map(code => `<option value="${code}">${code}</option>`).join('')}</select></label><details class="language-menu"><summary aria-label="${c.language}" title="${c.language}">${icon('globe')}</summary><nav aria-label="${c.language}">${languages.map(other => `<a href="${pathFor(other, route)}" lang="${other.code}" hreflang="${other.code}"${other.code === language.code ? ' aria-current="page"' : ''}>${other.label}</a>`).join('')}</nav></details><a class="icon-button account-link" href="/account/" aria-label="${c.account}" title="${c.account}">${icon('account')}<span>${c.account}</span></a></div></header>`;
}

function footer(language) {
  const c = ui[language.code];
  return `<section class="newsletter"><div><h2>${c.newsletterTitle}</h2></div><form data-newsletter><div class="email-row"><label class="visually-hidden" for="newsletter-email">${c.email}</label><input id="newsletter-email" name="email" type="email" autocomplete="email" maxlength="254" placeholder="${c.email}" required><button class="button" type="submit">${c.subscribe}</button></div><label class="check-label"><input type="checkbox" name="marketingConsent" required><span>${c.marketingConsent}</span></label><div class="form-trap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><p class="form-status" role="status" aria-live="polite"></p></form></section><footer class="site-footer"><div class="footer-main"><a class="brand" href="${language.path}">Changbaishan Ginseng</a><p>${c.contact}</p><a href="mailto:service@changbaishanginseng.com">service@changbaishanginseng.com</a><a href="tel:+8615500376880">+86 15500376880</a></div><div class="footer-links">${policyPages.map(policy => `<a href="${pathFor(language, `policies/${policy.slug}`)}">${escape(policy.translations[language.code].title)}</a>`).join('')}<button type="button" class="text-button" data-privacy-choices>${c.privacyChoices}</button><a href="${pathFor(language, 'about')}#contact">${c.contact}</a></div><div class="footer-business"><p>${c.business}</p><p lang="zh-Hans">吉林白山传奇生态农业科技有限公司</p><p>${c.address}</p></div><div class="footer-bottom"><p>© ${new Date().getUTCFullYear()} Changbaishan Ginseng</p><p>${c.approximate}</p></div></footer>`;
}

function cartContent(c) {
  return `<div data-cart-contents></div><div class="cart-totals" data-cart-totals hidden><div class="subtotal-row"><span>${c.subtotal}</span><strong data-cart-subtotal></strong></div><p class="fine-print">${c.totalNote}</p><button class="button checkout-button" type="button" data-checkout>${c.checkout}</button><p class="cart-status form-status" role="status" aria-live="polite"></p></div>`;
}

function dialogs(c) {
  return `<dialog id="cart-dialog" class="cart-dialog" aria-labelledby="cart-dialog-title"><div class="dialog-heading"><h2 id="cart-dialog-title">${c.cart}</h2><button class="icon-button" type="button" data-close-dialog aria-label="${c.close}">${icon('close')}</button></div>${cartContent(c)}</dialog><aside class="cookie-banner" id="cookie-banner" aria-label="${c.cookieTitle}" hidden><div><h2>${c.cookieTitle}</h2><p>${c.cookieText}</p></div><div class="cookie-actions"><button class="button button-secondary" data-consent="essential">${c.essentialOnly}</button><button class="button" data-consent="all">${c.acceptAll}</button><button class="text-button" data-privacy-choices>${c.privacyChoices}</button></div></aside><dialog id="privacy-dialog" class="privacy-dialog" aria-labelledby="privacy-dialog-title"><div class="dialog-heading"><h2 id="privacy-dialog-title">${c.cookieTitle}</h2><button class="icon-button" type="button" data-close-dialog aria-label="${c.close}">${icon('close')}</button></div><p>${c.cookieText}</p><p class="fine-print">${c.privacyScope} <a href="https://privacy.shopify.com/" target="_blank" rel="noopener noreferrer">${c.shopifyPrivacy}</a></p><label class="check-label"><input type="checkbox" id="consent-analytics"><span>${c.analytics}</span></label><label class="check-label"><input type="checkbox" id="consent-marketing"><span>${c.advertising}</span></label><p class="fine-print" data-gpc-notice hidden>${c.gpc}</p><button class="button" type="button" data-save-consent>${c.saveChoices}</button></dialog>`;
}

async function home(language) {
  const c = ui[language.code];
  const h = homeContent[language.code];
  const r = retailUi[language.code];
  return `<section class="forest-hero"><picture><source media="(max-width:620px)" srcset="/images/forest-ginseng-15-mobile.webp"><img src="/images/forest-ginseng-15.webp" width="1920" height="1281" alt="${c.companyPhoto}" fetchpriority="high"></picture><div class="hero-copy"><p>${r.origin}</p><h1>${r.homeHeading}</h1><a class="button" href="${pathFor(language, 'products')}">${c.browse}</a></div></section>
    <section class="home-products section-wrap"><div class="section-heading"><h2>${c.productsTitle}</h2><a href="${pathFor(language, 'products')}">${c.products}</a></div><div class="product-grid" data-product-list="featured">${products.map(product => productCard(product, language)).join('')}</div><p class="fine-print">${c.shippingNote}</p></section>
    <section class="home-origin"><figure><img src="/images/changbai-tianchi.jpg" width="1600" height="1067" loading="lazy" alt="${h.lake}"></figure><div><h2>${r.origin}</h2><p>${h.history}</p><a href="${pathFor(language, 'about')}">${c.about}</a></div></section>
    <section class="section-wrap knowledge-section"><div class="section-heading"><h2>${c.knowledgeTitle}</h2><a href="${pathFor(language, 'knowledge')}">${c.allArticles}</a></div><div class="article-grid">${articles.map(article => articleCard(article, language)).join('')}</div></section>
    <div class="source-notes section-wrap"><details><summary>${h.sourceTitle}</summary><ul>${homeSources.map((url, index) => `<li><a href="${url}">${h.sources[index]}</a></li>`).join('')}</ul><p>${h.photos} <a href="https://commons.wikimedia.org/wiki/File:Tianchi_Lake_of_Changbai_20130714.jpeg">${h.mountainCredit}</a> <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>. ${h.photoNote}</p></details></div>`;
}

function productPage(product, language) {
  const c = ui[language.code];
  const selected = product.variants[0];
  const r = retailUi[language.code];
  return `<div class="breadcrumbs section-wrap"><a href="${pathFor(language, 'products')}">${c.products}</a></div><section class="product-detail section-wrap" data-product-detail="${product.handle}"><div class="product-gallery"><div class="product-main-image"><img data-gallery-main src="${product.images[0].url}" width="800" height="800" alt="${escape(c.productTitles[product.key])}" fetchpriority="high"></div><div class="gallery-thumbnails">${product.images.map((image, index) => `<button type="button" data-gallery-image="${image.url}" aria-label="${escape(c.productTitles[product.key])} ${index + 1}" aria-pressed="${index === 0}"><img src="${image.url}" width="90" height="90" alt="" loading="lazy"></button>`).join('')}</div></div><div class="product-info"><h1>${escape(r.cardTitles[product.key])}</h1><p class="detail-price"><span data-product-price data-price="${selected.price}">${price(selected.price)}</span></p><p class="fine-print converted-note" data-converted-note hidden>${c.approximate}</p><p>${escape(r.cardDetails[product.key])}</p><form data-add-product="${product.handle}">${product.variants.length > 1 ? `<label class="field-label" for="product-variant">${c.size}</label><select id="product-variant" name="variant" data-variant-select>${product.variants.map((variant, index) => `<option value="${index}">${escape(variant.title)}</option>`).join('')}</select>` : '<input type="hidden" name="variant" value="0">'}<div class="purchase-row"><div><label class="field-label" for="product-quantity">${c.quantity}</label><input id="product-quantity" name="quantity" type="number" inputmode="numeric" min="1" max="99" value="1" required></div><button type="submit" class="button">${c.add}</button></div><p class="form-status" role="status" aria-live="polite"></p></form><div class="product-delivery"><p>${c.shippingNote}</p><p><a href="${pathFor(language, 'policies/shipping')}">${c.deliveryNote}</a></p><p><a href="${pathFor(language, 'policies/returns')}">${c.returns}</a></p></div></div></section><section class="section-wrap product-related"><div class="section-heading"><h2>${c.next}</h2><a href="${pathFor(language, 'knowledge')}">${c.knowledge}</a></div><div class="article-grid">${articles.slice(0, 2).map(article => articleCard(article, language)).join('')}</div></section>`;
}

function dynamicProductPage(language) {
  const c = ui[language.code];
  const r = retailUi[language.code];
  return `<div class="breadcrumbs section-wrap"><a href="${pathFor(language, 'products')}">${c.products}</a></div>
    <section class="product-detail section-wrap" data-dynamic-product data-product-detail="">
      <div class="product-gallery"><div class="product-main-image"><img data-dynamic-product-image width="800" height="800" alt="" hidden><p data-image-placeholder>${r.imageUnavailable}</p></div><div class="gallery-thumbnails"></div></div>
      <div class="product-info"><h1 data-dynamic-product-title>${r.loadingProduct}</h1><p class="detail-price"><span data-product-price></span></p><p class="fine-print converted-note" data-converted-note hidden>${c.approximate}</p><p data-dynamic-product-description></p><div data-dynamic-product-purchase></div>
        <div class="product-delivery"><p>${c.shippingNote}</p><p><a href="${pathFor(language, 'policies/shipping')}">${c.deliveryNote}</a></p><p><a href="${pathFor(language, 'policies/returns')}">${c.returns}</a></p></div>
      </div></section>`;
}

function aboutPage(language) {
  const c = ui[language.code];
  const r = retailUi[language.code];
  const scenes = `<div class="about-scenes section-wrap">${about.gallery.slice(0, 2).map((image, index) => `<figure><img src="${image}" width="1200" height="800" loading="lazy" alt="${escape(r.scenes[index])}"><figcaption>${r.scenes[index]}</figcaption></figure>`).join('')}</div>`;
  return `<section class="about-hero"><div><h1>${c.about}</h1><p class="lead">${r.family}</p><p>${r.base}</p><p class="fine-print">${r.location}</p></div><img src="${about.image || '/images/owned-base-ginseng.jpg'}" width="1400" height="934" alt="${c.companyPhoto}" fetchpriority="high"></section>${scenes}<section class="contact-section" id="contact"><div><h2>${c.contactTitle}</h2><p>${c.contactIntro}</p><p><a href="mailto:service@changbaishanginseng.com">service@changbaishanginseng.com</a><br><a href="tel:+8615500376880">+86 15500376880</a></p><p class="fine-print">${c.address}</p></div><form data-contact><label class="field-label" for="contact-email">${c.email}</label><input type="email" id="contact-email" name="email" autocomplete="email" maxlength="254" required><label class="field-label" for="contact-name">${c.name}</label><input type="text" id="contact-name" name="name" autocomplete="name" maxlength="100"><label class="field-label" for="contact-message">${c.message}</label><textarea id="contact-message" name="message" rows="6" maxlength="4000" required></textarea><label class="check-label"><input type="checkbox" name="marketingConsent"><span>${c.marketingConsent}</span></label><div class="form-trap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><p class="fine-print"><a href="${pathFor(language, 'policies/privacy')}">${c.privacyNotice}</a></p><button type="submit" class="button">${c.send}</button><p class="form-status" role="status" aria-live="polite"></p></form></section>`;
}

const pages = [];
for (const language of languages) {
  const c = ui[language.code];
  pages.push({ language, route: '', title: homeContent[language.code].title, description: homeContent[language.code].description, kind: 'home', body: await home(language), image: '/images/forest-ginseng-15.webp' });
  pages.push({ language, route: 'products', title: c.productsTitle, description: c.productsIntro, kind: 'products', body: `<section class="page-intro forest-intro"><h1>${c.productsTitle}</h1></section><section class="section-wrap shop-section"><div class="product-grid" data-product-list="all">${products.map(product => productCard(product, language)).join('')}</div><p class="fine-print">${c.shippingNote}</p><p class="fine-print converted-note" data-converted-note hidden>${c.approximate}</p></section>` });
  for (const product of products) pages.push({ language, route: `products/${product.handle}`, title: c.productTitles[product.key], description: c.productDescriptions[product.key], kind: 'product', product, body: productPage(product, language), image: product.images[0].url });
  pages.push({ language, route: 'products/_template', title: c.products, description: c.productsIntro, kind: 'product', noindex: true, template: true, body: dynamicProductPage(language) });
  pages.push({ language, route: 'knowledge', title: c.knowledgeTitle, description: c.knowledgeIntro, kind: 'knowledge', body: `<section class="page-intro forest-intro knowledge-intro"><h1>${c.knowledgeTitle}</h1></section><section class="section-wrap knowledge-index"><div class="article-grid">${articles.map(article => articleCard(article, language)).join('')}</div></section>` });
  for (const article of articles) {
    const copy = article.translations[language.code];
    pages.push({ language, route: `knowledge/${article.slug}`, title: copy.title, description: copy.description, kind: 'article', article, image: article.image, body: `<div class="breadcrumbs section-wrap"><a href="${pathFor(language, 'knowledge')}">${c.knowledge}</a></div><article class="article"><div class="article-heading"><h1>${escape(copy.title)}</h1><p class="lead">${escape(copy.description)}</p></div><img class="article-cover" data-article-slug="${article.slug}" src="${article.image}" width="1200" height="800" alt="${escape(copy.title)}" fetchpriority="high"><div class="prose">${sectionCopy(copy.sections)}<section class="article-sources"><h2>${c.source}</h2><ul>${article.sources.map(source => `<li><a href="${escape(source.url)}">${escape(source.title)}</a></li>`).join('')}</ul></section></div></article>` });
  }
  pages.push({ language, route: 'about', title: c.aboutTitle, description: c.contactIntro, kind: 'about', body: aboutPage(language), image: about.image || '/images/owned-base-ginseng.jpg' });
  for (const policy of policyPages) {
    const copy = policy.translations[language.code];
    pages.push({ language, route: `policies/${policy.slug}`, title: copy.title, description: copy.description, kind: 'policy', noindex: true, body: `<section class="policy-heading forest-intro"><h1>${escape(copy.title)}</h1></section><article class="policy prose"><p class="fine-print">${c.updated} <time datetime="2026-11-12">2026-11-12</time></p>${copy.description ? `<p class="lead">${escape(copy.description)}</p>` : ''}${sectionCopy(copy.sections)}${policy.slug === 'privacy' ? `<section id="privacy-choices"><h2>${c.privacyChoices}</h2><button class="button" type="button" data-privacy-choices>${c.privacyChoices}</button></section>` : ''}</article>` });
  }
  pages.push({ language, route: 'cart', title: c.cart, description: c.cart, kind: 'cart', noindex: true, body: `<section class="cart-page section-wrap"><h1>${c.cart}</h1>${cartContent(c)}<p><a href="${pathFor(language, 'products')}">${c.continueShopping}</a></p></section>` });
}

function render(page) {
  const { language, route, title, description, body } = page;
  const c = ui[language.code];
  const localizedBody = body.replaceAll('href="/policies/', `href="${language.path}policies/`);
  const canonical = origin + pathFor(language, route);
  const image = origin + (page.image || '/images/owned-base-ginseng.jpg');
  const structured = [{ '@context': 'https://schema.org', '@type': 'Organization', name: 'Changbaishan Ginseng', legalName: '吉林白山传奇生态农业科技有限公司', url: origin, email: 'service@changbaishanginseng.com', telephone: '+86-15500376880' }];
  if (page.product) structured.push({ '@context': 'https://schema.org', '@type': 'Product', name: title, description, image: page.product.images.map(item => origin + item.url), offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: Math.min(...page.product.variants.map(item => item.price)), highPrice: Math.max(...page.product.variants.map(item => item.price)), offerCount: page.product.variants.length, url: canonical } });
  if (page.article) structured.push({ '@context': 'https://schema.org', '@type': 'Article', headline: title, description, image, mainEntityOfPage: canonical, datePublished: '2026-11-12', inLanguage: language.code, author: { '@type': 'Organization', name: 'Changbaishan Ginseng', url: origin } });
  return `<!doctype html><html lang="${language.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)} | Changbaishan Ginseng</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#214b41">${page.noindex ? '<meta name="robots" content="noindex,follow">' : ''}<link rel="icon" href="/favicon.png" type="image/png"><link rel="canonical" href="${canonical}">${languages.map(other => `<link rel="alternate" hreflang="${other.code}" href="${origin + pathFor(other, route)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${origin + pathFor(languages[0], route)}"><meta property="og:type" content="${page.article ? 'article' : 'website'}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${image}"><link rel="stylesheet" href="/style.css"><script src="/site.js" defer></script><script type="application/ld+json">${json(structured)}</script></head><body class="page-${page.kind}">${header(language, route)}<main id="main">${localizedBody}</main>${footer(language)}${dialogs(c)}<script id="page-data" type="application/json">${json({ locale: language.code, basePath: language.path, route, ui: c, retail: retailUi[language.code], catalog: products, exchangeRates, dynamicProduct: page.template === true })}</script></body></html>`;
}

for (const page of pages) {
  const directory = `public${pathFor(page.language, page.route)}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, render(page));
}
await mkdir('public/data', { recursive: true });
await writeFile('public/data/catalog.json', JSON.stringify({ products, currency: 'USD' }));
await writeFile('public/data/exchange-rates.json', JSON.stringify(exchangeRates, null, 2) + '\n');
const indexed = pages.filter(page => !page.noindex);
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /account/\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${indexed.map(page => `  <url><loc>${origin + pathFor(page.language, page.route)}</loc>${languages.map(other => `<xhtml:link rel="alternate" hreflang="${other.code}" href="${origin + pathFor(other, page.route)}"/>`).join('')}</url>`).join('\n')}\n</urlset>\n`);
await writeFile('public/404.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Changbaishan Ginseng</title><link rel="stylesheet" href="/style.css"><main class="not-found"><h1>Page not found</h1><p><a href="/">Return to Changbaishan Ginseng</a></p></main></html>');
await writeFile('public/_headers', '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
console.log(`Built ${pages.length} storefront pages across ${languages.length} languages.`);
