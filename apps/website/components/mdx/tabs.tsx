import { Box, Tabs as TabsPrimitive } from '@saas-ui/react'

export const Tabs = (
  props: TabsPrimitive.RootProps & {
    items: string[]
    children: React.ReactNode[]
  },
) => {
  return (
    <TabsPrimitive.Root
      colorPalette="accent"
      defaultValue={props.items[0]}
      {...props}
    >
      <TabsPrimitive.List>
        {props.items.map((item) => (
          <TabsPrimitive.Trigger key={item} value={item}>
            {item}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      <TabsPrimitive.ContentGroup>
        {props.items.map((item, i) => (
          <TabsPrimitive.Content key={item} value={item} p="0">
            {props.children[i]}
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.ContentGroup>
    </TabsPrimitive.Root>
  )
}

export const Tab = (props: { children: React.ReactNode }) => {
  return <Box>{props.children}</Box>
}
