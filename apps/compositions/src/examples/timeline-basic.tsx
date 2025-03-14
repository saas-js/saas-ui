'use client'

import { Text } from '@chakra-ui/react'
import { Timeline } from '@saas-ui/react'
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu'

export const TimelineBasic = () => {
  return (
    <Timeline.Root maxW="400px">
      <Timeline.Item>
        <Timeline.Connector>
          <LuShip />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Product Shipped</Timeline.Title>
          <Timeline.Description>13th May 2021</Timeline.Description>
          <Text textStyle="sm">
            We shipped your product via <strong>FedEx</strong> and it should
            arrive within 3-5 business days.
          </Text>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <LuCheck />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title textStyle="sm">Order Confirmed</Timeline.Title>
          <Timeline.Description>18th May 2021</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <LuPackage />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title textStyle="sm">Order Delivered</Timeline.Title>
          <Timeline.Description>20th May 2021, 10:30am</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
