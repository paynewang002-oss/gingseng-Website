# Changbaishan Ginseng Website

Static storefront plus a Cloudflare Worker backend that reads products from the Shopify Storefront API.

## Deploy

This repository is connected to Cloudflare Workers Builds. Pushing to `main` triggers an automatic build and deploy of the Worker `ginseng-website`.

Manual deploy:

```
npm install
npm run deploy
```

- Build output: `public/`
- Production: https://changbaishanginseng.com

## Config

Runtime variables and secrets live in Cloudflare Worker -> Settings -> Variables and Secrets. The `vars` block in `wrangler.jsonc` only holds non-secret values.

Keep `CHECKOUT_ENABLED` set to `"true"`, otherwise the storefront checkout button is disabled by the front end.
