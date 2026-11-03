# Saas UI website

Next.js App Router site that currently lives at
[saas-ui.dev](https://saas-ui.dev) and [www.saas-js.com](https://www.saas-js.com).
Host-based routing lives in `proxy.ts`: `saas-ui.dev` is rewritten to `/ui/*`;
`saas-js.com` is the default (saas-js) tree.

This app is prepared for Cloudflare Workers via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). A static
Workers Assets export is not viable: the root layout reads cookies and the
`Host` header, `/og` is a dynamic image route, Polar checkout and the
registry are request-time APIs, and `proxy.ts` rewrites by host.

workerd cannot `eval` MDX (`new Function`) or instantiate Shiki's
Oniguruma WASM. Docs/blog MDX is compiled to ESM modules under
`lib/generated/mdx/` at build time; `highlightCode` uses Shiki's
JavaScript regex engine.

Worker name: `saas-ui-website`.

The Vercel deployment stays in place until DNS cutover. `next build` /
`pnpm build` is unchanged.

## Local development

From the repository root:

```bash
pnpm install
pnpm dev:web
```

The Next.js dev server listens on [http://localhost:3020](http://localhost:3020).
Use `saas-ui.dev` / `saas-js.com` in `/etc/hosts` (or a Host header) to
exercise host routing.

## Preview the Workers runtime locally

```bash
pnpm --filter website cf:preview
```

This runs `opennextjs-cloudflare build` and then
`opennextjs-cloudflare preview` (`wrangler dev` against the OpenNext output).
Do not run `wrangler deploy` from this repository until cutover is approved.

Copy `.dev.vars.example` to `.dev.vars` / `.dev.vars.local` for local secrets.
The committed `.dev.vars` only sets `NEXTJS_ENV=development`.

`wrangler.jsonc` sets `keep_names` to `false` so Wrangler/esbuild does not
inject a `__name` helper into `next-themes` inline scripts.

## Environment variables

Every `process.env` the website reads (excluding `NODE_ENV`). Set
`NEXT_PUBLIC_*` as Workers Builds **build variables** so they are inlined
during `next build`. Set the rest as Worker **Variables & Secrets**. Always
deploy with `--keep-vars` (`npx wrangler deploy --keep-vars` or
`opennextjs-cloudflare deploy -- --keep-vars`) so dashboard runtime vars
are not wiped. `wrangler.jsonc` sets `upload_source_maps` to `false`
(maps exceeded the 60 MiB upload limit).

| Variable | Side | Required | What breaks without it |
| --- | --- | --- | --- |
| `NEXTJS_ENV` | server | Local preview only | OpenNext loads the wrong Next `.env*` set. Omit in production. |
| `NEXT_PUBLIC_URL` | client + server | Recommended | Absolute checkout/llms links fall back to `SITE_URL` / `HOST` / `VERCEL_URL` / `http://localhost:3020`. |
| `SITE_URL` | server | Optional | Same fallback chain as `NEXT_PUBLIC_URL`. |
| `HOST` | server | Optional | Same fallback chain. |
| `VERCEL_URL` | server | Vercel only | Kept so the current Vercel deploy still works. Not set on Workers. |
| `GITHUB_TOKEN` | server | Optional | Marketing star count falls back to 1500. |
| `GITHUB_PERSONAL_TOKEN` | server | Optional | Pricing “last updated” uses unauthenticated GitHub (rate-limited) or today’s date. |
| `POLAR_ACCESS_TOKEN` | server | Required for checkout | `/checkout` and `/success` cannot talk to Polar. |
| `POLAR_SUCCESS_URL` | server | Required for checkout | Polar has no post-payment return URL. |
| `POLAR_WEBHOOK_SECRET` | server | Required for webhooks | `/api/webhooks/polar` throws on boot/request. |
| `SUPABASE_URL` | server | Required for Pro | Private registry items 401; Pro entitlement is false. |
| `SUPABASE_ANON_KEY` | server | Required for Pro | Same as `SUPABASE_URL`. |
| `NEXT_PUBLIC_SUPABASE_URL` | client/build | Fallback | Used if `SUPABASE_URL` is unset. |
| `NEXT_PUBLIC_SUPABASE_KEY` | client/build | Fallback | Used if `SUPABASE_ANON_KEY` is unset. |
| `PRO_REGISTRY_URL` | server | Optional | Blocks gallery defaults to `http://localhost:4000/r` (empty in prod). |
| `PRO_STORYBOOK_URL` | server | Optional | Block previews default to `http://localhost:6007`. |
| `PRO_ENTITLEMENT` | server | Optional | Defaults to `saas-ui-pro`. |
| `PRO_REGISTRY_TOKEN` | server | Optional | Falls back to the signed-in Supabase access token. |
| `REGISTRY_BASE_PATH` | server | Optional | Defaults to `/r`. |

Not used at runtime (sample code / other packages only): `AWS_BUCKET`,
`AUTH_ORIGIN`, `REGISTRY_URL`, `SCHEMA_URL`.

Vercel system vars (`VERCEL`, `VERCEL_ENV`, `VERCEL_PROJECT_PRODUCTION_URL`,
…) are not read by app code. There is no `@vercel/analytics` /
`@vercel/speed-insights` dependency; analytics is Pirsch.

## Deploy

Do not deploy or change DNS from this branch. After merge, configure
Workers Builds:

| Setting | Value |
| --- | --- |
| Worker name | `saas-ui-website` |
| Production branch | `main` |
| Root directory | `apps/website` |
| Build command | `cd ../.. && pnpm install --frozen-lockfile && pnpm exec turbo run build --filter='website^...' --env-mode=loose && pnpm --filter website cf:build` |
| Deploy command | `npx wrangler deploy --keep-vars` |
| Preview command | `npx wrangler versions upload --keep-vars` (or the dashboard default) |
| Build watch paths | `apps/website/**`, `apps/compositions/**`, `packages/**`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package.json` |
| Node.js | 22 |

Create the R2 bucket `saas-ui-website-cache` before the first production
deploy (or let Wrangler auto-provision it). Local `wrangler dev` uses a
simulated bucket.

Optional later: bind a D1 database as `NEXT_TAG_CACHE_D1` and switch
`open-next.config.ts` to `d1NextTagCache` if you add `revalidateTag` /
`revalidatePath`. Today the site only uses time-based ISR
(`revalidate = 86400` on package pages and the npm fetch cache).

## Remaining gaps

- OpenNext’s Next.js 16 `proxy.ts` support is experimental. Host routing
  matches Vercel in local `wrangler dev`; re-check after each OpenNext
  upgrade.
- Incremental cache is R2 (`saas-ui-website-cache`) plus a Durable Object
  queue. No D1 tag cache yet (the app does not call `revalidateTag`).
- `IMAGES` is bound for `next/image`. Confirm Cloudflare Images is enabled
  on the account, or switch to `unoptimized` / a custom loader.
- `llms.txt` lives at the saas-js tree (`/llms.txt`). On `saas-ui.dev` the
  proxy rewrites it to `/ui/llms.txt` (same as Vercel) and that path 404s.
- Preview without `NEXT_PUBLIC_URL` / `SITE_URL` emits `localhost:3020`
  in generated absolute links (llms routes).
- Generated files (`lib/generated/**`, `.content-collections`) are
  gitignored and produced during `next build` / `cf:build`.
- `wrangler deploy --dry-run` measured **~9.5 MiB gzip** (59 MiB raw)
  without source maps. That fits the paid Workers limit (10 MiB) and
  will not fit the free 1 MiB limit. Watch bundle size if more MDX or
  dependencies land. Do not turn `upload_source_maps` back on without
  shrinking maps (they were ~79 MiB vs a 60 MiB limit).
- Do not use `pnpm build:packages` as the Workers pre-build: it failed
  on `@saas-ui/tailwind-preset` ordering. Prefer
  `turbo run build --filter='website^...' --env-mode=loose`.
- Vercel production deploy of `0549b3c1`
  (`dpl_VbAGFtMEq69WE4iqszMEqF1yNLkS`) failed while the PR preview
  built. Likely: `initOpenNextCloudflareForDev()` used to run on every
  `next build` (starts wrangler/miniflare and loads `.dev.vars` with
  `NEXTJS_ENV=development`); new `prebuild` steps need
  `apps/compositions` and `public/types`; `outputFileTracingRoot` at the
  monorepo root plus generated MDX modules can blow the production
  serverless size budget. `initOpenNextCloudflareForDev` now runs only
  for `next dev`.

## Remaining cutover steps

1. Merge this PR to `main`.
2. Create Worker `saas-ui-website` and apply the Workers Builds settings
   above. Copy Vercel env vars into build variables + Worker secrets.
3. First deploy (creates `saas-ui-website.<account>.workers.dev`). Confirm
   homepage, docs, blog, `/og`, and both hosts via `Host`.
4. Attach custom domains `saas-ui.dev` and `www.saas-js.com` (and www/apex
   aliases) on the Worker. **Do not** change DNS until this Worker is
   verified.
5. Point DNS at the Worker, then remove the Vercel host once traffic looks
   good.
6. Keep the Vercel project until the custom domains are confirmed.

## Host routing

`proxy.ts` is Next.js 16 Node middleware. OpenNext’s support is
experimental (`@opennextjs/cloudflare` ≥ 1.20.3) and requires
`nodejs_compat`. Behavior matches Vercel:

- `saas-ui.dev` / `www.saas-ui.dev` / hosts containing `saas-ui` rewrite
  to `/ui/*` (except `/license`, `/privacy`, `/terms`) and apply legacy
  docs redirects.
- `saas-js.com` / `www.saas-js.com` / hosts containing `saas-js` stay on
  the default tree; production `/ui/*` redirects to `https://saas-ui.dev`.
