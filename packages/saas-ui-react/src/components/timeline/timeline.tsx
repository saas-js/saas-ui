'use client'

import * as React from 'react'
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem as ChakraTimelineItem,
  type TimelineItemProps,
  TimelineRoot as ChakraTimelineRoot,
  type TimelineRootProps,
  TimelineSeparator,
  TimelineTitle,
} from '@chakra-ui/react/timeline'

export const Root = React.forwardRef<HTMLOListElement, TimelineRootProps>(
  (props, ref) => {
    return <ChakraTimelineRoot as="ol" ref={ref as React.Ref<HTMLDivElement>} {...props} />
  }
)
Root.displayName = 'Timeline.Root'

export const Item = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (props, ref) => {
    return <ChakraTimelineItem as="li" ref={ref as React.Ref<HTMLDivElement>} {...props} />
  }
)
Item.displayName = 'Timeline.Item'

export {
  TimelineConnector as Connector,
  TimelineContent as Content,
  TimelineDescription as Description,
  TimelineIndicator as Indicator,
  TimelineSeparator as Separator,
  TimelineTitle as Title,
  useTimelineStyles,
} from '@chakra-ui/react/timeline'

export type {
  TimelineConnectorProps as ConnectorProps,
  TimelineContentProps as ContentProps,
  TimelineDescriptionProps as DescriptionProps,
  TimelineIndicatorProps as IndicatorProps,
  TimelineItemProps as ItemProps,
  TimelineRootProps as RootProps,
  TimelineSeparatorProps as SeparatorProps,
  TimelineTitleProps as TitleProps,
} from '@chakra-ui/react/timeline'
