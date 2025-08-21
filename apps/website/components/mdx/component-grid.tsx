import { Box, Center, SimpleGrid, Stack } from '@saas-ui/react'
import { allDocs } from 'content-collections'
import { createGetUrl } from 'fumadocs-core/source'
import Link from 'next/link'
import { LuCode } from 'react-icons/lu'
import { kebabCase } from 'scule'

import { getComponent } from '../illustrations'

const components = allDocs.filter(
  (doc) =>
    doc.slug.includes('components/') &&
    !doc.slug.includes('pro/') &&
    !doc.slug.includes('concepts/') &&
    !doc.slug.includes('overview'),
)

const getUrl = createGetUrl('/docs')

export const ComponentGrid = () => {
  return (
    <SimpleGrid minChildWidth="240px" gap="6" mt="8">
      {components.map((item) => {
        const parts = item.slug.split('/').filter((part) => !part.includes('('))

        const path = parts.join('/')
        const component = parts[parts.length - 1]

        const key = kebabCase(component)
        const Illustration = getComponent(key) ?? LuCode

        return (
          <Stack
            asChild
            gap="0"
            key={item.slug}
            borderWidth="1px"
            rounded="md"
            focusRing="inside"
            overflow="hidden"
          >
            <Link href={getUrl(path.split('/'))}>
              <Center
                height="120px"
                bg="bg.subtle"
                _icon={{ color: 'fg.subtle' }}
              >
                <Illustration width="100%" height="100%" />
              </Center>
              <Stack gap="1" padding="4" flex="1" textStyle="sm">
                <Box fontWeight="medium">{item.title}</Box>
                <Box color="fg.subtle" lineClamp="2" lineHeight="short">
                  {item.description}
                </Box>
              </Stack>
            </Link>
          </Stack>
        )
      })}
    </SimpleGrid>
  )
}
