# Registry consumer fixture

This fixture exercises the public registry as a real CLI consumer without an
HTTP server. It reads the canonical JSON below `apps/website/public/r`, runs
`runInitWithResult`, and then installs `sidebar` and `navbar` with
`installRegistryItems`.

A clean color-mode-off fixture neither declares nor asks the dependency
installer for `next-themes`; the color-mode-on fixture does both. Switching an
already initialized project off removes the unreachable color-mode template, but
intentionally does not ask the package manager to uninstall an existing
`next-themes` dependency. Dependency removal remains an explicit user/package
manager action.

The unit command never invokes a package manager:

```sh
pnpm registry:consumer:test
```

The acceptance command materializes both color-mode variants below the website's
ignored `.next` directory, type-checks each project, and builds each with
Next.js. It reuses the frozen workspace installation and still performs no
dependency installation or network access:

```sh
pnpm registry:consumer:acceptance
```

Phase 6 also has a generated install-all fixture. It initializes a clean
color-mode-on project, reads the complete canonical public index, applies the
same exclusive-default selection as `saas-ui add --all`, and installs the entire
selected graph through the real planner. Its assertions verify every canonical
content hash and installed file hash, the complete dependency graph in the lock,
transformed import boundaries, and a byte-identical second run:

```sh
pnpm registry:consumer:install-all:test
pnpm registry:consumer:install-all:acceptance
```

The install-all acceptance command strictly type-checks every generated
`.ts`/`.tsx` file and builds the minimal Next.js app. At present the only
excluded public installable entry is `provider-no-color-mode`, because
`provider` is the declared default for their exclusive provider group.

The commands run registry generation before consuming the emitted JSON. Restore
workspace dependencies before the acceptance command so
`apps/website/node_modules/.bin/tsc` and `apps/website/node_modules/.bin/next`
exist. Temporary projects are removed in `finally` blocks even when an assertion
or build fails.
