(() => {
  const pageElement = document.getElementById('page-data');
  if (!pageElement) return;
  const page = JSON.parse(pageElement.textContent);
  const c = page.ui;
  const retail = page.retail;
  const referenceCatalog = page.catalog;
  let catalog = [...referenceCatalog];
  let catalogReadyForCheckout = false;
  let config = { checkoutEnabled: false, currencies: [{ code: 'USD', rate: 1 }] };
  const rates = new Map([['USD', 1]]);
  Object.entries(page.exchangeRates?.rates || {}).forEach(([code, rate]) => {
    if (['USD', 'JPY', 'KRW', 'HKD', 'SGD'].includes(code) && Number.isFinite(Number(rate)) && Number(rate) > 0) rates.set(code, Number(rate));
  });

  function stored(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Shopping remains usable for this visit. */ }
  }

  let currency = stored('ginseng-currency', 'USD');
  if (!['USD', 'JPY', 'KRW', 'HKD', 'SGD'].includes(currency)) currency = 'USD';
  let cart = stored('ginseng-cart', []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(line => typeof line.handle === 'string' && typeof line.variantId === 'string' && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99).slice(0, 50);
  let consent = stored('ginseng-privacy', null);
  const gpc = navigator.globalPrivacyControl === true;
  let analyticsLoaded = false;
  let analyticsConsentInitialized = false;

  const normalizeSignature = value => String(value || '').replace(/[\s|/]/g, '').toLowerCase();
  const variantSignature = variant => {
    const values = (variant.options || []).map(option => String(option.value ?? option)).filter(value => value.trim().toLowerCase() !== 'default title');
    if (values.length) return normalizeSignature(values.join('|'));
    return variant.title?.trim().toLowerCase() === 'default title' ? '' : normalizeSignature(variant.title);
  };
  const findProduct = handle => catalog.find(product => product.handle === handle);
  const originalProduct = handle => referenceCatalog.find(product => product.handle === handle);
  const isShopifyId = id => /^(?:gid:\/\/shopify\/ProductVariant\/)?\d+$/.test(String(id));
  const productTitle = product => c.productTitles[product.key] || product.title;

  function normalizeProduct(raw) {
    const reference = originalProduct(raw.handle);
    const variants = (raw.variants || []).map(variant => ({
      ...variant,
      id: String(variant.id),
      title: variant.title || 'Default Title',
      price: Number(variant.price?.amount ?? variant.price),
      options: variant.options || []
    })).filter(variant => Number.isFinite(variant.price) && variant.price >= 0);
    return {
      ...reference, ...raw,
      key: reference?.key || `shopify:${raw.handle}`,
      images: Array.isArray(raw.images) && raw.images.length ? raw.images : reference?.images || [],
      variants
    };
  }

  function productLink(product) {
    return `${page.basePath}products/${encodeURIComponent(product.handle)}/`;
  }

  function renderProductLists() {
    document.querySelectorAll('[data-product-list]').forEach(container => {
      const selection = container.dataset.productList === 'featured' ? catalog.slice(0, 3) : catalog;
      container.replaceChildren();
      if (!selection.length) container.append(textElement('p', retail.emptyCatalogue));
      selection.forEach(product => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.dataset.productCard = product.handle;
        const imageLink = document.createElement('a');
        imageLink.className = 'product-card-image';
        imageLink.href = productLink(product);
        if (product.images[0]?.url) {
          const image = document.createElement('img');
          image.src = product.images[0].url;
          image.alt = productTitle(product);
          image.width = 800;
          image.height = 800;
          image.loading = 'lazy';
          imageLink.append(image);
        } else imageLink.classList.add('product-image-empty');
        const copy = document.createElement('div');
        copy.className = 'product-card-copy';
        const heading = document.createElement('h3');
        const titleLink = textElement('a', retail.cardTitles[product.key] || product.title);
        titleLink.href = productLink(product);
        heading.append(titleLink);
        copy.append(heading);
        if (retail.cardDetails[product.key]) copy.append(textElement('p', retail.cardDetails[product.key], 'product-card-details'));
        const minimum = Math.min(...product.variants.map(variant => variant.price));
        const priceElement = document.createElement('p');
        priceElement.className = 'product-card-price';
        if (product.variants.length > 1) priceElement.append(textElement('span', `${c.from} `));
        const amount = textElement('span', money(minimum));
        amount.dataset.price = minimum;
        priceElement.append(amount);
        copy.append(priceElement);
        const action = textElement('a', retail.viewProduct, 'product-card-action');
        action.href = productLink(product);
        action.setAttribute('aria-label', `${retail.viewProduct} ${productTitle(product)}`);
        copy.append(action);
        article.append(imageLink, copy);
        container.append(article);
      });
    });
  }

  function renderDynamicProduct() {
    const container = document.querySelector('[data-dynamic-product]');
    if (!container) return;
    let handle;
    try { handle = decodeURIComponent(window.location.pathname.replace(/\/+$/, '').split('/').at(-1)); } catch { handle = ''; }
    const product = findProduct(handle);
    const title = container.querySelector('[data-dynamic-product-title]');
    if (!product) {
      title.textContent = retail.productNotFound;
      return;
    }
    container.dataset.productDetail = product.handle;
    title.textContent = productTitle(product);
    const description = new DOMParser().parseFromString(product.description || '', 'text/html').body.textContent;
    container.querySelector('[data-dynamic-product-description]').textContent = description;
    const mainImage = container.querySelector('[data-dynamic-product-image]');
    const thumbnails = container.querySelector('.gallery-thumbnails');
    if (product.images.length) {
      mainImage.hidden = false;
      mainImage.dataset.galleryMain = '';
      mainImage.src = product.images[0].url;
      mainImage.alt = productTitle(product);
      container.querySelector('[data-image-placeholder]').hidden = true;
      product.images.forEach((image, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.galleryImage = image.url;
        button.setAttribute('aria-label', `${productTitle(product)} ${index + 1}`);
        button.setAttribute('aria-pressed', String(index === 0));
        const preview = document.createElement('img');
        preview.src = image.url;
        preview.alt = '';
        preview.width = 90;
        preview.height = 90;
        button.append(preview);
        thumbnails.append(button);
      });
    }
    const form = document.createElement('form');
    form.dataset.addProduct = product.handle;
    const options = document.createElement(product.variants.length > 1 ? 'select' : 'input');
    options.name = 'variant';
    if (product.variants.length > 1) {
      options.id = 'product-variant';
      options.dataset.variantSelect = '';
      const label = textElement('label', c.size, 'field-label');
      label.htmlFor = options.id;
      form.append(label);
      product.variants.forEach((variant, index) => {
        const option = textElement('option', variant.title);
        option.value = index;
        options.append(option);
      });
    } else {
      options.type = 'hidden';
      options.value = '0';
    }
    form.append(options);
    const purchase = document.createElement('div');
    purchase.className = 'purchase-row';
    const quantityGroup = document.createElement('div');
    const quantityLabel = textElement('label', c.quantity, 'field-label');
    quantityLabel.htmlFor = 'product-quantity';
    const quantity = document.createElement('input');
    Object.assign(quantity, { type: 'number', id: 'product-quantity', name: 'quantity', min: '1', max: '99', value: '1', required: true });
    quantity.inputMode = 'numeric';
    quantityGroup.append(quantityLabel, quantity);
    const add = textElement('button', c.add, 'button');
    add.type = 'submit';
    purchase.append(quantityGroup, add);
    const status = textElement('p', '', 'form-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.append(purchase, status);
    container.querySelector('[data-dynamic-product-purchase]').replaceChildren(form);
    bindProductForm(form);
    bindGallery();
    document.title = `${productTitle(product)} | Changbaishan Ginseng`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('link[rel="canonical"]').href = window.location.origin + window.location.pathname;
    const prefixes = { en: '/', ja: '/ja/', ko: '/ko/', 'zh-Hans': '/zh-hans/', 'zh-Hant': '/zh-hant/' };
    document.querySelectorAll('.language-menu a').forEach(link => { link.href = `${prefixes[link.lang]}products/${encodeURIComponent(product.handle)}/`; });
  }

  function money(usd) {
    const code = rates.has(currency) ? currency : 'USD';
    const converted = Number(usd) * rates.get(code);
    const step = code === 'JPY' ? 100 : code === 'KRW' ? 1000 : 1;
    const amount = code === 'USD' ? converted : Math.round(converted / step) * step;
    return new Intl.NumberFormat(page.locale, { style: 'currency', currency: code, currencyDisplay: 'code', maximumFractionDigits: code === 'USD' ? 2 : 0, minimumFractionDigits: code === 'USD' ? 2 : 0 }).format(amount);
  }

  function refreshPrices() {
    document.querySelectorAll('[data-price]').forEach(element => { element.textContent = money(element.dataset.price); });
    document.querySelectorAll('[data-converted-note]').forEach(element => { element.hidden = currency === 'USD' || !rates.has(currency); });
    document.querySelectorAll('[data-currency]').forEach(select => {
      select.value = rates.has(currency) ? currency : 'USD';
      select.title = `${c.currency} · ${c.updated} ${config.currencyUpdatedAt || page.exchangeRates?.date || ''}`;
      [...select.options].forEach(option => { option.disabled = !rates.has(option.value); });
    });
  }

  function updateProductForm() {
    const form = document.querySelector('[data-add-product]');
    if (!form) return;
    const product = findProduct(form.dataset.addProduct);
    const index = Number(form.elements.variant.value);
    const variant = product?.variants[index];
    if (!variant) {
      const button = form.querySelector('button[type=submit]');
      button.disabled = true;
      button.textContent = c.unavailable;
      return;
    }
    const element = document.querySelector('[data-product-price]');
    element.dataset.price = variant.price;
    const button = form.querySelector('button[type=submit]');
    button.disabled = variant.available === false;
    button.textContent = variant.available === false ? c.unavailable : c.add;
    refreshPrices();
  }

  function synchronizeCart() {
    cart.forEach(line => {
      const product = findProduct(line.handle);
      if (!product) {
        line.available = false;
        return;
      }
      const variant = product?.variants.find(item => String(item.id) === line.variantId) || product?.variants.find(item => variantSignature(item) === normalizeSignature(line.signature));
      if (!variant) return;
      line.variantId = String(variant.id);
      line.variantTitle = variant.title;
      line.price = Number(variant.price);
      line.available = variant.available !== false;
      line.key = product.key;
      line.signature = variantSignature(variant);
    });
    save('ginseng-cart', cart);
  }

  function textElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function renderCart() {
    const count = cart.reduce((sum, line) => sum + line.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach(element => {
      element.textContent = count;
      element.hidden = count === 0;
    });
    document.querySelectorAll('[data-cart-contents]').forEach(container => {
      container.replaceChildren();
      if (!cart.length) {
        container.append(textElement('p', c.emptyCart));
        return;
      }
      cart.forEach((line, index) => {
        const article = document.createElement('article');
        article.className = 'cart-item';
        const image = document.createElement(line.image ? 'img' : 'div');
        if (line.image) {
          image.src = line.image;
          image.alt = c.productTitles[line.key] || line.title;
          image.width = 80;
          image.height = 80;
        } else image.className = 'cart-image-empty';
        const details = document.createElement('div');
        details.append(textElement('h3', c.productTitles[line.key] || line.title));
        if (line.variantTitle !== 'Default Title') details.append(textElement('p', line.variantTitle));
        details.append(textElement('p', money(line.price * line.quantity)));
        const controls = document.createElement('div');
        controls.className = 'cart-item-controls';
        const quantity = document.createElement('input');
        quantity.type = 'number';
        quantity.min = '1';
        quantity.max = '99';
        quantity.value = line.quantity;
        quantity.setAttribute('aria-label', `${c.quantity} ${c.productTitles[line.key] || line.title}`);
        quantity.addEventListener('change', () => {
          const value = Number(quantity.value);
          if (!Number.isInteger(value) || value < 1 || value > 99) {
            quantity.value = line.quantity;
            return;
          }
          line.quantity = value;
          save('ginseng-cart', cart);
          renderCart();
        });
        const remove = textElement('button', c.remove, 'text-button');
        remove.type = 'button';
        remove.addEventListener('click', () => {
          cart.splice(index, 1);
          save('ginseng-cart', cart);
          renderCart();
        });
        controls.append(quantity, remove);
        details.append(controls);
        article.append(image, details);
        container.append(article);
      });
    });
    document.querySelectorAll('[data-cart-totals]').forEach(element => { element.hidden = cart.length === 0; });
    const subtotal = cart.reduce((sum, line) => sum + Number(line.price || 0) * line.quantity, 0);
    document.querySelectorAll('[data-cart-subtotal]').forEach(element => { element.textContent = money(subtotal); });
    document.querySelectorAll('[data-checkout]').forEach(button => {
      const enabled = config.checkoutEnabled && catalogReadyForCheckout;
      const available = cart.every(line => line.available !== false && isShopifyId(line.variantId));
      button.disabled = !enabled || !available;
      const status = button.parentElement.querySelector('.cart-status');
      status.textContent = !enabled ? c.checkoutSoon : !available ? c.unavailable : '';
    });
  }

  function openDialog(dialog) {
    if (dialog && !dialog.open) dialog.showModal();
  }

  document.querySelectorAll('[data-open-cart]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    renderCart();
    openDialog(document.getElementById('cart-dialog'));
  }));
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  }));

  document.querySelectorAll('.language-menu').forEach(menu => {
    document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
  });

  document.querySelectorAll('[data-currency]').forEach(select => select.addEventListener('change', () => {
    currency = select.value;
    save('ginseng-currency', currency);
    refreshPrices();
    renderCart();
  }));

  function bindGallery() {
    document.querySelectorAll('[data-gallery-image]').forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = 'true';
      button.addEventListener('click', () => {
        const mainImage = document.querySelector('[data-gallery-main]');
        mainImage.src = button.dataset.galleryImage;
        document.querySelectorAll('[data-gallery-image]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      });
    });
  }

  function handleAddProduct(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const product = findProduct(form.dataset.addProduct);
    const variant = product?.variants[Number(form.elements.variant.value)];
    const quantity = Number(form.elements.quantity.value);
    if (!variant || variant.available === false || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
    const signature = variantSignature(variant);
    const line = cart.find(item => item.handle === product.handle && item.signature === signature);
    if (line) line.quantity = Math.min(99, line.quantity + quantity);
    else cart.push({ handle: product.handle, key: product.key, title: product.title, variantId: String(variant.id), signature, variantTitle: variant.title, quantity, price: Number(variant.price), image: originalProduct(product.handle)?.images[0].url || product.images[0]?.url || '', available: true });
    save('ginseng-cart', cart);
    form.querySelector('.form-status').textContent = c.added;
    renderCart();
    openDialog(document.getElementById('cart-dialog'));
  }

  function bindProductForm(form) {
    if (!form || form.dataset.bound) return;
    form.dataset.bound = 'true';
    form.querySelector('[data-variant-select]')?.addEventListener('change', updateProductForm);
    form.addEventListener('submit', handleAddProduct);
  }
  bindProductForm(document.querySelector('[data-add-product]'));
  bindGallery();

  document.querySelectorAll('[data-checkout]').forEach(button => button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.cart-status');
    synchronizeCart();
    if (!config.checkoutEnabled || !catalogReadyForCheckout || cart.some(line => !isShopifyId(line.variantId))) {
      status.textContent = c.checkoutSoon;
      return;
    }
    if (cart.some(line => line.available === false)) {
      status.textContent = c.unavailable;
      return;
    }
    button.disabled = true;
    status.textContent = c.loading;
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lines: cart.map(line => ({ variantId: line.variantId, quantity: line.quantity })), currency: 'USD', displayCurrency: currency, locale: page.locale }) });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error('checkout_unavailable');
      const url = new URL(result.checkoutUrl);
      if (url.protocol !== 'https:') throw new Error('invalid_checkout_url');
      window.location.assign(url.href);
    } catch {
      status.textContent = c.checkoutError;
      status.dataset.error = 'true';
      button.disabled = false;
    }
  }));

  async function sendForm(form, endpoint, values, success) {
    const button = form.querySelector('button[type=submit]');
    const status = form.querySelector('.form-status');
    button.disabled = true;
    status.dataset.error = 'false';
    status.textContent = c.sending;
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('form_unavailable');
      form.reset();
      status.textContent = success;
    } catch {
      status.dataset.error = 'true';
      status.textContent = c.formError;
    } finally { button.disabled = false; }
  }

  document.querySelectorAll('[data-contact]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    sendForm(form, '/api/contact', { email: String(data.get('email')).trim(), name: String(data.get('name')).trim(), message: String(data.get('message')).trim(), marketingConsent: data.get('marketingConsent') === 'on', website: String(data.get('website') || ''), locale: page.locale }, c.contactSuccess);
  }));
  document.querySelectorAll('[data-newsletter]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('marketingConsent') !== 'on') {
      form.querySelector('.form-status').textContent = c.consentRequired;
      return;
    }
    sendForm(form, '/api/subscribe', { email: String(data.get('email')).trim(), marketingConsent: true, website: String(data.get('website') || ''), locale: page.locale }, c.subscribeSuccess);
  }));

  function trackingChoices() {
    return { analytics: consent?.analytics === true, marketing: !gpc && consent?.marketing === true, preferences: true, sale_of_data: !gpc && consent?.marketing === true };
  }

  function applyTrackingChoices() {
    const choices = trackingChoices();
    if (typeof window.Shopify?.customerPrivacy?.setTrackingConsent === 'function') window.Shopify.customerPrivacy.setTrackingConsent(choices, () => {});
    window.dispatchEvent(new CustomEvent('ginseng:privacy', { detail: choices }));
    const measurementId = config.googleAnalyticsId;
    if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;
    window[`ga-disable-${measurementId}`] = !choices.analytics;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!analyticsConsentInitialized) {
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      analyticsConsentInitialized = true;
    }
    window.gtag('consent', 'update', { analytics_storage: choices.analytics ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    if (choices.analytics && !analyticsLoaded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { allow_google_signals: false, allow_ad_personalization_signals: false });
      analyticsLoaded = true;
    }
    if (!choices.analytics) document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) return;
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.changbaishanginseng.com; SameSite=Lax`;
    });
  }

  function setConsent(analytics, marketing) {
    consent = { analytics: Boolean(analytics), marketing: Boolean(marketing) && !gpc, version: 1, savedAt: new Date().toISOString() };
    save('ginseng-privacy', consent);
    document.getElementById('cookie-banner').hidden = true;
    applyTrackingChoices();
  }

  function privacyDialog() {
    document.getElementById('consent-analytics').checked = consent?.analytics === true;
    const marketing = document.getElementById('consent-marketing');
    marketing.checked = consent?.marketing === true && !gpc;
    marketing.disabled = gpc;
    document.querySelector('[data-gpc-notice]').hidden = !gpc;
    openDialog(document.getElementById('privacy-dialog'));
  }

  document.querySelectorAll('[data-privacy-choices]').forEach(button => button.addEventListener('click', privacyDialog));
  document.querySelectorAll('a[href$="#privacy-choices"]').forEach(link => link.addEventListener('click', event => {
    const target = new URL(link.href, window.location.href);
    if (target.pathname === window.location.pathname) {
      event.preventDefault();
      privacyDialog();
    }
  }));
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => setConsent(button.dataset.consent === 'all', button.dataset.consent === 'all')));
  document.querySelector('[data-save-consent]')?.addEventListener('click', () => {
    setConsent(document.getElementById('consent-analytics').checked, document.getElementById('consent-marketing').checked);
    document.getElementById('privacy-dialog').close();
  });
  document.getElementById('cookie-banner').hidden = Boolean(consent);
  applyTrackingChoices();

  async function initializeStore() {
    const results = await Promise.allSettled([
      fetch('/api/config').then(response => { if (!response.ok) throw new Error('config_unavailable'); return response.json(); }),
      fetch(`/api/products?locale=${encodeURIComponent(page.locale)}`).then(response => { if (!response.ok) throw new Error('catalog_unavailable'); return response.json(); })
    ]);
    if (results[0].status === 'fulfilled') {
      config = { ...config, ...results[0].value };
      if (Array.isArray(config.currencies)) config.currencies.forEach(item => {
        if (['USD', 'JPY', 'KRW', 'HKD', 'SGD'].includes(item.code) && Number.isFinite(Number(item.rate)) && Number(item.rate) > 0) rates.set(item.code, Number(item.rate));
      });
      applyTrackingChoices();
    }
    if (!rates.has(currency)) currency = 'USD';
    if (results[1].status === 'fulfilled' && Array.isArray(results[1].value.products)) {
      catalogReadyForCheckout = results[1].value.checkoutEnabled !== false;
      const liveCatalog = results[1].value.products.filter(product => typeof product.handle === 'string').map(normalizeProduct).filter(product => product.variants.length);
      const referenceOrder = new Map(referenceCatalog.map((product, index) => [product.handle, index]));
      catalog = liveCatalog.sort((a, b) => (referenceOrder.get(a.handle) ?? referenceCatalog.length) - (referenceOrder.get(b.handle) ?? referenceCatalog.length));
      renderProductLists();
      renderDynamicProduct();
      const form = document.querySelector('[data-add-product]');
      if (form) {
        const product = findProduct(form.dataset.addProduct);
        const select = form.querySelector('[data-variant-select]');
        if (select && product) select.replaceChildren(...product.variants.map((variant, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = variant.title;
          return option;
        }));
        const structuredElement = document.querySelector('script[type="application/ld+json"]');
        if (structuredElement && product) {
          const rawStructured = JSON.parse(structuredElement.textContent);
          const structured = Array.isArray(rawStructured) ? rawStructured : [rawStructured];
          const productData = structured.find(item => item['@type'] === 'Product');
          if (productData?.offers) {
            productData.offers.lowPrice = Math.min(...product.variants.map(variant => Number(variant.price)));
            productData.offers.highPrice = Math.max(...product.variants.map(variant => Number(variant.price)));
            productData.offers.offerCount = product.variants.length;
            if (product.variants.every(variant => isShopifyId(variant.id))) productData.offers.availability = product.variants.some(variant => variant.available !== false) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
            structuredElement.textContent = JSON.stringify(structured);
          }
        }
      }
    }
    synchronizeCart();
    updateProductForm();
    refreshPrices();
    renderCart();
  }

  refreshPrices();
  renderCart();
  initializeStore();
})();
