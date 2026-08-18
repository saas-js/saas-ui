import { PackageCard } from '@/components/saas-js/package-card'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { packagePath, packages } from '@/lib/saas-js/packages'
import { Box, Container, Grid, Heading, Stack, Text } from '@chakra-ui/react'

export const metadata = createSjsMetadata({
  title: 'Packages',
  description:
    'Open-source building blocks and tools for modern web applications.',
  path: '/packages',
})

const packagesByName = [...packages].sort((a, b) =>
  a.name.localeCompare(b.name),
)
const lastRowStart =
  packagesByName.length - (packagesByName.length % 3 || 3)

export default function PackagesPage() {
  return (
    <Box mb="-8" overflowX="hidden">
      <Container py={{ base: '16', md: '20' }}>
        <Stack gap="4" maxW="3xl">
          <Heading as="h1" textStyle="5xl" textWrap="balance">
            Packages
          </Heading>
          <Text
            textStyle="lg"
            color="fg.subtle"
            fontWeight="medium"
            textWrap="pretty"
          >
            Open-source building blocks and tools for modern web applications.
          </Text>
        </Stack>
      </Container>

      <Box position="relative">
        <BleedRule position="absolute" top="0" />

        <Container>
          <Box
            borderLeftWidth="1px"
            borderRightWidth="1px"
            borderColor="border"
          >
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(3, 1fr)',
              }}
              gap="0"
            >
              {packagesByName.map((pkg, index) => (
                <Box
                  key={pkg.id}
                  borderColor="border"
                  borderRightWidth={{
                    base: '0',
                    md: index % 3 === 2 ? '0' : '1px',
                  }}
                  borderBottomWidth={{
                    base: index === packagesByName.length - 1 ? '0' : '1px',
                    md: index >= lastRowStart ? '0' : '1px',
                  }}
                  transition="backgrounds"
                  _hover={{ bg: 'bg.subtle/35' }}
                >
                  <PackageCard pkg={pkg} href={packagePath(pkg.id)} />
                </Box>
              ))}
            </Grid>
          </Box>
        </Container>

        <BleedRule />
      </Box>
    </Box>
  )
}

function BleedRule(props: { position?: 'absolute'; top?: string }) {
  return (
    <Box
      borderTopWidth="1px"
      borderColor="border"
      w="100vw"
      ml="50%"
      transform="translateX(-50%)"
      pointerEvents="none"
      {...props}
    />
  )
}
