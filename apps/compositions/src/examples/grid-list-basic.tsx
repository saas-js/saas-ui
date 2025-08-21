'use client'

import { Checkbox, GridList, Tag, Text } from '@saas-ui/react'

export function GridListBasic() {
  return (
    <GridList.Root interactive>
      <GridList.Item>
        <GridList.Cell width="8">
          <Checkbox />
        </GridList.Cell>
        <GridList.Cell flex="1">
          <Text fontWeight="medium">Sarah Johnson</Text>
          <Text textStyle="sm" color="fg.muted">
            sarah@company.com
          </Text>
        </GridList.Cell>
        <GridList.Cell>
          <Tag>Admin</Tag>
        </GridList.Cell>
      </GridList.Item>
      <GridList.Item>
        <GridList.Cell width="8">
          <Checkbox />
        </GridList.Cell>
        <GridList.Cell flex="1">
          <Text fontWeight="medium">Michael Chen</Text>
          <Text textStyle="sm" color="fg.muted">
            michael@company.com
          </Text>
        </GridList.Cell>
        <GridList.Cell>
          <Tag>Member</Tag>
        </GridList.Cell>
      </GridList.Item>
      <GridList.Item>
        <GridList.Cell width="8">
          <Checkbox />
        </GridList.Cell>
        <GridList.Cell flex="1">
          <Text fontWeight="medium">Emma Rodriguez</Text>
          <Text textStyle="sm" color="fg.muted">
            emma@company.com
          </Text>
        </GridList.Cell>
        <GridList.Cell>
          <Tag>Member</Tag>
        </GridList.Cell>
      </GridList.Item>
    </GridList.Root>
  )
}
