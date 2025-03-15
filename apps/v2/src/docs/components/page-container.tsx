import { useRouter } from 'next/router'
import * as React from 'react'
import {
  Container,
  Badge,
  Box,
  chakra,
  Flex,
  Avatar,
  Spacer,
  SkipNavContent,
  SkipNavLink,
} from '@chakra-ui/react'
import EditPageLink from '@/docs/components/edit-page-button'
import SEO, { SEOProps } from '@/components/seo'
import TableOfContent from '@/docs/components/table-of-content'
import { convertBackticksToInlineCode } from '@/docs/utils/convert-backticks-to-inline-code'
import PageTransition from './page-transition'
import { t } from '@/docs/utils/i18n'
import { BackgroundGradient } from '@/components/background-gradient'

import { formatRelative } from 'date-fns'
import { DocsFeedback } from './docs-feedback'
import { SecondaryNav } from './secondary-nav/secondary-nav'

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

interface Stats {
  text: string
  minutes: number
  time: number
  words: number
}

interface PageContainerProps {
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
    headings?: Heading[]
    stats?: Stats
    author?: string
    avatar?: string
    date?: Date
    seo?: SEOProps
  }
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const router = useRouter()
  const { frontmatter, children, sidebar, pagination } = props
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const {
    title,
    description,
    editUrl,
    version,
    headings = [],
    stats,
    author,
    avatar,
    date,
    seo,
  } = frontmatter

  const basePath =
    process.env.NODE_ENV !== 'production' ? '' : 'https://saas-ui.dev'

  const screenshot = router.asPath.match('/docs') ? '&screenshot=true' : ''

  return (
    <>
      <SEO
        title={title}
        description={description}
        {...seo}
        openGraph={{
          images: [
            {
              url: `${basePath}/api/og?title=${title}&description=${description}${screenshot}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>

      <Container
        as="main"
        className="main-content"
        maxW="container.2xl"
        position="relative"
        zIndex="2"
        px="4"
      >
        <Box display={{ md: 'flex' }}>
          <React.Suspense>{sidebar || null}</React.Suspense>
          <Box flex="1" minW="0">
            <SkipNavContent />
            <Box id="content" mx="auto" minH="76vh" fontSize="0.95rem">
              <Flex>
                <Box
                  minW="0"
                  flex="auto"
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt="10"
                >
                  <Box
                    style={{
                      maxWidth: '58rem',
                      margin: '0 auto',
                    }}
                  >
                    <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                      {convertBackticksToInlineCode(title)}
                    </chakra.h1>
                    {description && (
                      <chakra.p apply="mdx.description">{description}</chakra.p>
                    )}
                    {version && (
                      <Badge colorScheme="purple" letterSpacing="wider">
                        v{version}
                      </Badge>
                    )}
                    {(author || stats || date) && (
                      <Box
                        display="flex"
                        alignItems="center"
                        fontSize="sm"
                        apply="mdx.description"
                        mt="4"
                      >
                        {author && (
                          <>
                            <Avatar
                              name={author}
                              src={avatar}
                              size="xs"
                              me="2"
                            />{' '}
                            {author} /{' '}
                          </>
                        )}
                        {date && formatRelative(new Date(date), new Date())}{' '}
                        {stats && <Spacer />}
                        {stats?.text}
                      </Box>
                    )}
                    {children}

                    <DocsFeedback />
                    <Box mt="40px">
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {pagination || null}
                    </Box>
                  </Box>
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
