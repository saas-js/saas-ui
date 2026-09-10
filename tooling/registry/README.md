# Registry automation

The public registry is compiled from checked-in templates in
`apps/website/registry/default` and recipe contracts in
`packages/saas-ui-chakra-preset`. Generated JSON and preview indexes are
published transactionally to `apps/website/public/r` and
`apps/website/__registry__`.

Run these commands from the repository root:

- `pnpm registry:generate` validates and writes every public artifact.
- `pnpm registry:prepare` deterministically writes the public catalog. The root
  install lifecycle runs this after dependencies are linked.
- `pnpm registry:dev` generates once and watches registry, compiler, and preset
  source files. It never watches generated output.
- `pnpm registry:check` validates the graph and compares two independent clean
  generations byte for byte. It does not require generated artifacts to exist.
- `pnpm registry:legacy-check` rejects `@saas-ui/core` references in explicitly
  migrated runtime, config, and manifest scopes, including the migrated website
  and compositions apps. `@saas-ui/react` primitives are allowed.
- `pnpm registry:typecheck` checks the provider, Sidebar, and cross-template
  TypeScript contracts that are not part of a package tsconfig.
- `pnpm registry:test` runs the shared compiler and automation tests.
- `pnpm registry:icons` explicitly downloads the configured Lucide icons and
  updates their checked-in source templates.
- `pnpm registry:cli:acceptance` builds the distributable CLI and drives its
  real process boundary through `init`, `add`, `diff`, `update`, and migration
  against a temporary project and the canonical local registry.
- `pnpm registry:consumer:packed:acceptance` packs the preset and CLI, installs
  those tarballs outside the workspace, runs the built CLI without a package
  manager, and type-checks and builds the resulting Next.js consumer.
- `pnpm registry:release` compiles and validates the complete public artifact
  set, then assembles one deterministic release candidate under
  `.artifacts/registry-release`. The candidate contains both JSON catalogs and
  preview indexes, with a joint checksummed manifest, and is verified before an
  atomic local directory swap.
- `pnpm registry:retirement:preflight` verifies the computed Changesets plan,
  `v3`/`next` release context, stable migration links, retained compatibility
  package, published CLI entry point, production endpoint build, and zero legacy
  runtime references. It reports repository readiness only; it never reads from
  or mutates npm.
- `pnpm registry:retirement:check` runs the complete registry CI matrix before
  that retirement preflight. `registry:release` includes the same preflight.
- `pnpm registry:retirement:packed-release` runs after Changesets versions and
  `build:packages` finishes. It packs the exact CLI, Chakra preset, and retained
  React compatibility package into an isolated temporary directory, inspects the
  publish manifests and file boundaries, and rejects stale versions, endpoints,
  local dependency protocols, or migration links. It then queries each exact
  target on public npm and byte-compares an occupied target tarball, allowing an
  unpublished target or an identical retry while rejecting different bytes. The
  temporary directory is removed on success and failure.
- `pnpm registry:retirement:version-availability` performs the earlier
  credential-free exact-version collision check from the pending Changesets
  plan. It skips after the transition changeset has been consumed because the
  packed-release gate then validates the versioned manifests and bytes.

The root release sequence intentionally builds before the packed-artifact gate.
The CLI `prepublishOnly` lifecycle only rechecks those already-built production
bytes; it does not rebuild after the tarballs have been approved. Running
`pnpm publish` directly without the root version/build/gate sequence is not a
supported release path.

## Development files and install payloads

Registry component directories may colocate runtime source with Vitest tests,
type tests, and Storybook stories. These files stay checked in and continue to
run in the repository, but they are development-only inputs:

- `*.test.*`, `*.spec.*`, test directories, and `__tests__`
- `*.test-d.*`, `*.spec-d.*`, and `*.type-test.*`
- `*.stories.*`, `*.story.*`, story directories, and `__stories__`
- preview support files used by the documentation and Storybook setup

The shared compiler excludes these conventions before graph analysis and fails
closed if one is injected into an installable payload. They never appear in
public or Pro item JSON, CLI plans or locks, or files written into a consumer
project. Public production compilation, Pro compilation, and CLI install-all
acceptance each enforce this boundary.

The combined release candidate contains private Pro template source. It must
remain runner-local unless the destination's authorization and retention have
been explicitly audited; the release workflow deliberately does not upload it as
a general GitHub Actions artifact. A future external publisher should upload the
verified unit to an immutable `releases/<releaseDigest>/` location and only then
atomically switch a single current-release pointer. That external promotion is
intentionally separate from repository-local generation.

The public release bundle is intentionally limited to public artifacts. Pro
registry publication is owned by the standalone Pro repository and should use
its own immutable release location and authorization boundary.

## Manual npm deprecation

`.github/workflows/deprecate-saas-ui-react.yml` is the only automated npm
deprecation entry point. It has no push, pull-request, release, or scheduled
trigger. Configure its `npm-deprecation` environment with required reviewers,
prevent self-review where available, restrict it to `v3`, and store a granular
package-scoped npm token as `NPM_DEPRECATE_TOKEN`.

Run the workflow in `plan` mode after the compatibility React package and exact
CLI/preset replacements are published. The read-only job snapshots the complete
current `@saas-ui/react` packument into a canonical sorted set of exact versions
and rejects conflicting deprecation metadata. It separately verifies the final
compatibility React version and replacement versions and dist-tags, the CLI
binary, replacement deprecation state, the exact React-to-preset dependency, and
the migration URL. It downloads the three exact final package tarballs with
lifecycle scripts disabled, independently verifies their bytes against published
`dist.integrity`, reads the migration contract from the React tarball README,
and verifies the CLI tarball's production build information. The full version
set and immutable integrity identities are included in the content digest and
exact confirmation phrase, which are also bound to the checked-out `v3` commit.
Rerun in `apply` mode at that same commit with the execute checkbox, digest, and
phrase. If `v3`, the published version set, or a tarball identity changed,
create and review a new plan. The protected job repeats every public check
without npm credentials after approval, then exposes the scoped token only to
authentication and npm's per-version dry-run and exact-version mutations. It
refetches the credential-free packument immediately before mutating each exact
version and performs bounded full-evidence post-verification.

An ambiguous mutation or post-verification failure may mean npm accepted part or
all of the approved set. Inspect every reported exact version before rerunning;
the workflow never blindly retries a mutation or automatically removes
deprecation metadata.

The workflow accepts no authored range or wildcard. It expands npm's complete
current package state into exact versions during planning and applies those
versions serially. npm exposes no batch operation with equivalent per-version
dry-run and fail-closed checks, so apply performs two authenticated npm commands
per pending version and can take substantially longer for a large history. The
workflow never publishes packages, changes dist-tags, removes the workspace, or
deploys registry artifacts.

Normal generation, checking, development, builds, and CI are offline.
`registry:icons` explicitly downloads source icons. The release/retirement npm
availability, tarball-comparison, and deprecation gates also perform read-only
public npm requests; only the separately approved deprecation apply job mutates
npm. After changing the configured icons, run `registry:icons`, review the
checked-in template changes, and then run `registry:generate`.

`pnpm dev:web` generates once before starting Next.js and runs the offline
watcher alongside it. `pnpm build:web` and direct website builds generate before
the Next.js production build. CLI, dogfood, consumer, and Pro development/test
entry points likewise prepare their emitted inputs, so none depends on registry
artifacts being present in a checkout.

## Legacy-package regression scopes

The guard's scope list and narrow per-file allowlist are exported from
`legacy-check.ts`. Current enforced islands are public registry templates,
forms, modals, test utilities, the Storybook addon/package, Palette, migrated
examples, and the retained Pro package and demo trees when the submodule is
present.

Historical changelogs, generated output, migration fixtures, and the legacy
packages themselves are outside these inputs. Tests and stories in ordinary
migrated packages remain enforced; convention exclusions apply only to
installable public/Pro template and package scopes. A required scope that is
missing or unreadable fails closed. Pro scopes are optional only when the
submodule is absent, and become strict as soon as it is checked out. Stale
allowlist entries fail so temporary exceptions cannot silently become permanent.
