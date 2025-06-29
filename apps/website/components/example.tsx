import { readExampleFile } from '@/lib/composition'
import { highlightCode } from '@/lib/highlight-code'
import { Box, BoxProps, HStack, Stack, Tabs, Text } from '@chakra-ui/react'
import { FieldsProvider, defaultFieldTypes } from '@saas-ui/forms'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import Link from 'next/link'

import { CopyButton } from './copy-button'
import { ExampleCanvas } from './example-canvas'
import { ExamplePreview } from './example-preview'

interface Props {
  name: string
  padding?: BoxProps['padding']
  maxHeight?: BoxProps['maxHeight']
  overflow?: BoxProps['overflow']
}

interface CodeProps extends Props {
  showCopy?: boolean
  ext?: string
}

export const ExampleCode = async (props: CodeProps) => {
  const { name, showCopy = true, ext = 'tsx' } = props
  const content = await readExampleFile(name, ext)
  const html = await highlightCode(content)
  return (
    <>
      <div
        className="code-highlight"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showCopy && (
        <Box pos="absolute" top="4" right="6">
          <CopyButton value={content} />
        </Box>
      )}
    </>
  )
}

interface CodeWrapperProps {
  maxHeight?: BoxProps['maxHeight']
  bg?: BoxProps['bg']
  px?: BoxProps['px']
  py?: BoxProps['py']
  children: React.ReactNode
}

export const ExampleCodeWrapper = (props: CodeWrapperProps) => {
  const { children, maxHeight, bg, px = 8, py = 6 } = props
  return (
    <Box
      height="100%"
      overflow="auto"
      css={{
        position: 'relative',
        '& pre': {
          px,
          py,
          maxHeight,
          overflow: 'auto',
          my: '0',
          bg,
        },
      }}
    >
      {children}
    </Box>
  )
}

interface ExampleItem {
  name: string
  items: { name: string; path: string }[]
}

interface LinkTreeProps {
  path: string
  tree: ExampleItem[]
}

export const ExampleLinkTree = (props: LinkTreeProps) => {
  const { path, tree } = props
  return (
    <Stack gap="4" fontSize="xs">
      {tree.map((category) => (
        <Stack key={category.name} gap="2">
          <Text fontWeight="medium">{category.name}</Text>
          <Stack gap="1">
            {category.items.map((item) => (
              <HStack
                key={item.path}
                asChild
                py="0.5"
                px="2"
                _currentPage={{
                  layerStyle: 'fill.subtle',
                  colorPalette: 'gray',
                }}
              >
                <Link
                  href={`?name=${item.path}`}
                  aria-current={item.path === path ? 'page' : undefined}
                >
                  <Text>{item.name}</Text>
                </Link>
              </HStack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export const Example = (props: Props) => {
  const { name, padding = { base: '6', sm: '10' } } = props
  if (!name) return null
  return (
    <Box
      className="example-tabs"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      divideY="1px"
    >
      <Box padding={padding}>
        <ExamplePreview name={name} />
      </Box>
      <ExampleCodeWrapper maxHeight="400px">
        <ExampleCode name={name} />
      </ExampleCodeWrapper>
    </Box>
  )
}

export const ExampleTabs = (props: Props) => {
  const { name, padding = { base: '6', sm: '10' }, maxHeight, overflow } = props
  if (!name) return null

  return (
    <Tabs.Root
      className="example-tabs"
      variant="outline"
      defaultValue={'preview'}
      mb="4em"
      unmountOnExit
    >
      <Tabs.List
        borderBottomWidth="0"
        _before={{
          display: 'none',
        }}
        mb="-2px"
      >
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger
          value="code"
          _selected={{
            bg: 'bg.muted',
          }}
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup
        borderWidth="1px"
        rounded="md"
        borderTopStartRadius="0"
        overflow="hidden"
      >
        <Tabs.Content
          value="preview"
          mt="0!"
          padding={padding}
          maxHeight={maxHeight}
          overflow={overflow}
        >
          <FieldsProvider
            value={{
              fields: defaultFieldTypes,
            }}
          >
            <ExamplePreview name={props.name} />
          </FieldsProvider>
        </Tabs.Content>
        <Tabs.Content value="code" mt="0!" pt="0!">
          <ExampleCodeWrapper maxHeight="480px">
            <ExampleCode name={name} />
          </ExampleCodeWrapper>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
