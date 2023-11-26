import { PropGetterV2 } from '@chakra-ui/react-utils'
import { dataAttr } from '@chakra-ui/utils'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useResizeObserver } from '@react-aria/utils'
import { useScrollPosition } from '@saas-ui/hooks'
import { HTMLMotionProps } from 'framer-motion'

export interface UseNavbarProps {
  /**
   * Ref to the DOM node.
   */
  ref: React.ForwardedRef<HTMLElement>
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
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   * This motion is only available if the `shouldHideOnScroll` prop is set to `true`.
   */
  motionProps?: HTMLMotionProps<'nav'>
  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * it only works if `disableScrollHandler` is set to `false` or `shouldHideOnScroll` is set to `true`.
   */
  onScrollPositionChange?: (scrollPosition: number) => void
  /**
   * Style props to be applied to the navbar container.
   */
  style?: React.CSSProperties
}

export function useNavbar(props: UseNavbarProps) {
  const {
    ref,
    parentRef,
    height = '3.5rem',
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
    motionProps,
    ...containerProps
  } = props

  const containerRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, () => containerRef.current as HTMLElement)

  const prevWidth = useRef(0)
  const navHeight = useRef(0)

  const [isHidden, setIsHidden] = useState(false)

  const updateWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth

      if (width !== prevWidth.current) {
        prevWidth.current = width
      }
    }
  }

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      const currentWidth = containerRef.current?.offsetWidth

      if (currentWidth !== prevWidth.current) {
        updateWidth()
      }
    },
  })

  useEffect(() => {
    updateWidth()

    navHeight.current = containerRef.current?.offsetHeight || 0
  }, [])

  useScrollPosition({
    elementRef: parentRef,
    isEnabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({ prevPos, currPos }) => {
      onScrollPositionChange?.(currPos.y)
      if (shouldHideOnScroll) {
        setIsHidden((prev) => {
          const next = currPos.y > prevPos.y && currPos.y > navHeight.current

          return next !== prev ? next : prev
        })
      }
    },
  })

  const getContainerProps: PropGetterV2<any> = (props = {}) => ({
    ...containerProps,
    ...motionProps,
    'data-hidden': dataAttr(isHidden),
    ref: containerRef,
    style: {
      '--navbar-height': height,
      ...containerProps.style,
      ...props?.style,
    },
  })

  return {
    containerRef,
    height,
    isHidden,
    shouldHideOnScroll,
    motionProps,
    getContainerProps,
  }
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>
