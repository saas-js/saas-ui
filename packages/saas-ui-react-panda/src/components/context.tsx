/**
 * Recipe style context for multi-slot components
 */
import {
  type ComponentProps,
  type ElementType,
  type JSX,
  createContext,
  createElement,
  forwardRef,
  useContext,
} from 'react'

import { cx } from '@saas-ui/panda-preset/css'
import { styled } from '@saas-ui/panda-preset/jsx'
import { JsxFactoryOptions, StyledComponent } from '@saas-ui/panda-preset/types'

type GenericProps = Record<string, unknown>
type StyleRecipe = {
  (props?: GenericProps): Record<string, string>
  splitVariantProps: (props: GenericProps) => any
}
type StyleSlot<R extends StyleRecipe> = keyof ReturnType<R>
type StyleSlotRecipe<R extends StyleRecipe> = Record<StyleSlot<R>, string>
type StyleVariantProps<R extends StyleRecipe> = Parameters<R>[0]
type CombineProps<T, U> = Omit<T, keyof U> & U

export type ComponentVariants<T extends ElementType, R extends StyleRecipe> = (
  props: CombineProps<ComponentProps<T>, StyleVariantProps<R>>,
) => JSX.Element

export const createStyleContext = <R extends StyleRecipe>(recipe: R) => {
  const StyleContext = createContext<StyleSlotRecipe<R> | null>(null)

  const withProvider = <T extends ElementType>(
    Component: T,
    slot?: StyleSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>,
  ): ComponentVariants<StyledComponent<T, ComponentProps<T>>, R> => {
    const StyledComponent = forwardRef<any, any>((props: any, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as StyleSlotRecipe<R>

      const SuperComponent = styled(Component, {}, options) as any

      return (
        <StyleContext.Provider value={slotStyles}>
          <SuperComponent
            ref={ref}
            {...otherProps}
            className={cx(slotStyles[slot ?? ''], otherProps.className)}
          />
        </StyleContext.Provider>
      )
    })
    return StyledComponent as unknown as ComponentVariants<T, R>
  }

  const withContext = <T extends ElementType>(
    Component: T,
    slot?: StyleSlot<R>,
    options?: JsxFactoryOptions<ComponentProps<T>>,
  ): StyledComponent<T, ComponentProps<T>> => {
    if (!slot) return Component as any
    const StyledComponent = forwardRef((props: any, ref) => {
      const slotStyles = useContext(StyleContext)
      const SuperComponent = styled(Component, {}, options) as any

      return createElement(SuperComponent, {
        ...props,
        className: cx(slotStyles?.[slot ?? ''], props.className),
        ref,
      })
    })
    return StyledComponent as any
  }

  return {
    withProvider,
    withContext,
  }
}
