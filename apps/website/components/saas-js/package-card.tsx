import { InstallCommand } from '@/components/saas-js/install-command'
import { type SjsPackage } from '@/lib/saas-js/packages'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'

const groupLabels = {
  data: 'Data',
  files: 'Files',
  auth: 'Auth',
  ui: 'UI',
} as const

export function PackageCard({
  pkg,
  href,
}: {
  pkg: SjsPackage
  href: string
}) {
  return (
    <Stack gap="4" p={{ base: '5', md: '6' }} h="full">
      <Stack gap="1">
        <Text textStyle="xs" color="fg.muted">
          {groupLabels[pkg.group]}
        </Text>
        <Heading as="h3" textStyle="xl" fontWeight="medium" textWrap="balance">
          <Link href={href} color="fg">
            {pkg.name}
          </Link>
        </Heading>
      </Stack>
      <Text textStyle="sm" color="fg.subtle" textWrap="pretty" flex="1">
        {pkg.tagline}
      </Text>
      <InstallCommand command={pkg.install} size="sm" />
      {pkg.usedInStarterKit ? (
        <Text textStyle="xs" color="fg.muted">
          Used in the TanStack Start starter kit
        </Text>
      ) : null}
    </Stack>
  )
}
