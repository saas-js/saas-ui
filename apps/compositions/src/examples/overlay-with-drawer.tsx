'use client'

import { createOverlay } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import { Drawer } from 'compositions/ui/drawer'

type DrawerProps = {
  title: string
  description?: string
  content?: React.ReactNode
  placement?: Drawer.RootProps['placement']
}

const drawer = createOverlay<DrawerProps>((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Drawer.Root {...rest}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>{title}</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body spaceY="4">
          {description && (
            <Drawer.Description>{description}</Drawer.Description>
          )}
          {content}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
})

export const OverlayWithDrawer = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          drawer.open('a', {
            title: 'Drawer Title',
            description: 'Drawer Description',
            placement: 'end',
          })
        }}
      >
        Open Drawer
      </Button>
      <drawer.Viewport />
    </>
  )
}
