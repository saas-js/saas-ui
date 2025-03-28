import * as React from 'react'

import { Card, Text } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { Section } from './index.ts'

export default {
  title: 'Components/Layout/Section',
  component: Section.Root,
} as Meta

const Content = () => {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
      sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
      Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
      lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
      nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
      eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
      nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
    </Text>
  )
}

type Story = StoryObj<Section.RootProps>

export const Basic: Story = {
  args: {
    children: (
      <>
        <Section.Header title="Basic section" />
        <Section.Body>
          <Content />
        </Section.Body>
      </>
    ),
  },
}

export const Description: Story = {
  args: {
    children: (
      <>
        <Section.Header
          title="Basic section"
          description="Section description"
        />
        <Section.Body>
          <Content />
        </Section.Body>
      </>
    ),
  },
}

export const VariantAnnotated: Story = {
  args: {
    variant: 'annotated',
    children: (
      <>
        <Section.Header
          title="Annotated variant"
          description="Annotated variant"
        />
        <Section.Body>
          <Card.Root>
            <Card.Body>
              <Content />
            </Card.Body>
          </Card.Root>
        </Section.Body>
      </>
    ),
  },
}
