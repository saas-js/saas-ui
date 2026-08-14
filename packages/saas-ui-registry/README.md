# `@saas-ui/registry`

Shared schemas, authentication helpers, and compiler primitives for Saas UI
source registries.

This package is infrastructure for registry authors. Application developers
normally use [`@saas-ui/cli`](../saas-ui-cli/README.md) to install components;
they do not need to call this package directly.

## How it works

The compiler turns checked-in TypeScript templates into deterministic,
shadcn-compatible JSON artifacts:

```text
template directories + component.config.ts
                    |
                    v
 discover -> analyze imports -> resolve graph -> validate -> emit
                    |
                    v
 index.json + per-item JSON + schemas + preview index + validation report
```

The stages are deliberately separate and exported from
`@saas-ui/registry/compiler`:

1. `discoverRegistryItems` finds items using directory conventions and reads
   `component.config.ts` as static data. Config files are not executed.
2. `analyzeItemFiles` parses TypeScript with `ts-morph`, follows configured
   aliases, and infers package, registry, icon, and recipe dependencies.
3. `resolveDependencyGraph` assigns file ownership and creates the dependency
   graph.
4. `validateRegistry` rejects invalid or unsafe catalogs.
5. `emitValidatedRegistryArtifacts` creates the complete artifact set and, when
   an output directory is supplied, publishes it transactionally.

Publication is fail-closed: artifacts are built and validated before the
existing output is replaced. Concurrent writers are serialized, stale generated
files are removed, and a failed multi-directory commit is rolled back.

Development files can live next to a component, but tests, type tests, stories,
and previews are never copied into an installable payload.

## Package exports

- `@saas-ui/registry` exports the protocol schemas and authentication helpers.
- `@saas-ui/registry/schema` exports the Zod schemas, parsers, protocol version,
  item types, and the shadcn-compatible `components.json` schema.
- `@saas-ui/registry/auth` exports bearer-token parsing and a Supabase access
  token verifier.
- `@saas-ui/registry/compiler` exports the compiler pipeline, authoring types,
  validator, and transactional emitter.

Install the package when building a registry outside this monorepo:

```sh
pnpm add @saas-ui/registry
```

The compiler uses `ts-morph` and the package declares the compatible major
version. Schema-only consumers do not need to import or configure it.

## Compiler usage

This is the minimal shape of a compiler entry point:

```ts
import {
  analyzeItemFiles,
  createEmitRegistryInput,
  discoverRegistryItems,
  emitValidatedRegistryArtifacts,
  resolveDependencyGraph,
  validateRegistry,
} from '@saas-ui/registry/compiler'

const discovery = await discoverRegistryItems({
  sourceRoots: [{ path: 'registry/default', version: '1.0.0' }],
})

const analysis = await analyzeItemFiles(discovery, {
  aliases: {
    '@': process.cwd(),
  },
})

const graph = resolveDependencyGraph(analysis, {
  externalPackages: ['react', 'react-dom'],
})
const validation = validateRegistry(graph)
const input = createEmitRegistryInput(graph, {
  name: 'my-registry',
  homepage: 'https://example.com',
  diagnostics: validation.diagnostics,
})

await emitValidatedRegistryArtifacts(input, {
  outputDir: 'public/r',
  previewOutputDir: '__registry__',
})
```

Pass `presetRecipeKeys` to `validateRegistry` when templates reference a known
Chakra preset. Pass `externalRegistries` to `analyzeItemFiles` when source
imports should resolve against another pinned registry catalog.

## Adding a component in this repository

The public Saas UI templates live in `apps/website/registry/default`, not inside
this package. Add source under the directory matching its install type:

| Directory      | Registry type        | Default destination         |
| -------------- | -------------------- | --------------------------- |
| `setup`        | `registry:setup`     | setup component target      |
| `ui`           | `registry:ui`        | configured UI alias         |
| `forms`        | `registry:component` | configured components alias |
| `hooks`        | `registry:hook`      | configured hooks alias      |
| `lib`, `utils` | `registry:lib`       | configured library alias    |
| `icons`        | `registry:icon`      | configured icons alias      |
| `blocks`       | `registry:block`     | configured components alias |
| `examples`     | `registry:example`   | documentation only          |

Use one directory per item. Imports between item directories become
`registryDependencies`; package imports become `dependencies`. Do not maintain
either list by hand.

Optional metadata belongs in `component.config.ts`:

```ts
import type { RegistryItemConfig } from '@saas-ui/registry/compiler'

export default {
  description: 'A compact account switcher',
  category: 'Navigation',
  preview: './account-switcher.example.tsx',
  dependencyVersions: {
    'some-package': '^2.0.0',
  },
} satisfies RegistryItemConfig
```

Common exceptional fields are `private`, `version`, `primaryFile`, `include`,
`exclude`, `targets`, `dependencyVersions`, `canvas`, and `meta`. Keep config
values statically readable: literals, arrays, and object literals only.

A local preview must have a statically provable renderable default export.
Stories and tests may stay beside the runtime source and continue to run in the
development setup; the compiler excludes them from emitted JSON.

Generate and inspect the result from the community repository root:

```sh
pnpm registry:generate
pnpm registry:check
pnpm registry:cli:local -- add <item-name> --cwd <consumer-project> --yes
```

The generated public catalog is written to `apps/website/public/r`; the docs
preview manifest is written to `apps/website/__registry__`.

## Build and test

Run package-only checks from the community repository root:

```sh
pnpm --filter @saas-ui/registry build
pnpm --filter @saas-ui/registry typecheck
pnpm --filter @saas-ui/registry test
```

For a change that affects real templates or compiler output, run the registry
checks as well:

```sh
pnpm registry:check
pnpm registry:test
pnpm registry:ci
```

`registry:check` performs two clean compilations and compares them byte for
byte. `registry:ci` also exercises type contracts, the built CLI, clean consumer
installs, public/Pro dependency resolution, and dogfood projects. See the
[registry automation guide](../../tooling/registry/README.md) for the complete
command matrix.

## Deployment and release

`@saas-ui/registry` is an npm library; it is not an HTTP registry server. Its
`build` script emits ESM, CommonJS, declarations, and source maps to `dist`.
Package versions and npm publication are handled by the repository's Changesets
release workflow.

The public component registry is a separate generated artifact. The website
build runs registry preparation and serves `apps/website/public/r` as static
files. `pnpm registry:release` validates the complete catalog and assembles a
deterministic release candidate under `.artifacts/registry-release`; promotion
to external hosting happens outside this package.

Do not run a direct package publish as a substitute for the root release
workflow.

## Environment variables

This package reads no environment variables. Compilation is offline and is
controlled through function options and explicit paths. Networked icon syncing,
npm release checks, and deployment credentials belong to the repository tooling
that invokes the compiler, not to `@saas-ui/registry`.
