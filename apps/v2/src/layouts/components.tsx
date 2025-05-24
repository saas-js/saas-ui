import { Box, HStack, Stack } from '@chakra-ui/react'
import { MDXComponents } from '@/docs/components/mdx-components'
import { Doc } from 'contentlayer/generated'
import { useMDXComponent } from '@/hooks/next-contentlayer'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { TabsData } from '@/docs/utils/contentlayer-utils'
import MDXLayout from './mdx'
// import { themes } from '@/docs/utils/available-themes'

function MDXContent({ doc }: { doc: Doc | undefined }) {
  const Component = useMDXComponent(doc?.body?.code ?? '')
  return <Component components={MDXComponents as any} />
}

export default function ComponentDocsLayout({
  children,
  frontmatter,
  tabsData,
}: {
  children: ReactNode
  frontmatter: any
  tabsData?: TabsData
}) {
  const scope = frontmatter.scope

  const item = tabsData.find((data) => data.id === scope) || tabsData[0]

  return (
    <MDXLayout frontmatter={frontmatter}>
      <Box as="nav" aria-label="Component navigation" mt="8">
        <HStack as="ul" listStyleType="none" borderBottomWidth="1px">
          {tabsData.map((item) => (
            <Box as="li" key={item.id}>
              <NextLink href={item.href} passHref replace legacyBehavior>
                <Box
                  mb="-1px"
                  as="a"
                  display="block"
                  fontSize="sm"
                  px="5"
                  py="3"
                  fontWeight="medium"
                  borderBottom="2px solid transparent"
                  data-selected={item.match ? '' : undefined}
                  _selected={{
                    color: 'primary.400',
                    borderColor: 'currentColor',
                  }}
                >
                  {item.label}
                </Box>
              </NextLink>
            </Box>
          ))}
        </HStack>
      </Box>

      <Box>{item && <MDXContent doc={item.doc} />}</Box>
    </MDXLayout>
  )
}
