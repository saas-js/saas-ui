'use client'

import { Flex, Stack, StackProps, Text } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react/styled-system'

import { Link } from '#components/ui/link'

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" gap="5" mb={{ base: '5', sm: '8' }}>
      {children}
    </Flex>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
  id: string
}

const SectionTitle = ({ children, id }: SectionTitleProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap="4"
      mt="2"
      bg="bg.subtle"
      px="4"
      py="3"
      rounded="md"
      colorPalette="accent"
      textStyle="sm"
      fontSize="clamp(0.875rem, 2vw, 1.25rem)"
    >
      <Text fontWeight="medium" id={id}>
        <Link href={`#${id}`}>{children}</Link>
      </Text>
      <Link href={`/docs/components/${id}`} fontSize="sm">
        View in docs
      </Link>
    </Flex>
  )
}

const Table = chakra('table', {
  base: {
    marginBottom: '32px',
    borderCollapse: 'collapse',
    '& td:not(.chakra-table__cell)': {
      paddingRight: '8',
      paddingBottom: '8',
    },
    '& th:not(.chakra-table__column-header)': {
      fontSize: 'sm',
      color: 'fg.subtle',
    },
    '& thead td:not(.chakra-table__cell)': {
      fontSize: 'sm',
      color: 'fg.subtle',
    },
  },
})

const SectionContent = (props: StackProps) => {
  return <Stack gap="8" {...props} />
}

interface DemoListProps {
  items: Array<{
    label: string
    component: React.ReactElement
    align?: StackProps['align']
  }>
}

const DemoList = (props: DemoListProps) => {
  const { items } = props
  return (
    <>
      {items.map(({ label, component, align }) => (
        <Stack key={label} align={align || 'flex-start'} gap="5">
          <Text color="fg.subtle" textStyle="sm" fontWeight="medium">
            {label}
          </Text>
          {component}
        </Stack>
      ))}
    </>
  )
}

export { Section, SectionTitle, Table, SectionContent, DemoList }
