import { Button, Menu, Tooltip } from '@saas-ui/react'

export const TooltipWithMenuItem = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <TooltipMenuItem value="new-txt" tooltip="This is the tooltip content">
          Open tooltip
        </TooltipMenuItem>
        <Menu.Item value="new-file">New File...</Menu.Item>
        <Menu.Item value="new-win">New Window</Menu.Item>
        <Menu.Item value="export">Export</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}

const TooltipMenuItem = (props: Menu.ItemProps & { tooltip: string }) => {
  const { value, tooltip, ...rest } = props
  return (
    <Tooltip
      ids={{ trigger: value }}
      openDelay={200}
      closeDelay={0}
      positioning={{ placement: 'right' }}
      content={tooltip}
    >
      <Menu.Item value={value} {...rest} />
    </Tooltip>
  )
}
