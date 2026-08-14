# Migrating from `@saas-ui/react`

Published user guide:
[Migrating from next to rc](https://saas-ui.dev/docs/getting-started/migrating-from-next).

Saas UI is moving from a bundled React component package to a preset and
source-template model:

- Chakra primitives come from `@chakra-ui/react`.
- Saas UI tokens, recipes, and system configuration come from
  `@saas-ui/chakra-preset`.
- Unstyled primitives such as Sidebar, Navbar, and GridList come from
  `@saas-ui/react`.
- Styled Chakra compositions are installed into your project with
  `@saas-ui/cli`.
- Installed files are owned by your project. Explicitly requested registry roots
  are recorded in `components.json`.

The previous `@saas-ui/react` bundle re-exported Chakra and styled compositions.
That usage should be migrated. The current `@saas-ui/react` package is the
unstyled primitives formerly published as `@saas-ui/core`.

## Distribution model

| Before                                                                   | Replacement                                                             |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Chakra exports re-exported by `@saas-ui/react`                           | Import from `@chakra-ui/react`                                          |
| `SuiProvider` and `defaultSystem`                                        | Local provider setup plus `@saas-ui/chakra-preset`                      |
| `Sidebar`, `AppShell`, `Page`, `Persona`, and other Saas UI compositions | Local registry templates installed by the CLI                           |
| Saas UI recipes and semantic tokens                                      | `@saas-ui/chakra-preset`                                                |
| Pro component package imports in installable blocks                      | Pro block source plus public registry dependencies installed by the CLI |

The preset is runtime configuration, not a component bundle. Registry files are
source code in your application and should be imported through the aliases in
`components.json`.

## New projects

The CLI initializes Chakra, the preset, aliases, provider setup, and optional
color mode support:

```sh
npx @saas-ui/cli@rc init
```

The default color-mode setup uses `next-themes`. Choose the setup explicitly for
non-interactive or automated initialization:

```sh
npx @saas-ui/cli@rc init --yes --defaults --color-mode on
npx @saas-ui/cli@rc init --yes --defaults --color-mode off
```

Add the documented starter set during initialization, or name starter items:

```sh
npx @saas-ui/cli@rc init --starter
npx @saas-ui/cli@rc init sidebar navbar
```

Initialization installs compatible versions of `@chakra-ui/react`,
`@emotion/react`, and `@saas-ui/chakra-preset`. It writes `components.json` and
installs exactly one provider variant. Do not install both `provider` and
`provider-no-color-mode`.

## Existing projects

Commit or stash unrelated work before a write migration. First initialize the
registry boundary if the project does not already have `components.json`:

```sh
npx @saas-ui/cli@rc init
```

Then generate a non-mutating migration report:

```sh
npx @saas-ui/cli@rc migrate react-to-registry --dry-run
npx @saas-ui/cli@rc migrate react-to-registry --dry-run --json > saas-ui-migration.json
```

The default scope is the project. Paths and globs can limit the report while a
team migrates in batches:

```sh
npx @saas-ui/cli@rc migrate react-to-registry src/app src/features --dry-run
```

Apply a reviewed plan with `--write`:

```sh
npx @saas-ui/cli@rc migrate react-to-registry --write
```

If the report identifies unmanaged component files that predate the registry
lock, review their differences first and opt in to replacing them:

```sh
npx @saas-ui/cli@rc migrate react-to-registry --write --overwrite
```

`--write` rewrites supported imports, installs required registry items, and
synchronizes package declarations. Source and manifest writes are rolled back if
migration or template application fails. Package-manager lockfile/install side
effects are outside that rollback boundary, so review them separately.

### Typical import changes

Chakra primitives move to Chakra directly:

```tsx
// Before
import { Box, Button, HStack } from '@saas-ui/react'

// After
import { Box, Button, HStack } from '@chakra-ui/react'
```

Custom components become local imports:

```tsx
// Before
import { AppShell, Sidebar } from '@saas-ui/react'

// After, using the default CLI alias
import { AppShell } from '#components/ui/app-shell'
import { Sidebar } from '#components/ui/sidebar'
```

The exact path follows the `ui` alias in `components.json`; do not copy a path
from this guide if the project uses a different alias.

## Provider and color mode

Prefer the provider installed by `init`. It composes Chakra with the preset, the
local link adapter, and the selected color-mode setup. Application code should
import that local provider rather than reconstructing `SuiProvider`:

```tsx
import { Provider } from '#components/setup/provider/provider'

export function AppProviders(props: { children: React.ReactNode }) {
  return <Provider>{props.children}</Provider>
}
```

If a framework integration needs a minimal provider without the registry
adapter, the underlying boundary is:

```tsx
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'

export function Provider(props: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
}
```

Add `next-themes` and the local color-mode composition when the application uses
light/dark switching. The CLI handles this with `--color-mode on`. Use
`--color-mode off` for applications that deliberately have no color-mode
provider.

Custom theme extensions should extend the preset config and create a system;
they should not import legacy `baseTheme` or `theme` exports:

```tsx
import { createSystem, defineConfig } from '@chakra-ui/react'
import { defaultConfig } from '@saas-ui/chakra-preset'

const appConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: { 500: { value: '#6d28d9' } },
      },
    },
  },
})

export const system = createSystem(defaultConfig, appConfig)
```

## Add custom components and blocks

Install named items and their complete transitive registry graph:

```sh
npx @saas-ui/cli@rc add sidebar
npx @saas-ui/cli@rc add app-shell page persona
```

Preview a plan without changing files or packages:

```sh
npx @saas-ui/cli@rc add sidebar --dry-run
npx @saas-ui/cli@rc add sidebar --diff
npx @saas-ui/cli@rc add sidebar --diff sidebar.tsx
```

`add --all` installs every public installable item and chooses the declared
default in mutually exclusive groups:

```sh
npx @saas-ui/cli@rc add --all
```

Registry templates may depend on Chakra, the preset, `@saas-ui/react`
primitives, local registry items, and real third-party packages. Installable
templates must not retain imports from `@saas-ui/core`.

Projects can also configure shadcn-compatible `registries` entries in
`components.json` and install namespaced items such as `@acme/data-table`.
Namespaced roots remain in the `installed` list so `diff` and `update` resolve
them from the correct registry. Private registry headers and parameters may use
`${ENV_VAR}` or `${ENV_VAR:-default}` substitutions; do not commit resolved
credentials. The CLI reads `.env.local` and `.env` while preserving values
already provided by the command environment.

## Diff and update local templates

`components.json` records only the explicitly installed registry roots.
Transitive items and their current files are resolved fresh for each command.

Inspect local and upstream differences without writing:

```sh
npx @saas-ui/cli@rc diff
npx @saas-ui/cli@rc diff sidebar
```

Review updates before applying them:

```sh
npx @saas-ui/cli@rc update sidebar --dry-run
npx @saas-ui/cli@rc update sidebar
npx @saas-ui/cli@rc update --all
```

`diff` lets you inspect local edits before applying an update. `update`
overwrites files with current registry content; it does not merge source or
delete files that disappeared upstream.

## Pro blocks

Authenticate before installing items that require a Saas UI Pro account:

```sh
npx @saas-ui/cli@rc login
npx @saas-ui/cli@rc add <pro-block-name>
```

A Pro block is installed as source, just like a public block. Public UI
dependencies are resolved from the public registry, Pro-to-Pro dependencies
remain in the authenticated graph, and explicitly requested items are recorded
in the same `components.json`. Generated Pro block source must import local
registry aliases instead of `@saas-ui/core`.

Do not commit CLI credentials. Commit the installed source and `components.json`
according to the project's normal source-control policy.

## Manual migration cases

The migration command fails closed instead of guessing when it cannot preserve
semantics. Review every diagnostic marked `manual`, especially for:

MDX is included in normal path and glob scanning. The command migrates complete
static ESM import declarations at the start of an MDX line and inside JavaScript
or TypeScript code fences (`js`, `jsx`, `ts`, `tsx`, and their module variants).
Multiline, aliased, and type-only named imports are supported from the
`@saas-ui/react` root and known component subpaths. Only the import declaration
is rewritten; surrounding prose, fence markers, examples, and line endings are
preserved.

- namespace, dynamic, CommonJS, or computed imports;
- malformed static imports, re-exports, and unknown deep imports without a
  registry mapping;
- wrappers around `SuiProvider`, custom theme merging, or application-specific
  link and color-mode behavior;
- locally forked Saas UI components or components with changed public props;
- generated, vendored, ignored, or symbolic-link source;
- a partial path/glob scan when other project files still reference the legacy
  package;
- package scripts, framework configuration, tests, stories, prose mentions,
  unsupported-language code fences, and code samples that do not contain a
  complete supported static import declaration;
- packages such as forms, hooks, or authentication whose own migration and
  release boundary must be evaluated separately;
- direct `@saas-ui/modals` or `@saas-ui/modals-provider` usage, which should be
  replaced by installing the `modals` registry item and updating imports to the
  configured local UI alias.

After each batch, run the project's formatter, strict typecheck, tests, and
production build. Visual and interaction tests are important where a Chakra v2
style API was converted to Chakra v3 compound components.

## Remove the previous Chakra re-export bundle

The previous `@saas-ui/react` bundle re-exported Chakra primitives. After
migration, application code should import those from `@chakra-ui/react` and
styled Saas UI compositions from local registry aliases. Installed templates
may still depend on the current `@saas-ui/react` primitives package.

Finish the Chakra re-export migration only after all of these are true:

1. The migration report has no required manual action.
2. Application source no longer imports Chakra primitives from
   `@saas-ui/react`.
3. Every required custom component is installed locally and present in the
   `components.json` installed list.
4. The provider uses `@saas-ui/chakra-preset` and the intended color-mode setup.
5. Typecheck, tests, and a production build pass.

Use a repository-wide scan as a final independent check:

```sh
rg "@saas-ui/core" \
  --glob '!**/node_modules/**' \
  --glob '!**/.next/**' \
  --glob '!**/dist/**'
```

`@saas-ui/core` is retired. Replace those imports with `@saas-ui/react`.
Release notes and changelogs may still mention old versions.

## Staged package retirement

`@saas-ui/core` is retired in favor of `@saas-ui/react` primitives. The previous
Chakra re-export bundle is replaced by `@chakra-ui/react`,
`@saas-ui/chakra-preset`, and registry templates.

Package lifecycle status is determined by published npm metadata.

The intended sequence is:

1. Release the preset exports required by installed templates.
2. Release the generated registry and compatible CLI.
3. Publish this migration path and keep a compatibility window.
4. Migrate repository consumers off `@saas-ui/core` and the previous Chakra
   re-export usage.
5. Publish `@saas-ui/react` as the unstyled primitives package.

Release maintainers can prove the repository side of this transition with:

```sh
pnpm registry:retirement:check
```

This checks the computed Changesets release plan, production CLI build contract,
stable migration links, and zero-runtime-import guard. Passing it does not mean
that any package was published.

## Command reference

```sh
# Initialize provider, aliases, and optional starter items
npx @saas-ui/cli@rc init

# Install templates
npx @saas-ui/cli@rc add sidebar

# Inspect and update installed templates
npx @saas-ui/cli@rc diff
npx @saas-ui/cli@rc update --all --dry-run

# Plan or apply the legacy-package migration
npx @saas-ui/cli@rc migrate react-to-registry --dry-run
npx @saas-ui/cli@rc migrate react-to-registry --write
```

See the [CLI README](packages/saas-ui-cli/README.md) for flags, transaction
behavior, aliases, and local registry development.
