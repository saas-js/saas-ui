import { Card, Checkbox, HStack, Tag, Text } from '@chakra-ui/react'
import {
  StructuredList,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'

export function ThemesIssues() {
  const issues = [
    {
      id: 'SUI-123',
      title: 'Research product trends',
      date: '10 Jan',
      labels: ['research', 'trends'],
      status: 'in-progress',
    },
    {
      id: 'SUI-133',
      title: 'Develop user interface',
      date: '3 Feb',
      labels: ['UI', 'dev'],
      status: 'in-progress',
    },
    {
      id: 'SUI-134',
      title: 'Create user experience flows',
      date: '5 Feb',
      labels: ['UX', 'flows'],
      status: 'in-progress',
    },
    {
      id: 'SUI-135',
      title: 'Select materials for production',
      date: '7 Feb',
      labels: ['production'],
      status: 'in-progress',
    },
    {
      id: 'SUI-136',
      title: 'Work with engineers on product specifications',
      date: '9 Feb',
      labels: ['specs'],
      status: 'in-progress',
    },
    {
      id: 'SUI-137',
      title: 'Conduct user research',
      date: '11 Feb',
      labels: ['user research'],
      status: 'in-progress',
    },
    {
      id: 'SUI-124',
      title: 'Brainstorm product ideas',
      date: '12 Jan',
      labels: [],
      status: 'todo',
    },
    {
      id: 'SUI-125',
      title: 'Create initial sketches',
      date: '15 Jan',
      labels: ['design'],
      status: 'todo',
    },
    {
      id: 'SUI-126',
      title: 'Get feedback on sketches',
      date: '17 Jan',
      labels: ['feedback'],
      status: 'todo',
    },
    {
      id: 'SUI-127',
      title: 'Refine and finalize design',
      date: '20 Jan',
      labels: ['refinement'],
      status: 'todo',
    },
    {
      id: 'SUI-128',
      title: 'Create 3D model',
      date: '23 Jan',
      labels: ['3D', 'model'],
      status: 'todo',
    },
    {
      id: 'SUI-129',
      title: 'Test and iterate prototype',
      date: '25 Jan',
      labels: ['testing'],
      status: 'todo',
    },
    {
      id: 'SUI-130',
      title: 'Refine prototype based on feedback',
      date: '27 Jan',
      labels: ['feedback'],
      status: 'todo',
    },
  ]

  const inProgress = issues.filter(({ status }) => status === 'in-progress')
  const todo = issues.filter(({ status }) => status === 'todo')

  const renderIssue = (issue) => {
    return (
      <StructuredListItem
        href="#"
        as={HStack}
        spacing="4"
        borderBottom="1px"
        borderColor="gray.100"
        fontSize="sm"
        _dark={{
          borderColor: 'whiteAlpha.100',
        }}
      >
        <StructuredListCell width="4" role="group">
          <Checkbox
            opacity="0"
            _checked={{ opacity: 1 }}
            _groupHover={{ opacity: 1 }}
            size="md"
            rounded="sm"
          />
        </StructuredListCell>
        <StructuredListCell color="muted">{issue.id}</StructuredListCell>
        <StructuredListCell flex="1">
          <Text noOfLines={1}>{issue.title}</Text>
        </StructuredListCell>
        <StructuredListCell color="muted" as={HStack} gap="2">
          {issue.labels.map((label) => (
            <Tag
              key={label}
              bg="none"
              border="1px solid"
              borderColor="blackAlpha.100"
              color="muted"
              rounded="full"
              _dark={{
                borderColor: 'whiteAlpha.100',
              }}
            >
              {label}
            </Tag>
          ))}
        </StructuredListCell>
        <StructuredListCell color="muted">{issue.date}</StructuredListCell>
      </StructuredListItem>
    )
  }

  return (
    <Card width="600px" overflowY="auto" maxH="240px">
      <StructuredList py="0">
        <StructuredListHeader
          fontWeight="normal"
          bg="gray.200"
          _dark={{ bg: 'gray.700' }}
          color="app-text"
          position="sticky"
          top="0"
          zIndex="popover"
        >
          In Progress{' '}
          <Text as="span" color="muted">
            {inProgress.length}
          </Text>
        </StructuredListHeader>
        {inProgress.map(renderIssue)}
        <StructuredListHeader
          fontWeight="normal"
          bg="gray.200"
          _dark={{ bg: 'gray.700' }}
          color="app-text"
          position="sticky"
          top="0"
          zIndex="popover"
        >
          Todo{' '}
          <Text as="span" color="muted">
            {todo.length}
          </Text>
        </StructuredListHeader>
        {todo.map(renderIssue)}
      </StructuredList>
    </Card>
  )
}
