/**
 * Recipe style context for multi-slot components
 */

import { cx } from '@saas-ui/panda/css'
import {
  type ComponentProps,
  type ElementType,
  type JSX,
  createContext,
  createElement,
  forwardRef,
  useContext,
  useMemo,
} from 'react'

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
  props: CombineProps<ComponentProps<T>, StyleVariantProps<R>>
) => JSX.Element

export const createStyleContext = <R extends StyleRecipe>(
  recipe: R,
  shouldForwardVariantProp?: (prop: string) => boolean
) => {
  const StyleContext = createContext<StyleSlotRecipe<R> | null>(null)

  const withProvider = <T extends ElementType>(
    Component: T,
    slot?: StyleSlot<R>
  ): ComponentVariants<T, R> => {
    const StyledComponent = forwardRef((props: any, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as StyleSlotRecipe<R>
      const forwardedVariantProps = useMemo(() => {
        const variantKeys = Object.keys(variantProps)
        return variantKeys.reduce((acc, key) => {
          if (shouldForwardVariantProp?.(key)) {
            acc[key] = variantProps[key]
          }
          return acc
        }, {} as any)
      }, [shouldForwardVariantProp, variantProps])

      return (
        <StyleContext.Provider value={slotStyles}>
          <Component
            ref={ref}
            {...otherProps}
            className={cx(slotStyles[slot ?? ''], otherProps.className)}
            {...forwardedVariantProps}
          />
        </StyleContext.Provider>
      )
    })
    return StyledComponent as unknown as ComponentVariants<T, R>
  }

  const withContext = <T extends ElementType>(
    Component: T,
    slot?: StyleSlot<R>
  ): T => {
    if (!slot) return Component
    const StyledComponent = forwardRef((props: any, ref) => {
      const slotStyles = useContext(StyleContext)
      return createElement(Component, {
        ...props,
        className: cx(slotStyles?.[slot ?? ''], props.className),
        ref,
      })
    })
    return StyledComponent as unknown as T
  }

  return {
    withProvider,
    withContext,
  }
}
