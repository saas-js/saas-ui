import { Children, isValidElement } from 'react'

import { Timeline } from '@saas-ui/react'

export const Steps = (props: React.PropsWithChildren<{}>) => {
  return (
    <Timeline.Root mt="10" mb="6">
      {Children.map(props.children, (child, index) => {
        return (
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Indicator rounded="md">{index + 1}</Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content
              maxW="calc(100% - 40px)"
              flex="1"
              pb="10"
              css={{
                '& > :is(h3, h4, h5)': { marginTop: '0' },
              }}
            >
              {isValidElement(child) ? child.props.children : child}
            </Timeline.Content>
          </Timeline.Item>
        )
      })}
    </Timeline.Root>
  )
}
