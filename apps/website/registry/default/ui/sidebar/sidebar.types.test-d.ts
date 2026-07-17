import type { SidebarVariantProps } from '@saas-ui/chakra-preset/slot-recipes/sidebar'

import type { SidebarMode, SidebarOptions } from './sidebar.context.ts'
import type { ProviderProps, RootBaseProps } from './sidebar.tsx'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type ProviderModeUsesBehaviorContract = Expect<
  Equal<ProviderProps['mode'], SidebarOptions['mode']>
>
type RootModeUsesBehaviorContract = Expect<
  Equal<RootBaseProps['mode'], SidebarMode | undefined>
>
type ProviderPreservesRecipeVariant = Expect<
  Equal<ProviderProps['variant'], SidebarVariantProps['variant']>
>
type ProviderPreservesRecipeSize = Expect<
  Equal<ProviderProps['size'], SidebarVariantProps['size']>
>
type ProviderAcceptsBehaviorMode = Expect<
  Equal<
    { children: null; mode: 'flyout' } extends ProviderProps ? true : false,
    true
  >
>
type ProviderRejectsResponsiveBehaviorMode = Expect<
  Equal<
    {
      children: null
      mode: { base: 'collapsible'; md: 'flyout' }
    } extends ProviderProps
      ? true
      : false,
    false
  >
>
