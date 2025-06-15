import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import { useResizeObserver } from '@react-aria/utils'
import { useScrollPosition } from '@saas-ui/hooks'

import { dataAttr, splitProps } from '#utils'

export const splitNavbarProps = <T extends Record<string, any>>(props: T) =>
  splitProps(props, [
    'parentRef',
    'height',
    'shouldHideOnScroll',
    'disableScrollHandler',
    'onScrollPositionChange',
  ])

export interface UseNavbarProps {
  /**
   * Ref to the DOM node.
   */
  ref: React.ForwardedRef<HTMLDivElement>
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: React.RefObject<HTMLElement>
  /**
   * The height of the navbar.
   * @default "3.5rem" (56px)
   */
  height?: number | string
  /**
   * Whether the navbar should hide on scroll or not.
   * @default false
   */
  shouldHideOnScroll?: boolean
  /**
   * Whether the navbar parent scroll event should be listened to or not.
   * @default false
   */
  disableScrollHandler?: boolean
  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * it only works if `disableScrollHandler` is set to `false` or `shouldHideOnScroll` is set to `true`.
   */
  onScrollPositionChange?: (scrollPosition: number) => void
}

export function useNavbar(props: UseNavbarProps) {
  const {
    ref,
    parentRef,
    height = '3.5rem',
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
  } = props

  const rootRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement)

  const prevWidth = useRef(0)
  const navHeight = useRef(0)

  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  const updateWidth = () => {
    if (rootRef.current) {
      const width = rootRef.current.offsetWidth

      if (width !== prevWidth.current) {
        prevWidth.current = width
      }
    }
  }

  useResizeObserver({
    ref: rootRef,
    onResize: () => {
      const currentWidth = rootRef.current?.offsetWidth

      if (currentWidth !== prevWidth.current) {
        updateWidth()
      }
    },
  })

  useEffect(() => {
    updateWidth()

    navHeight.current = rootRef.current?.offsetHeight || 0
  }, [])

  useScrollPosition({
    elementRef: parentRef,
    isEnabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({ prevPos, currPos }) => {
      onScrollPositionChange?.(currPos.y)

      setAtTop(currPos.y === 0)

      if (shouldHideOnScroll) {
        setHidden((prev) => {
          const next = currPos.y > prevPos.y && currPos.y > navHeight.current

          return next !== prev ? next : prev
        })
      }
    },
  })

  const rootProps = {
    ref: rootRef,
    'data-hidden': dataAttr(hidden),
    'data-at-top': dataAttr(atTop),
    style: {
      '--navbar-height': height,
    },
  }

  return {
    rootRef,
    height,
    hidden,
    shouldHideOnScroll,
    rootProps,
  }
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>
