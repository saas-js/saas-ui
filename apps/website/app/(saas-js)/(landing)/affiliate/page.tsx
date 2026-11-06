import { LinkButton } from '@/components/link-button'
import {
  AFFONSO_PORTAL_URL,
  affonsoEmbedSrc,
  createAffonsoEmbedToken,
} from '@/lib/affonso'
import { getAuthUser } from '@/lib/auth-user'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createSjsMetadata({
  title: 'Affiliate program',
  description: 'Share Saas UI and earn commissions on referred purchases.',
  path: '/affiliate',
})

export default async function AffiliatePage() {
  const user = await getAuthUser()
  const embed = user
    ? await createAffonsoEmbedToken({
        email: user.email,
        name: user.name,
        externalUserId: user.id,
      })
    : null

  return (
    <Container maxW="4xl">
      <VStack py="20" gap="10" minH="50vh" align="stretch">
        <Stack width="full" alignItems="flex-start" gap="4">
          <Heading size="4xl" mb="2">
            Affiliate program
          </Heading>
          <Text>
            Share Saas UI with your audience and earn a commission on every
            referred purchase.
          </Text>
          {embed ? (
            <iframe
              src={affonsoEmbedSrc(embed.publicToken)}
              title="Affiliate dashboard"
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
              }}
              allow="clipboard-write"
            />
          ) : (
            <>
              <Text color="fg.subtle">
                {user
                  ? 'The in-app dashboard is unavailable right now. Use the affiliate portal in the meantime.'
                  : 'Open the affiliate portal to join, or sign in to manage referrals here.'}
              </Text>
              <LinkButton
                href={AFFONSO_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                colorPalette="accent"
              >
                Open affiliate portal
              </LinkButton>
            </>
          )}
        </Stack>
      </VStack>
    </Container>
  )
}
