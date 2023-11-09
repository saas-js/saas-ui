import {
  chakra,
  useStyleConfig,
  IconProps,
  ThemingProps,
  forwardRef,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { cloneElement, isValidElement } from 'react'

export interface IconBadgeProps
  extends IconProps,
    ThemingProps<'SuiIconBadge'> {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement
  /**
   * If `true`, the badge will be perfectly round. Else, it'll be slightly round
   *
   * @default false
   */
  isRound?: boolean
  /**
   * A11y: A label that describes the icon
   */
  'aria-label'?: string
}

export const IconBadge = forwardRef<IconBadgeProps, 'div'>((props) => {
  const { icon, children, isRound, 'aria-label': ariaLabel, ...rest } = props
  const styles = useStyleConfig('SuiIconBadge', props)

  /**
   * Passing the icon as prop or children should work
   */
  const element = icon || children
  const _children = isValidElement(element)
    ? cloneElement(element as any, {
        'aria-hidden': true,
        focusable: false,
      })
    : null

  const __css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...styles,
  }

  return (
    <chakra.div
      __css={__css}
      borderRadius={isRound ? 'full' : undefined}
      aria-label={ariaLabel}
      {...rest}
      className={cx('sui-icon-badge', props.className)}
    >
      {_children}
    </chakra.div>
  )
})
