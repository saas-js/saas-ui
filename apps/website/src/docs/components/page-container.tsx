import { useRouter } from 'next/router'
import * as React from 'react'
import { Container, Badge, Box, chakra, Flex } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import EditPageLink from '@/docs/components/edit-page-button'
import SEO from '@/components/seo'
import TableOfContent from '@/docs/components/table-of-content'
import { convertBackticksToInlineCode } from '@/docs/utils/convert-backticks-to-inline-code'
import PageTransition from './page-transition'
import { t } from '@/docs/utils/i18n'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])
}

export interface Heading {
  level: 'h2' | 'h3'
  text: string
  id: string
}

interface PageContainerProps {
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
    headings?: Heading[]
  }
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const { frontmatter, children, sidebar, pagination } = props
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl, version, headings = [] } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      {/* <AdBanner /> */}
      {/* <Header /> */}
      <Container as="main" className="main-content" maxW="container.2xl">
        <Box display={{ md: 'flex' }}>
          {sidebar || null}
          <Box flex="1" minW="0">
            <SkipNavContent />
            <Box id="content" px={5} mx="auto" minH="76vh">
              <Flex>
                <Box
                  minW="0"
                  flex="auto"
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt="10"
                >
                  <PageTransition style={{ maxWidth: '48rem' }}>
                    <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                      {convertBackticksToInlineCode(title)}
                    </chakra.h1>
                    <chakra.p apply="mdx.description">{description}</chakra.p>
                    {version && (
                      <Badge colorScheme="teal" letterSpacing="wider">
                        v{version}
                      </Badge>
                    )}
                    {children}
                    <Box mt="40px">
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {pagination || null}
                    </Box>
                  </PageTransition>
                </Box>
                <TableOfContent
                  visibility={headings.length === 0 ? 'hidden' : 'initial'}
                  headings={headings}
                />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default PageContainer
