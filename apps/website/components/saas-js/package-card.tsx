import { PackageMark } from '@/components/saas-js/package-mark'
import { type SjsPackage } from '@/lib/saas-js/packages'
import { HStack, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

export function PackageCard({
  pkg,
  href,
}: {
  pkg: SjsPackage
  href: string
}) {
  return (
    <LinkBox as="article" h="full">
      <Stack gap="5" p={{ base: '8', md: '10' }} h="full">
        <HStack gap="3" align="center">
          <PackageMark
            mark={pkg.mark}
            logo={pkg.logo}
            logoFramed={pkg.logoFramed}
            name={pkg.name}
            size="sm"
          />
          <Heading as="h3" textStyle="xl" fontWeight="medium" textWrap="balance">
            <LinkOverlay asChild>
              <Link href={href} color="fg">
                {pkg.name}
              </Link>
            </LinkOverlay>
          </Heading>
        </HStack>
        <Text textStyle="md" color="fg.subtle" textWrap="pretty" flex="1">
          {pkg.tagline}
        </Text>
      </Stack>
    </LinkBox>
  )
}
