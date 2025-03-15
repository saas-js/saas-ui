import { Span } from '@chakra-ui/react'
import { Button, LinkProps, Menu } from '@saas-ui/react'
import Link from 'next/link'
import { LuChevronDown } from 'react-icons/lu'

interface VersionItem {
  title: string
  value: string
  url: NonNullable<LinkProps['href']>
}

interface Props {
  items: VersionItem[]
  containerRef?: React.RefObject<HTMLElement>
}

export const VersionMenu = (props: Props) => {
  const { items, containerRef } = props
  const [currentItem, ...restItems] = items
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" variant="outline" gap="1" pe="2">
          {currentItem.value}
          <LuChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content portalled>
        {restItems.map((item, index) => (
          <Menu.Item value={item.value} key={index} asChild>
            <Link href={item.url}>
              <Span fontWeight="medium" flex="1">
                {item.title}
              </Span>
              <Span color="fg.subtle">{item.value}</Span>
            </Link>
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Root>
  )
}
