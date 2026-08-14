# Saas UI CLI

The Saas UI CLI installs Chakra setup, editable compositions, and custom
components from the Saas UI registry.

After a global install, the preferred executable is `saas-ui`. The existing
`sui` executable remains available for compatibility. Without a global install,
use `npx @saas-ui/cli@rc` in place of `saas-ui` in the examples below.

## Initialize a project

Run `init` in an existing React project:

```bash
saas-ui init
```

Initialization installs `@chakra-ui/react`, `@emotion/react`, and
`@saas-ui/chakra-preset`, writes `components.json`, and installs the matching
local provider setup. Color mode is enabled by default in non-interactive
initialization and installs `next-themes`; choose explicitly with
`--color-mode on` or `--color-mode off`.

Framework package versions come from one CLI compatibility policy. While the v3
preset is published on the `rc` channel, clean projects receive the exact
current workspace release (embedded into the CLI at build time) rather than a
moving dist-tag; compatible stable v3 declarations remain valid for the eventual
stable channel. In a monorepo, `workspace:` declarations are retained only after
the CLI resolves the local package version and validates both its release
channel and any versioned workspace selector. A required package declared in
multiple package manifest dependency sections is rejected before mutation.

Use `--starter` to add the documented starter set (currently `sidebar`), or pass
item names after `init` to choose additional starter items. Setup items such as
`provider` and `color-mode` are selected by `--color-mode` and cannot also be
supplied as starter items.

The generated aliases default to:

| Flag                 | Default              |
| -------------------- | -------------------- |
| `--components-alias` | `@/components`       |
| `--ui-alias`         | `@/components/ui`    |
| `--utils-alias`      | `@/lib/utils`        |
| `--lib-alias`        | `@/lib`              |
| `--hooks-alias`      | `@/hooks`            |
| `--icons-alias`      | `@/components/icons` |

`--yes` accepts confirmations and uses the selected/default configuration.
`--defaults` avoids prompts and uses defaults for a new configuration. Combine
it with `--force` to replace conflicting existing configuration.

## Add registry items

Install one or more items and their complete transitive dependency graph:

```bash
saas-ui add sidebar
saas-ui add sidebar navbar
```

With no item names, `add` opens an interactive selector. `--all` selects every
public installable item; for a mutually exclusive group it selects the item
marked as that group's default. Ambiguous exclusive groups fail instead of
choosing arbitrarily. `--all` cannot be combined with explicitly named items.

Use `--dry-run` to print the complete file and package plan without writing
files, installing packages, or updating `components.json`. Dry runs require an
existing `components.json`. Use `--overwrite` to allow existing destination
files to be replaced. When configuration is missing, `--yes` skips the init
confirmation and initializes before adding; the default remains interactive.

Use `--diff` to inspect the transformed files before installing. It implies
`--dry-run`; without a path it shows the first five files, while an optional
path filters the output:

```bash
saas-ui add sidebar --diff
saas-ui add sidebar --diff sidebar.tsx
saas-ui add @acme/data-table --diff table.tsx
```

The output uses local files as the base and registry content as the proposed
result. Formatting-only changes are collapsed. Existing-file conflicts remain
non-mutating and still require `--overwrite` when the item is actually added.

### Third-party and private registries

The CLI supports shadcn-compatible registry namespaces. Map each namespace in
`components.json` to a URL template containing `{name}`. The optional `{style}`
placeholder, request headers, query parameters, and environment substitutions
are supported:

```json
{
  "$schema": "https://saas-ui.dev/r/schema/components.json",
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@private": {
      "url": "https://registry.example.com/{style}/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      },
      "params": {
        "version": "${REGISTRY_VERSION:-latest}"
      }
    }
  }
}
```

Install and inspect namespaced roots with the normal commands:

```bash
saas-ui add @acme/data-table @private/dashboard
saas-ui diff @private/dashboard
saas-ui update @private/dashboard --dry-run
```

Namespaced roots are stored unchanged in `installed`. A bare dependency such as
`button` inherits its parent item's namespace; an explicit dependency such as
`@acme/button` can cross registries. Registry-specific headers and parameters
are sent only to that namespace. Authentication headers require HTTPS, and
expanded credentials are not included in CLI errors. The CLI loads `.env.local`
and then `.env` without overriding variables already present in the command
environment. Keep those files out of source control and never commit secrets to
`components.json`.

## Inspect and update installed items

The CLI records only explicitly requested registry roots in the project's
`components.json`:

```json
{
  "installed": ["navbar", "sidebar"]
}
```

Transitive dependencies are resolved fresh from the registry and are not added
to this list. `diff` is non-mutating. With no names it compares every installed
root and its current dependency graph against the transformed local files;
otherwise it compares the named installed roots:

```bash
saas-ui diff
saas-ui diff sidebar
```

`update` refreshes installed roots by default. Pass names to limit the update,
`--all` to explicitly update every installed root, or `--dry-run` to show the
plan. Update overwrites destination files with current registry content. It does
not merge source and never deletes files that disappeared from a registry item
or its dependency graph.

```bash
saas-ui update
saas-ui update sidebar --dry-run
saas-ui update --all
```

## Migrate from `@saas-ui/react`

Read the
[Migrating from next to rc](https://saas-ui.dev/docs/getting-started/migrating-from-next)
guide before applying a write migration. It covers provider and color-mode
changes, component ownership, Pro blocks, manual cases, and verification. The
repository
[`@saas-ui/react` migration guide](https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md)
is the detailed source for the same path.

The migration scans the project by default, or only the supplied files,
directories, and globs:

```bash
saas-ui migrate react-to-registry --dry-run
saas-ui migrate react-to-registry --write
saas-ui migrate react-to-registry src/app --write
```

Migration is non-mutating unless `--write` is supplied. `--dry-run` makes the
non-mutating intent explicit, and `--json` prints the versioned machine-readable
report. `--write` and `--dry-run` are mutually exclusive.

The JSON and human reports include source diagnostics, requested templates,
required npm packages, and package-manifest actions. Migration rewrites Chakra
and preset imports, installs local composition templates, and removes
`@saas-ui/react` only after verifying that no static project or package
references remain. Unsupported and partial-project migrations fail closed with a
required manual package action. Source and `package.json` changes are rolled
back when package synchronization or template application fails; package manager
lock/install side effects remain outside that rollback boundary.

## Transaction and package-manager boundary

The CLI reports known conflicts before writing and commits registry files
together with project configuration changes such as `components.json`.
Filesystem updates are transactional, but package-manager operations are outside
that transaction. If dependency installation succeeds and a later filesystem
commit fails, the newly installed packages are not automatically removed.
Re-running the command is safe; remove an unwanted dependency with your package
manager if the retry does not require it.

## Local registry development

Build the CLI, then run its published command boundary against the canonical
generated JSON without using the deployed registry:

```bash
pnpm --filter @saas-ui/cli build
pnpm registry:cli:local -- add sidebar --cwd apps/website --yes
```

The runner serves `apps/website/public/r` on a temporary localhost port and sets
the runtime registry override only for the child CLI process. Set
`SAAS_UI_LOCAL_REGISTRY_ROOT` to exercise the same workflow with another
generated registry root. This command is suitable for dogfooding and CI; it does
not fall back to the network when a generated artifact is missing.

## Documentation

Visit <https://saas-ui.dev/docs/getting-started/cli> for the full documentation.

For the distribution-model transition, see
[Migrating from next to rc](https://saas-ui.dev/docs/getting-started/migrating-from-next)
and the repository
[`@saas-ui/react` migration guide](https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md).

## Acknowledgements

Based on the work of <https://ui.shadcn.com>.

## License

Licensed under the [MIT license](https://github.com/saas-js/saas-ui/LICENSE.md).
