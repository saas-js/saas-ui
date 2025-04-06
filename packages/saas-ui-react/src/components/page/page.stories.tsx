import React from 'react'

import { Box, type BoxProps, Button, Text } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'

import { AppShell } from '../app-shell/index.ts'
import { BackButton } from '../back-button/index.ts'
import { ButtonGroup } from '../button-group/index.ts'
import { Page } from './index.ts'

export default {
  title: 'Components/Page',
  component: Page.Root,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <AppShell>
        <Story />
      </AppShell>
    ),
  ],
} as Meta

const PageContent = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
        sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
        Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
        lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
        nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
        eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
        nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
      </Text>
    </Box>
  )
}

export const Basic = {
  render: () => (
    <Page.Root>
      <Page.Header title="Basic page" />
      <Page.Body>
        <PageContent />
      </Page.Body>
    </Page.Root>
  ),
}

export const WithActions = {
  render: () => (
    <Page.Root>
      <Page.Header
        title="Page with toolbar"
        actions={
          <ButtonGroup>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
          </ButtonGroup>
        }
      />
      <Page.Body>
        <PageContent />
      </Page.Body>
    </Page.Root>
  ),
}

export const WithDescription = {
  render: () => (
    <Page.Root>
      <Page.Header
        title="Page with description"
        description="My page description"
      />
      <Page.Body>
        <PageContent />
      </Page.Body>
    </Page.Root>
  ),
}

export const WithBackButton = {
  render: () => (
    <Page.Root>
      <Page.Header title="Page with back button" nav={<BackButton />} />
      <Page.Body>
        <PageContent />
      </Page.Body>
    </Page.Root>
  ),
}

export const WithLoading = {
  render: () => (
    <Page.Root loading>
      <Page.Header title="Page with loading" />
      <Page.Body>
        <PageContent />
      </Page.Body>
    </Page.Root>
  ),
}

export const VariantSettings = {
  render: () => (
    <Page.Root variant="settings">
      <Page.Header title="Settings page" description="Manage your settings" />
      <Page.Body>
        <PageContent px="0" />
      </Page.Body>
    </Page.Root>
  ),
}

export const SettingsWithActions = {
  render: () => (
    <Page.Root variant="settings">
      <Page.Header
        title="Settings page"
        description="Manage your settings"
        actions={
          <ButtonGroup>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
        }
      />
      <Page.Body>
        <PageContent px="0" />
      </Page.Body>
    </Page.Root>
  ),
}
