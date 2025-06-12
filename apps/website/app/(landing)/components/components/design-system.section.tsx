import { ExampleCode, ExampleCodeWrapper } from '@/components/example'
import { Subheading } from '@/components/site/typography'
import {
  Box,
  Container,
  Heading,
  List,
  Span,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { LuBox, LuPaintBucket, LuType } from 'react-icons/lu'

const items = [
  {
    icon: <LuBox />,
    value: 'site/semantic-tokens',
    label: 'Semantic tokens',
    description:
      'Our token system gives you intelligent design decisions out of the box—colors, spacing, and sizing that work together harmoniously while remaining easy to customize for your brand.',
  },
  {
    icon: <LuPaintBucket />,
    value: 'site/recipes',
    label: 'Recipes',
    description:
      'Pre-built component variants and compositions that let developers quickly assemble complex UI patterns without wrestling with CSS or design decisions.',
  },
]

export const DesignSystemSection = () => {
  return (
    <Box as="section" py="20">
      <Container>
        <Stack
          gap={{ base: '10', md: '20' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack align="flex-start" gap="4" flex="1" maxW="576px">
            <Text textStyle="sm">Component System</Text>
            <Heading as="h2" textStyle="4xl">
              Component system designed for scale
            </Heading>
            <Subheading textStyle="lg">
              Move fast with a carefully crafted component system built to grow
              with your product. Easy to use and customize.
            </Subheading>
            <List.Root variant="plain" align="start" gap="6" mt="4">
              {items.map((item) => (
                <List.Item key={item.value} gap="2">
                  <List.Indicator asChild>{item.icon}</List.Indicator>
                  <p>
                    {item.label}.{' '}
                    <Span color="fg.muted">{item.description}</Span>
                  </p>
                </List.Item>
              ))}
            </List.Root>
          </Stack>

          <Box flex="1" flexShrink="0">
            <Tabs.Root
              variant="pills"
              rounded="panel.lg"
              borderWidth="1px"
              p="2"
              defaultValue={items[0].value}
              flex="1"
              bg="bg"
            >
              <Tabs.List
                p="2"
                border="0"
                _before={{
                  display: 'none',
                }}
              >
                {items.map((item) => (
                  <Tabs.Trigger key={item.value} value={item.value}>
                    {item.icon}
                    {item.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Tabs.ContentGroup>
                {items.map((item) => (
                  <Tabs.Content key={item.value} value={item.value} p="0">
                    <ExampleCodeWrapper px="4" bg="transparent!">
                      <ExampleCode
                        name={item.value}
                        ext="ts"
                        showCopy={false}
                      />
                    </ExampleCodeWrapper>
                  </Tabs.Content>
                ))}
              </Tabs.ContentGroup>
            </Tabs.Root>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
