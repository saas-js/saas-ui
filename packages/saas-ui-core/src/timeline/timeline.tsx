import React from 'react'
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  createStylesContext,
  useMultiStyleConfig,
  ThemingProps,
} from '@chakra-ui/react'
import { cx, dataAttr } from '@chakra-ui/utils'

const [StylesProvider, useStyles] = createStylesContext('SuiTimeline')

export const useTimelineStyles = useStyles

export interface TimelineProps
  extends HTMLChakraProps<'ul'>,
    ThemingProps<'SuiTimeline'> {}

/**
 * Display a list of events in chronological order.
 *
 * @see Docs https://saas-ui.dev/docs/components/data-display/timeline
 */
export const Timeline: React.FC<TimelineProps> = (props) => {
  const { children, ...rest } = props

  const styles = useMultiStyleConfig('SuiTimeline', props)

  const timelineStyles = {
    position: 'relative',
    listStyle: 'none',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.ul
        {...rest}
        __css={timelineStyles}
        className={cx('sui-timeline', props.className)}
      >
        {children}
      </chakra.ul>
    </StylesProvider>
  )
}

Timeline.displayName = 'Timeline'

export interface TimelineItemProps extends HTMLChakraProps<'li'> {}

export const TimelineItem = forwardRef<TimelineItemProps, 'li'>(
  (props, ref) => {
    const { children, ...rest } = props

    const styles = useStyles()

    const itemStyles = {
      display: 'flex',
      ...styles.item,
    }

    return (
      <chakra.li
        {...rest}
        ref={ref}
        __css={itemStyles}
        className={cx('sui-timeline__item', props.className)}
      >
        {children}
      </chakra.li>
    )
  }
)

TimelineItem.displayName = 'TimelineItem'

export interface TimelineContentProps extends HTMLChakraProps<'div'> {}

export const TimelineContent: React.FC<TimelineContentProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const contentStyles = {
    flex: 1,
    ...styles.content,
  }

  return (
    <chakra.div
      {...rest}
      __css={contentStyles}
      className={cx('sui-timeline__content', props.className)}
    >
      {children}
    </chakra.div>
  )
}

TimelineContent.displayName = 'TimelineContent'

export interface TimelineSeparatorProps extends HTMLChakraProps<'div'> {}

export const TimelineSeparator: React.FC<TimelineSeparatorProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const separatorStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    ...styles.separator,
  }

  return (
    <chakra.div
      {...rest}
      __css={separatorStyles}
      className={cx('sui-timeline__separator', props.className)}
    >
      {children}
    </chakra.div>
  )
}

TimelineSeparator.displayName = 'TimelineSeparator'

export interface TimelineDotProps extends HTMLChakraProps<'div'> {}

export const TimelineDot: React.FC<TimelineDotProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const dotStyles = {
    ...styles.dot,
  }

  return (
    <chakra.div
      {...rest}
      __css={dotStyles}
      className={cx('sui-timeline__dot', props.className)}
    >
      {children}
    </chakra.div>
  )
}

TimelineDot.displayName = 'TimelineDot'

export interface TimelineIconProps extends HTMLChakraProps<'div'> {}

export const TimelineIcon: React.FC<TimelineIconProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
    ...styles.icon,
  }

  return (
    <chakra.div
      {...rest}
      __css={iconStyles}
      className={cx('sui-timeline__icon', props.className)}
      data-dot={dataAttr(!children)}
    >
      {children || <TimelineDot />}
    </chakra.div>
  )
}

TimelineIcon.displayName = 'TimelineIcon'

export interface TimelineTrackProps extends HTMLChakraProps<'div'> {}

export const TimelineTrack: React.FC<TimelineTrackProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const trackStyles = {
    flex: 1,
    width: '1px',
    minH: '10px',
    ...styles.track,
  }

  return (
    <chakra.div
      {...rest}
      __css={trackStyles}
      className={cx('sui-timeline__track', props.className)}
    >
      {children}
    </chakra.div>
  )
}

TimelineTrack.displayName = 'TimelineTrack'
