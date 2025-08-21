import { Badge, HStack, Heading, Link, Span, Stack, Text } from '@saas-ui/react'
import { LuArrowUpRight } from 'react-icons/lu'
import { titleCase } from 'scule'

import { ResourceIcon } from './resource-icon'

interface PageHeaderProps {
  title: string
  description?: string
  links?: {
    source?: string
    storybook?: string
    recipe?: string
    ark?: string
  }
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description, links } = props
  return (
    <Stack gap="4" pb="4">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      {description && <Text color="fg.subtle">{description}</Text>}
      {links && (
        <HStack gap="6" mb="4" wrap="wrap">
          {Object.entries(links)
            .filter(([title, url]) => !!url)
            .map(([title, url]) => {
              if (title === 'pro') {
                return (
                  <Badge
                    key={title + url}
                    colorPalette="indigo"
                    variant="outline"
                    borderRadius="md"
                    border="2px solid {colors.indigo.solid}"
                    fontSize="sm"
                    fontWeight="medium"
                    boxShadow="none"
                    asChild
                  >
                    <Link href={url} target="_blank">
                      Pro license
                    </Link>
                  </Badge>
                )
              }

              return (
                <Link
                  fontWeight="medium"
                  variant="underline"
                  fontSize="sm"
                  target="_blank"
                  color="fg.subtle"
                  key={title + url}
                  href={url}
                  _icon={{ fontSize: '1em' }}
                >
                  <ResourceIcon type={title} />
                  {titleCase(title)}
                  <Span color="fg.muted">
                    <LuArrowUpRight />
                  </Span>
                </Link>
              )
            })}
        </HStack>
      )}
    </Stack>
  )
}
