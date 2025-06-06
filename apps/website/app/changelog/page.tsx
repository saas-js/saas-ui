import { ChangelogCard } from '@/components/changelog-card'
import { formatBlogDate } from '@/lib/blog'
import { Box, Container, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { allChangelogs } from 'content-collections'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Latest updates and changes to Saas UI',
  openGraph: {
    images: `/og?title=Changelog`,
  },
}

export default function ChangelogsPage() {
  return (
    <Box py="20">
      <Container maxW="6xl">
        <Stack gap={{ base: '5', md: '10' }} pt="10">
          <Stack gap="5" pr="4" maxW="3xl">
            <Heading as="h2" size="2xl">
              Changelog
            </Heading>
          </Stack>

          {allChangelogs.map((changelog, index) => (
            <HStack key={index} w="full" alignItems="flex-start">
              <Box
                width="200px"
                display={{
                  base: 'none',
                  md: 'block',
                }}
              >
                <Text textStyle="md" color="fg.subtle" fontWeight="medium">
                  {formatBlogDate(changelog.publishedAt)}
                </Text>
              </Box>
              <Box flex="1" maxW="xl">
                <ChangelogCard data={changelog} aspectRatio={21 / 9} />
              </Box>
            </HStack>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
