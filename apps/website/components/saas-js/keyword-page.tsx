import { InstallCommand } from '@/components/saas-js/install-command'
import { getPackage, type PackageId } from '@/lib/saas-js/packages'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { Button } from '#components/ui/button'
import Link from 'next/link'

export function KeywordPage({
  title,
  description,
  packageId,
  children,
}: {
  title: string
  description: string
  packageId: PackageId
  children: React.ReactNode
}) {
  const pkg = getPackage(packageId)

  if (!pkg) return null

  return (
    <Box py={{ base: '12', md: '20' }}>
      <Container maxW="3xl">
        <Stack gap="8">
          <Stack gap="4">
            <Text textStyle="sm" color="fg.muted">
              {pkg.name}
            </Text>
            <Heading as="h1" textStyle="4xl" textWrap="balance">
              {title}
            </Heading>
            <Text textStyle="lg" color="fg.subtle" fontWeight="medium" textWrap="pretty">
              {description}
            </Text>
          </Stack>

          <Box fontSize="md" css={{ '& p': { textWrap: 'pretty' } }}>
            {children}
          </Box>

          <Stack
            gap="4"
            pt="6"
            borderTopWidth="1px"
            borderStyle="dashed"
          >
            <Heading as="h2" textStyle="xl">
              {pkg.name}
            </Heading>
            <Text color="fg.subtle">{pkg.tagline}</Text>
            <InstallCommand command={pkg.install} />
            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <Button variant="glass" colorPalette="accent" asChild>
                <Link href={`/packages/${pkg.id}`}>Package</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/packages/${pkg.id}/docs`}>Docs</Link>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export function CodeSample({ children }: { children: string }) {
  return (
    <Box
      as="pre"
      fontFamily="mono"
      textStyle="sm"
      p="5"
      my="6"
      borderWidth="1px"
      borderStyle="dashed"
      overflow="auto"
      bg="bg"
    >
      <Box as="code" whiteSpace="pre">
        {children}
      </Box>
    </Box>
  )
}
