import { HStack } from '@saas-ui/panda-preset/jsx'
import { LuGitBranch } from 'react-icons/lu'
import { Icon, Tag } from 'src/components'

export default {
  title: 'Components/Tag',
  component: Tag,
}

export const Default = () => {
  return <Tag>Tag</Tag>
}

export const Sizes = () => {
  return (
    <HStack>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
      <Tag size="xl">XLarge</Tag>
    </HStack>
  )
}

export const Variants = () => {
  return (
    <HStack>
      <Tag variant="solid">Tag</Tag>
      <Tag variant="outline">Tag</Tag>
      <Tag variant="subtle">Tag</Tag>
    </HStack>
  )
}

export const Closable = () => {
  return (
    <HStack>
      <Tag size="sm" closable>
        Frontend
      </Tag>
      <Tag size="md" closable>
        Frontend
      </Tag>
      <Tag size="lg" closable>
        Frontend
      </Tag>
      <Tag size="xl" closable>
        Frontend
      </Tag>
    </HStack>
  )
}

export const WithIcon = () => {
  return (
    <HStack>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="sm"
      >
        2 PRs
      </Tag>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="md"
      >
        2 PRs
      </Tag>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="lg"
      >
        2 PRs
      </Tag>
      <Tag
        startElement={
          <Icon color="green.500">
            <LuGitBranch />
          </Icon>
        }
        size="xl"
      >
        2 PRs
      </Tag>
    </HStack>
  )
}
