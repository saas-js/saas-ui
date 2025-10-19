/**
 * Recipe style context for multi-slot components
 */
import {
  type ComponentProps,
  type ElementType,
  type JSX,
  createContext,
  forwardRef,
  useContext,
} from 'react'

import type { PolymorphicProps } from '@ark-ui/react'
import { cx } from '@saas-ui/panda-preset/css'
import { styled } from '@saas-ui/panda-preset/jsx'
import {
  type Assign,
  type Dict,
  type HTMLStyledProps,
  JsxFactoryOptions,
  JsxHTMLProps,
  type JsxStyleProps,
  StyledComponent,
} from '@saas-ui/panda-preset/types'

type GenericProps = Record<string, any>
type StyleRecipe = {
  (props?: GenericProps): GenericProps
  splitVariantProps: (props: GenericProps) => [GenericProps, GenericProps]
}
type StyleSlot<R extends StyleRecipe> = keyof ReturnType<R>
type StyleSlotRecipe<R extends StyleRecipe> = Record<StyleSlot<R>, string>
type StyleVariantProps<R extends StyleRecipe> = Parameters<R>[0]
type CombineProps<T, U> = Omit<T, keyof U> & U

export type ComponentVariants<T extends ElementType, R extends StyleRecipe> = (
  props: CombineProps<ComponentProps<T>, StyleVariantProps<R>>,
) => JSX.Element

export type HTMLSuiProps<
  T extends ElementType,
  Props extends Dict = {},
> = Assign<HTMLStyledProps<T>, Props> & PolymorphicProps

export const createStyleContext = <R extends StyleRecipe>(recipe: R) => {
  const StyleContext = createContext<StyleSlotRecipe<R> | null>(null)

  const withProvider = <T, Props extends { className?: string }>(
    Component: ElementType,
    slot?: StyleSlot<R>,
    options?: JsxFactoryOptions<Props>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<JsxHTMLProps<Props, JsxStyleProps>> &
      React.RefAttributes<T>
  > => {
    const { defaultProps, ...restProps } = options ?? {}

    const SuperComponent = styled(
      Component,
      {},
      restProps,
    ) as StyledComponent<ElementType>

    const StyledComponent = forwardRef<T, any>((props, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps({
        ...defaultProps,
        ...props,
      })
      const slotStyles = recipe(variantProps) as Record<StyleSlot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <SuperComponent
            ref={ref}
            {...otherProps}
            className={cx(
              slot ? slotStyles[slot] : undefined,
              otherProps.className,
            )}
          />
        </StyleContext.Provider>
      )
    })

    return StyledComponent
  }

  const withContext = <T, Props extends { className?: string }>(
    Component: ElementType,
    slot?: StyleSlot<R>,
    options?: JsxFactoryOptions<Props>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<JsxHTMLProps<Props, JsxStyleProps>> &
      React.RefAttributes<T>
  > => {
    const SuperComponent = styled(
      Component,
      {},
      options,
    ) as StyledComponent<ElementType>

    const StyledComponent = forwardRef<T, any>((props, ref) => {
      const slotStyles = useContext(StyleContext)

      return (
        <SuperComponent
          {...props}
          ref={ref}
          className={cx(slot ? slotStyles?.[slot] : undefined, props.className)}
        />
      )
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name

    return StyledComponent
  }

  return {
    withProvider,
    withContext,
  }
}
