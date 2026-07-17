import type { ProviderProps as ProviderWithoutColorModeProps } from './provider-no-color-mode/provider-no-color-mode.tsx'
import type { ProviderProps as ProviderWithColorModeProps } from './provider/provider.tsx'

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <
    Value,
  >() => Value extends Right ? 1 : 2
    ? true
    : false

type Expect<Value extends true> = Value

type CompatibleChildren = Expect<
  Equal<
    ProviderWithColorModeProps['children'],
    ProviderWithoutColorModeProps['children']
  >
>
type CompatibleLinkComponent = Expect<
  Equal<
    ProviderWithColorModeProps['linkComponent'],
    ProviderWithoutColorModeProps['linkComponent']
  >
>
type DefaultProviderSupportsCoreSurface = Expect<
  ProviderWithColorModeProps extends ProviderWithoutColorModeProps
    ? true
    : false
>
type NoColorModeProviderSupportsCoreSurface = Expect<
  {
    children: null
    linkComponent?: React.ElementType
  } extends ProviderWithoutColorModeProps
    ? true
    : false
>
