import { mergeProps } from '@zag-js/core'
import React, {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type JSX,
} from 'react'
import { composeRefs } from './compose-refs'

type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: PulseForwardRefComponent<E>
}
type PulseForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<PulsePropsWithRef<E>>
type PulsePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean
  }

const withAsChild = (Component: React.ElementType) => {
  const Comp = forwardRef<unknown, PulsePropsWithRef<typeof Component>>(
    (props, ref) => {
      const { asChild, children, ...restProps } = props

      if (!asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      const onlyChild = Children.only(children)
      return isValidElement(onlyChild)
        ? cloneElement(onlyChild, {
            ...mergeProps(restProps, onlyChild.props as any),
            ref: ref
              ? composeRefs(ref, (onlyChild as any).ref)
              : (onlyChild as any).ref,
          })
        : null
    },
  )

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export type HTMLPulseProps<T extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T> & {
    /**
     * Render as a different element type.
     */
    asChild?: boolean
  }

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const pulse = jsxFactory()
