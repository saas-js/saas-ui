import {
  ChakraProps,
  HTMLChakraProps,
  IconButtonProps,
  SystemProps,
  ThemingProps,
} from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { HTMLMotionProps } from 'framer-motion'

export interface SidebarOptions {
  /**
   * Spacing between child elements.
   */
  spacing?: SystemProps['margin']
  /**
   * Define the for the mobile nav. Use `false` to disable the mobile nav.
   *
   * @default "lg"
   */
  toggleBreakpoint?: false | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * Control the visibility of the sidebar.
   */
  isOpen?: boolean
  /**
   * Callback invoked when the sidebar is opened.
   */
  onOpen?: () => void
  /**
   * Callback invoked when the sidebar is closed.
   */
  onClose?: () => void
  /**
   * The transition used when opening and closing the sidebar.
   */
  motionPreset?: 'slideInOut' | 'none'
}

export interface SidebarProps
  extends SidebarOptions,
    Pick<
      HTMLMotionProps<'div'>,
      'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    >,
    Omit<
      HTMLChakraProps<'div'>,
      'css' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    >,
    ThemingProps<'SuiSidebar'> {}

export interface SidebarToggleButtonProps
  extends Omit<IconButtonProps, 'aria-label' | 'icon'> {
  icon?: MaybeRenderProp<{ isOpen: boolean }>
}

export interface SidebarSectionProps extends HTMLChakraProps<'div'> {
  direction?: SystemProps['flexDirection']
}

export interface SidebarOverlayProps extends ChakraProps {}
