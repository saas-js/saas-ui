import type { AppShellVariantProps } from '@saas-ui/chakra-preset/slot-recipes/app-shell'

import type { AppShellProps, AppShellRootProps } from './app-shell.tsx'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type AppShellPreservesFullscreenVariant = Expect<
  Equal<AppShellProps['fullscreen'], AppShellVariantProps['fullscreen']>
>
type AppShellPreservesNamedVariant = Expect<
  Equal<AppShellProps['variant'], AppShellVariantProps['variant']>
>
type RootPreservesFullscreenVariant = Expect<
  Equal<AppShellRootProps['fullscreen'], AppShellVariantProps['fullscreen']>
>
type RootPreservesNamedVariant = Expect<
  Equal<AppShellRootProps['variant'], AppShellVariantProps['variant']>
>
