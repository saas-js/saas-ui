# Saas UI v2 docs archive

This app is the frozen v2 documentation site. It is built as a fully static
Next.js export and served as a Cloudflare Worker with [static assets](https://developers.cloudflare.com/workers/static-assets/).

The production Worker name is `saas-ui-v2-docs`. Do not deploy from `main` or `v3`.

## Local build

From the repository root (pnpm workspace):

```bash
pnpm install
pnpm --filter website build
pnpm preview:web
```

`preview:web` runs `wrangler dev` against `apps/website/out`.

The private `packages/pro` git submodule is **not** required. Pro UI used in
docs live examples comes from the public `@saas-ui-pro/*` npm packages.

## Deploy

Do not run `wrangler deploy` until the Worker exists and the production git
branch is `v2`. DNS for `v2.saas-ui.dev` is unchanged by this repo.

### Option A — Cloudflare Workers Builds (preferred)

In the Cloudflare dashboard, create a Worker named **`saas-ui-v2-docs`** and
connect this GitHub repository. The Worker name must match `name` in
`wrangler.jsonc`.

| Setting | Value |
| --- | --- |
| Worker name | `saas-ui-v2-docs` |
| Git repository | `saas-js/saas-ui` |
| Production branch | `v2` |
| Root directory | repository root (leave empty) |
| Build command | `pnpm install --frozen-lockfile && pnpm --filter website build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch builds | optional; `npx wrangler versions upload` / preview |
| Node.js version | `20` or `22` |

No GitHub secrets are required. Cloudflare mints a build token for the account.

After the first successful deploy, attach the custom domain `v2.saas-ui.dev`
in the Worker settings (DNS is out of scope for this change).

### Option B — GitHub Actions

Workflow: `.github/workflows/deploy-v2-docs.yml` (push to `v2` or
`workflow_dispatch`).

Add repository secrets:

1. `CLOUDFLARE_API_TOKEN` — [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Edit Cloudflare Workers** (and Account / Users read as required by Wrangler).
2. `CLOUDFLARE_ACCOUNT_ID` — [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

The Worker `saas-ui-v2-docs` must already exist, or the first deploy will
create it on the account.

## Headers and redirects

Static export cannot use Next.js `headers()` / `redirects()`. Those live in:

- `public/_headers` — `X-Robots-Tag: noindex, follow`
- `public/_redirects` — former Next and `getServerSideProps` redirects
