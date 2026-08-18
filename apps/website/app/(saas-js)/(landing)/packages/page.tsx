import { PackageCard } from '@/components/saas-js/package-card'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import {
  packageGroups,
  packagePath,
  packages,
} from '@/lib/saas-js/packages'
import { Box, Container, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { Section } from '#components/ui/section'
import Link from 'next/link'

export const metadata = createSjsMetadata({
  title: 'Packages',
  description:
    'Open-source building blocks for SaaS products. Use them on their own, or assembled in the TanStack Start starter kit.',
  path: '/packages',
})

export default function PackagesPage() {
  return (
    <Section.Root py="20">
      <Container maxW="8xl">
        <Stack gap="4" maxW="3xl" mb="16">
          <Heading as="h1" textStyle="5xl" textWrap="balance">
            Packages
          </Heading>
          <Text textStyle="lg" color="fg.subtle" fontWeight="medium" textWrap="pretty">
            The building blocks. Starter kits assemble these into a production-ready
            app. Use a package on its own, or start from the kit.
          </Text>
        </Stack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap="0"
          borderWidth="1px"
          borderStyle="dashed"
        >
          {packageGroups.map((group, index) => {
            const pkg = packages.find((item) => item.group === group.id)
            if (!pkg) return null

            return (
              <Box
                key={pkg.id}
                borderRightWidth={{ md: index % 2 === 0 ? '1px' : '0' }}
                borderBottomWidth="1px"
                borderStyle="dashed"
                css={{
                  '&:nth-last-of-type(-n+2)': {
                    md: { borderBottomWidth: 0 },
                  },
                  '&:last-of-type': {
                    borderBottomWidth: 0,
                  },
                }}
              >
                <PackageCard pkg={pkg} href={packagePath(pkg.id)} />
              </Box>
            )
          })}
        </Grid>

        <Text textStyle="sm" color="fg.muted" mt="10" textWrap="pretty" maxW="3xl">
          Saas.js is the open-source toolkit from{' '}
          <Box asChild color="fg" fontWeight="medium">
            <Link href="https://saas-ui.dev">Saas UI</Link>
          </Box>
          . The same packages ship in the{' '}
          <Box asChild color="fg" fontWeight="medium">
            <Link href="/">TanStack Start starter kit</Link>
          </Box>
          .
        </Text>
      </Container>
    </Section.Root>
  )
}
