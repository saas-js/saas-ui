# Registry Automation and `@saas-ui/react` Migration Plan

## Purpose

Automate the Saas UI registry as much as possible while changing the product
distribution model:

- `@saas-ui/chakra-preset` remains the Saas UI runtime package for Chakra UI
  tokens, recipes, semantic styling, and system configuration.
- Chakra primitives come from `@chakra-ui/react`.
- Saas UI compositions and custom components, such as `Sidebar`, are installed
  into a user's project as editable templates through the Saas UI CLI.
- `@saas-ui/react` becomes obsolete and is retired after all internal and
  external migration paths are available.

This plan assumes installed templates should not depend on `@saas-ui/react` or
`@saas-ui/core`. They may depend on Chakra UI, `@saas-ui/chakra-preset`, local
registry items, and genuine third-party packages. If `@saas-ui/core` is meant to
remain a supported runtime dependency, the custom-component migration can be
reduced accordingly.

## Current Implementation Status

| Phase                            | Status          | Acceptance evidence / remaining gate                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Registry contracts            | Complete        | Public, Pro, website routes, and CLI use one versioned schema. Both services expose `/r/schema/registry.json` and Pro retains its former route as an alias. Stable npm dependency selectors are limited to bare names or SemVer/partial SemVer with optional `^`/`~`; tags, URLs, aliases, Git/workspace specs, wildcards, comparators, composites, malformed scopes, and unused overrides fail closed.               |
| 2. One compiler                  | Complete        | Public and Pro use the shared compiler and transactional emitter. Two independent clean generations are byte-identical and every clean-checkout entry point prepares its inputs. All 91 root and 70 Pro generated entries are untracked and ignored. Starting with all four output directories absent, preparation regenerated both catalogs and `registry:ci`, the website build, and the Pro consumer build passed. |
| 3. Fail closed                   | Complete        | 83 shared compiler/schema/auth tests cover duplicate names, missing previews, injected stories/tests, missing generated dependencies, stale output, invalid overrides, exclusivity, and recipe validation. Production public and Pro compilers validate referenced recipes against the actual preset keys.                                                                                                            |
| 4. Preset/template boundary      | Complete        | Custom templates bind direct preset recipe values and export variant types. Chakra type generation uses the preset, and provider, Sidebar, and cross-template type contracts run in `registry:ci`.                                                                                                                                                                                                                    |
| 5. CLI product boundary          | Complete        | 234 CLI tests cover planning and transactions. Every one of the 82 public payloads has an exact preset-derived template version. A built-CLI process lane executes real `init`, `add`, `diff`, write-mode `update`, write-mode migration, and byte-for-byte rollback on migration failure.                                                                                                                            |
| 6. Dogfood generated templates   | Complete        | Website/compositions locks are drift-free. Public install-all covers 81 compatible items; packed CLI/preset tarballs install offline outside the workspace, run real write-mode update/migration, type-check, and build with Next. Pro installs 29 roots + 31 public dependencies and builds its clean consumer.                                                                                                      |
| 7. Development and CI automation | Complete (repo) | `registry:ci` passes schema, graph, two-build determinism, type-contract, built-CLI, packed-consumer, dogfood, public, and Pro gates. Release gates query exact planned npm versions and byte-compare any occupied version before publish. The tested promotion contract separates immutable public/Pro roots and switches one CAS pointer; production credentials and adapter remain external.                       |
| 8. Internal migration            | Complete        | Website, compositions, Pro, Storybook, examples, and supporting packages are migrated. Retained Pro manifests and both lockfiles resolve the preset `3.0.0-next.9` baseline, enforced by a wiring test. Package builds pass 15/15 and root tests pass 54 files/473 tests; the zero-legacy guard covers 3,584 files/30 scopes, including the full retained Pro package tree.                                           |
| 9. Retire `@saas-ui/react`       | Release gated   | Migration docs, codemod/CLI, compatibility changeset, zero-runtime verification, collision-safe packed-artifact gate, and commit/tarball/full-version-set-bound manual deprecation controls are ready. Publishing the compatibility release, applying npm deprecation, allowing adoption time, and later workspace removal require explicit release decisions and external registry access.                           |

Update this table only from verified worktree evidence. A phase is complete only
when its exit criteria and acceptance commands pass; source edits alone do not
advance a phase to complete.

## Target Architecture

| Concern                                                   | Source of truth                                      |
| --------------------------------------------------------- | ---------------------------------------------------- |
| Tokens, recipes, and semantic styling                     | `@saas-ui/chakra-preset`                             |
| Chakra primitives                                         | `@chakra-ui/react`                                   |
| Sidebar, app shell, persona, page, and similar components | Registry templates copied into the user's project    |
| Provider and color mode                                   | Registry setup templates installed by `saas-ui init` |
| Blocks                                                    | Registry templates composed from registry UI items   |
| Documentation examples                                    | The same registry source files users install         |
| Distribution                                              | Generated static registry artifacts                  |
| Installation and updates                                  | Saas UI CLI                                          |

The intended flow is:

```text
Preset recipes + template source
              |
              v
      registry compiler
              |
              v
validated dependency graph + static JSON
              |
              v
       website/CDN registry
              |
              v
        Saas UI CLI
              |
              v
user-owned components/ui files
```

## Guiding Principles

1. The checked-in component templates and preset recipes are the source of
   truth.
2. Names, files, dependencies, registry relationships, hashes, and published
   artifacts are generated.
3. Humans only maintain editorial or exceptional metadata.
4. Registry builds are deterministic and require no network access.
5. The website and documentation use the exact templates delivered by the CLI.
6. Invalid dependency graphs fail the build instead of publishing partial
   output.
7. Public and Pro registries use the same schema and compiler.

## Phase 1: Establish Registry Contracts

Define and document the supported registry item types:

- `registry:setup`: provider, color mode, and system setup
- `registry:ui`: reusable components and compositions
- `registry:lib`: shared utilities such as `create-context`
- `registry:hook`: reusable hooks
- `registry:icon`: generated or vendored icon templates
- `registry:block`: larger application blocks
- `registry:example`: documentation-only examples

Stories, tests, and examples must never be included in installable payloads.

The seven types above are the canonical template contract. Protocol v1 keeps a
read-only compatibility decoder for five pre-template wire types; current item
payloads use only canonical types, while `registry:style` remains solely as the
style-index envelope. Removing that decoder or envelope is a breaking protocol
v2 decision, not part of the compatibility release.

Consolidate the duplicated registry schemas used by the builder, website, Pro
registry, and CLI. As part of this work:

- Resolve the existing `RegistryEntry`/`RegistryItem` type mismatch.
- Add a registry protocol/schema version.
- Define which item and file types are installable.
- Define how private items may depend on public items and prohibit the reverse.
- Define stable rules for dependency names, versions, and registry URLs.
- Correct private-item authorization to check the parsed registry payload.

### Exit criteria

- The builder and CLI import one shared schema.
- Both public and Pro registry data validate against that schema.
- Schema incompatibilities produce explicit CLI errors.

## Phase 2: Replace the Two-Stage Generator With One Compiler

Replace `generate-registry-conf.ts` and `build-registry.ts` with one compiler
organized into pure stages:

1. `discoverRegistryItems()`
2. `analyzeItemFiles()`
3. `resolveDependencyGraph()`
4. `validateRegistry()`
5. `emitRegistryArtifacts()`

The compiler should construct the registry in memory. Generated TypeScript
manifests such as `registry-ui.ts` and `registry-icons-generated.ts` should no
longer be intermediate sources of truth.

### Automatically infer

- Item name and type from directory structure
- Installable `.ts` and `.tsx` files
- Client/server status
- npm dependencies from package imports
- Registry dependencies from cross-item imports
- Icon dependencies
- Exceptional file targets in the compiler; conventional install destinations
  from item type, source path, and project aliases in the CLI planner
- Source contents
- Content hashes
- Registry indexes
- Per-item JSON payloads
- Preview import indexes
- Recipe-to-template coverage

Use `ts-morph`, which is already available in the repository, to analyze every
installable source file. Do not infer dependencies with regular expressions or
by reading only `<name>/<name>.tsx`.

### Manually maintain only exceptional metadata

An item may contain a small optional `component.config.ts`:

```ts
export default defineRegistryItem({
  description: 'A collapsible application sidebar',
  category: 'layout',
  preview: './sidebar.example.tsx',
  docs: '...',
})
```

Manual configuration is limited to:

- Description, categories/subcategory, docs/source links, and display order
- Preview/primary-file selection and presentation canvas
- Private/public status
- Exceptional file targets
- Exceptional dependency versions
- Intentional file inclusion or exclusion
- Typed provider exclusivity/conflict metadata and block chunk declarations
- An independent per-item version for Pro or other separately released catalogs

### Generated artifacts

The compiler emits:

- The top-level registry index
- Style indexes
- Per-item JSON with embedded source content
- Icon metadata and item payloads
- Preview indexes used by the documentation site
- A machine-readable validation report for CI

Generation is deterministic and all development, build, CLI, consumer, Pro, and
CI entry points prepare their derived inputs. Public and Pro checks compare two
independent clean generations byte for byte instead of relying on tracked
output. The generated directories are ignored, and their former 91 root and 70
Pro entries have been removed from both Git indexes without deleting the working
copies. Clean-checkout behavior was verified with all four output directories
initially absent: `pnpm registry:prepare` recreated both catalogs, after which
`pnpm registry:ci` passed the full public and Pro matrix and
`pnpm --dir apps/website build` completed successfully. The Pro consumer build
is part of the passing `registry:ci` matrix.

## Phase 3: Make Validation Fail Closed

The compiler must reject the registry when:

- A registry dependency does not exist.
- A relative import leaves an item without resolving to another item.
- An installable template imports `@saas-ui/react`.
- An installable template imports `@saas-ui/core`.
- A declared file, target, or preview does not exist.
- Tests or stories enter an installation payload.
- Dependency cycles exist.
- Two items have the same name.
- A referenced custom `sui*` recipe is absent from the preset.
- A public item depends on a private item.
- An external import is missing from the generated npm dependencies.
- A removed item leaves stale output behind.

This validation must catch current malformed relationships such as raw file
paths in `registryDependencies` and references to registry items that do not
exist.

### Exit criteria

- Every published dependency resolves by registry item name or absolute URL.
- Deleting or renaming a source item cannot leave stale JSON artifacts.
- The registry cannot build with tests or stories in an installation payload.

## Phase 4: Define the Preset/Template Boundary

Custom component templates should bind directly to recipes exported by the
preset:

```ts
import {
  type SidebarVariantProps,
  sidebarSlotRecipe,
} from '@saas-ui/chakra-preset/slot-recipes/sidebar'
```

Prefer creating recipe contexts from the imported recipe rather than relying on
consumer-side Chakra type generation:

```ts
createSlotRecipeContext({ recipe: sidebarSlotRecipe })
```

For every custom recipe, export:

- The recipe value
- Its variant-props type
- Any public slot/type metadata needed by its template

Convert custom templates such as Sidebar, Navbar, GridList, and Persona so their
behavior is local to the installed files or implemented directly with Ark
UI/Chakra primitives. They should not import `@saas-ui/react` or
`@saas-ui/core`.

Use a vertical slice before converting the full catalog:

1. Provider setup item
2. Color-mode setup item
3. Sidebar recipe exports
4. Sidebar template and dependencies
5. CLI installation into a clean fixture
6. Fixture type-check and build

This validates the full architecture before performing the large migration.

## Phase 5: Make the CLI the Product Boundary

### `saas-ui init`

The command should:

- Install `@chakra-ui/react`.
- Install `@emotion/react`.
- Install `@saas-ui/chakra-preset`.
- Install `next-themes` only when color mode is selected.
- Create `components.json`.
- Install the provider and color-mode setup items.
- Optionally install a documented starter component set.

The installed provider should compose Chakra with the preset system and the
local color-mode provider.

### `saas-ui add <item>`

The command should:

- Resolve the complete transitive registry graph.
- Install registry dependencies before their dependants.
- Merge and install npm dependencies once.
- Rewrite registry aliases to the project's configured aliases.
- Preserve nested component paths.
- Record explicitly requested roots in `components.json`.
- Support a non-mutating dry run.
- Report conflicts before writing files.

Use the `components.json` installed list to select roots for `diff`, `update`,
and migration commands. Resolve current registry metadata on demand; do not
maintain a separate lockfile or delete files that disappear upstream.

### Migration command

Add a codemod-driven command such as:

```bash
saas-ui migrate react-to-registry
```

It should:

- Replace Chakra primitive imports from `@saas-ui/react` with
  `@chakra-ui/react`.
- Replace `defaultSystem` imports with `@saas-ui/chakra-preset`.
- Replace `SuiProvider` with the local provider template.
- Detect custom components such as `Sidebar`.
- Install the required templates.
- Rewrite custom component imports to the configured local alias.
- Produce a report for imports requiring manual migration.

## Phase 6: Dogfood the Generated Templates

The website and compositions app should consume the registry templates exactly
as users receive them.

Create a generated consumer fixture that:

1. Runs CLI initialization.
2. Installs every public registry item.
3. Type-checks the resulting project.
4. Builds a minimal Next.js or Vite application.
5. Verifies that no workspace-only import paths remain.

Documentation examples should import Chakra primitives directly and custom
components from the generated local UI alias. Examples and stories should live
outside installable item directories or be excluded by strict convention.

Pro blocks should also import registry UI aliases instead of `@saas-ui/react`,
allowing the compiler to derive their transitive registry dependencies.

## Phase 7: Wire Automation Into Development and CI

Add repository commands along these lines:

```json
{
  "registry:generate": "tsx tooling/registry/generate.ts",
  "registry:dev": "tsx tooling/registry/watch.ts",
  "registry:check": "tsx tooling/registry/check.ts",
  "registry:test": "vitest tooling/registry",
  "registry:icons": "tsx tooling/registry/generate-icons.ts"
}
```

Integrate them as follows:

- `dev:web`: generate once and watch registry and preset sources.
- `build`: generate before the Next.js build.
- Turborepo: cache generated output using registry and preset inputs.
- CI: run registry validation and the generated consumer fixture.
- Release: generate and deploy all registry artifacts atomically.

Keep icon downloading separate from normal generation. Checked-in icon source
templates are inputs; `registry:icons` is the explicit command that updates
them. Normal development, CI, and production builds must not need network access
to generate icons.

### Required CI checks

- Shared schema validation
- Dependency graph validation
- No forbidden runtime package imports in templates
- Preset recipe/template coverage
- Install-all fixture type-check
- Next.js or Vite fixture build
- CLI `init`, `add`, `diff`, and `update` integration tests
- Public/private dependency boundary validation
- Generated-output drift check during the transition

## Phase 8: Migrate Internal Consumers

Use codemods rather than manually changing the hundreds of existing
`@saas-ui/react` imports.

Recommended migration order:

1. Provider and color mode
2. Sidebar vertical slice
3. Remaining custom `sui*` components
4. Chakra composition wrappers
5. Blocks and Pro templates
6. Compositions documentation
7. Website
8. Examples and auxiliary packages
9. Remaining packages that import `@saas-ui/react`

For each batch:

- Convert Chakra re-exports to direct `@chakra-ui/react` imports.
- Install or reference registry templates for custom components.
- Run the affected package type-checks and tests.
- Add a CI rule preventing new `@saas-ui/react` imports in migrated paths.

## Phase 9: Retire `@saas-ui/react`

Do not remove the package until the replacement registry and CLI are released
and internal consumers have migrated.

Retirement sequence:

1. Release the preset exports required by templates.
2. Release the automated registry and compatible CLI.
3. Publish migration documentation and the codemod command.
4. Migrate all repository consumers.
5. Publish a final compatibility/migration release of `@saas-ui/react`.
6. Mark the npm package as deprecated with a link to the migration guide.
7. Remove it from the workspace after CI confirms zero runtime imports.

### Current release checkpoint

Repository work for steps 1–4 is complete and continuously verified:

- The preset exports, registry artifacts, compatible CLI, migration command, and
  migration documentation are ready for release.
- `.changeset/registry-template-transition.md` records the compatibility
  release, including a final patch for `@saas-ui/react`.
- `pnpm registry:ci`, `pnpm test:ci`, and `pnpm build:packages` pass.
- The legacy-package guard checks 3,584 files across 30 retained consumer scopes
  and has no unreviewed exceptions.
- `pnpm registry:release` assembles public artifacts, Pro artifacts, and both
  preview indexes as one deterministic, locally verified release candidate. Its
  joint manifest is content-addressed so a future publisher can promote the unit
  atomically without exposing private Pro templates as a generic CI artifact.
- The promotion contract writes public and Pro catalogs to separate immutable
  digest roots, then compare-and-swaps one joint pointer. A tested filesystem
  adapter proves ordering, failure-before-pointer behavior, and stale-pointer
  rejection; the production storage adapter and credentials remain external.
- `pnpm registry:retirement:preflight` validates ten repository-side retirement
  contracts, including the computed Changesets versions, the `v3`/`next` release
  context, production CLI endpoints, stable migration links, and all 3,584
  guarded files across 30 scopes. Its output explicitly does not claim npm
  publication or deprecation.
- The root release command versions packages, generates Chakra typings, builds
  all packages, and then runs `registry:retirement:packed-release` before
  publication. That gate verified the exact local CLI, preset, and retained
  React tarballs, including their publish manifests, required files, production
  CLI build information, migration links, and exact React-to-preset dependency.
  It also queries each exact target on public npm and byte-compares an occupied
  target tarball, allowing an unpublished target or an identical idempotent
  retry while rejecting different bytes. The CLI publish hook only rechecks
  built output, so it cannot replace approved bytes with an unchecked rebuild.
- The planned compatibility targets are CLI `0.1.0-next.2`, preset
  `3.0.0-next.10`, and React `3.0.0-next.56`. A credential-free npm availability
  check confirmed on July 13, 2026 that all three exact versions were available.
- A manual-only `Deprecate @saas-ui/react` workflow creates a read-only,
  content-addressed plan for the complete current npm version set, expanded and
  sorted as exact versions, and binds it to the reviewed `v3` control commit.
  Applying it at that same commit requires a second dispatch with the plan
  digest, exact confirmation, execute switch, protected-environment approval,
  and a narrowly scoped npm token. It preserves final compatibility evidence by
  verifying the selected React-to-preset dependency, exact React migration
  README, CLI production build information, and independently computed integrity
  of all three exact final package tarballs. The exact target set and immutable
  identities are part of the plan digest. The workflow keeps the token out of
  public reads, disables lifecycle scripts while packing, rechecks the complete
  set before each exact mutation, uses npm dry-run, and performs bounded
  full-evidence post-verification. It is not wired to the release workflow.

Steps 5–7 are intentionally release-gated. Publish the compatibility release
before applying npm deprecation metadata. Remove the workspace only in a later
change after the published migration path has had an adoption window and CI
still proves zero runtime consumers. Neither npm publication/deprecation nor
workspace removal should be inferred from repository-local implementation
approval.

## Suggested Implementation Milestones

### Milestone 1: Foundation

- Shared schema and types
- Registry protocol version
- Pure discovery and AST analysis
- Graph validation
- Deterministic JSON emission

### Milestone 2: Vertical slice

- Provider and color-mode templates
- Preset recipe/type exports for Sidebar
- Sidebar without `@saas-ui/react` or `@saas-ui/core`
- `saas-ui init` and `saas-ui add sidebar`
- Consumer fixture type-check and build

### Milestone 3: Full public catalog

- Convert remaining UI templates
- Resolve all cross-item dependencies
- Separate installable files from examples/tests
- Generate icons and indexes deterministically

### Milestone 4: Internal migration

- Import codemods
- Compositions migration
- Website migration
- Pro block migration
- Example application migration

### Milestone 5: Release and retirement

- Versioned registry deployment
- CLI migration/update support
- Migration documentation
- Final `@saas-ui/react` release and npm deprecation

## Completion Criteria

The migration is complete when:

- A clean checkout builds the registry without network access.
- Editing a template automatically updates the local development registry.
- `saas-ui init` produces a working preset-based Chakra provider.
- `saas-ui add sidebar` installs a type-safe, user-owned Sidebar.
- Every registry item can be installed and type-checked in a clean fixture.
- No installable template imports `@saas-ui/react` or `@saas-ui/core`.
- The website and documentation use the same templates users install.
- All registry metadata except editorial fields and explicit overrides is
  generated.
- Public and Pro registries share the compiler and schema.
- `@saas-ui/react` has no remaining runtime consumers.

## Recommended First Deliverable

Implement the registry compiler and the complete Provider-to-Sidebar vertical
slice before migrating the rest of the catalog. This single deliverable tests
the preset contract, dependency inference, registry emission, CLI installation,
alias rewriting, consumer type-checking, and documentation integration without
committing to a bulk migration prematurely.
