# `@saas-ui/react`

Unstyled React primitives for Saas UI. Styled Chakra compositions are installed
from the registry with `@saas-ui/cli`.

```sh
npm i @saas-ui/react
```

```tsx
import { Sidebar, useSidebar } from '@saas-ui/react/sidebar'
import { Navbar } from '@saas-ui/react/navbar'
import { GridList } from '@saas-ui/react/grid-list'
```

The package also exports `ErrorBoundary`, stepper hooks, and shared utilities.

Existing projects that used the previous Chakra re-export bundle should follow
the [docs](https://saas-ui.dev/docs/getting-started/migrating-from-next) or the
[migration guide](https://github.com/saas-js/saas-ui/blob/v3/MIGRATION.md).

## License

MIT
