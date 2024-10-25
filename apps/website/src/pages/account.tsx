import {
  Box,
  Card,
  CardBody,
  Heading,
  Grid,
  HStack,
  Spacer,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useClipboard,
  IconButton,
  Tooltip,
  Badge,
  Divider,
} from '@chakra-ui/react'
import { Container, Text } from '@chakra-ui/react'
import {
  EmptyState,
  StructuredList,
  StructuredListItem,
  StructuredListCell,
  useSnackbar,
} from '@saas-ui/react'

import SEO from '@/components/seo'

import { ButtonLink } from '@/components/link'
import { getServerSidePropsClient } from '@/lib/supabase'
import type { InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { LuCopy, LuCheck } from 'react-icons/lu'
import { format } from 'date-fns'
import Link from 'next/link'
import { DiscordRoles } from '@/components/redeem-form/discord-roles'

type Licenses = InferGetServerSidePropsType<
  typeof getServerSideProps
>['licenses']

export default function AccountPage(props: { licenses: Licenses }) {
  return (
    <Box>
      <SEO
        title="Account"
        description="Manage your account settings."
        titleTemplate="%s - The frontend stack for SaaS companies"
      />

      <Box py="20" w="full">
        <Box>
          <Container maxW="container.xl">
            <Grid gridTemplateColumns="2fr 1fr" gap={10}>
              <Licenses licenses={props.licenses} />
              {props.licenses?.length && <Products />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

function Licenses({ licenses }: { licenses: Licenses }) {
  let content: React.ReactNode = null

  if (!licenses?.length) {
    content = (
      <EmptyState
        title="No licenses found"
        description="You don't have any licenses yet."
        height="200px"
      />
    )
  } else {
    content = (
      <Table
        size="sm"
        variant="simple"
        sx={{
          tableLayout: 'fixed',
          '& tr:last-child td': {
            borderBottom: 'none',
          },
        }}
      >
        <Thead>
          <Tr>
            <Th
              py="2"
              fontWeight="normal"
              textTransform="none"
              width="240px"
              isTruncated
            >
              License key
            </Th>
            <Th py="2" fontWeight="normal" textTransform="none">
              Type
            </Th>
            <Th py="2" fontWeight="normal" textTransform="none">
              Github
            </Th>
            <Th py="2" fontWeight="normal" textTransform="none">
              Activations
            </Th>
            <Th py="2" fontWeight="normal" textTransform="none" width="120px">
              Expires
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {licenses.map((license) => (
            <Tr key={license.key}>
              <Td width="240px">
                <HStack>
                  <Badge
                    bg={license.status === 'active' ? 'green.500' : 'red.500'}
                    boxSize="2"
                    p="0"
                    flexShrink={0}
                    rounded="full"
                  />
                  <Tooltip label={license.key}>
                    <Text isTruncated>{license.key}</Text>
                  </Tooltip>
                  <CopyButton text={license.key} />
                </HStack>
              </Td>
              <Td>{license.product}</Td>
              <Td>{license.githubAccount}</Td>
              <Td>{license.activations}</Td>
              <Td>
                {license.status === 'expired' ? (
                  <RenewButton licenseKey={license.key} />
                ) : license.expiresAt ? (
                  format(new Date(license.expiresAt), 'P')
                ) : (
                  'Never'
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <Box mb="8">
      <HStack mb="4">
        <Heading as="h3" size="md">
          Your licenses
        </Heading>
        <Spacer />

        <ButtonLink variant="outline" href="/pricing">
          Purchase license
        </ButtonLink>
      </HStack>
      <Card>
        <CardBody p="0">{content}</CardBody>
      </Card>
    </Box>
  )
}

const renewLicense = async (licenseKey: string) => {
  const result = await fetch('/api/renew', {
    method: 'POST',
    body: JSON.stringify({ licenseKey }),
  })

  const { url } = await result.json()

  return url
}

function CopyButton({ text }: { text: string }) {
  const { onCopy, hasCopied } = useClipboard(text)

  return (
    <IconButton onClick={onCopy} aria-label="Copy license key" size="xs">
      {hasCopied ? <LuCheck /> : <LuCopy />}
    </IconButton>
  )
}

function RenewButton({ licenseKey }: { licenseKey: string }) {
  const snackbar = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleRenew = async () => {
    setLoading(true)
    try {
      const url = await renewLicense(licenseKey)
      window.location.href = url
    } catch (err) {
      snackbar.error({
        title: 'Renewal failed',
        description: 'Please contact us if the issue persists.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip label="40% discount on renewals">
      <Button
        variant="primary"
        size="xs"
        isLoading={loading}
        onClick={handleRenew}
      >
        Renew
      </Button>
    </Tooltip>
  )
}

function Products() {
  return (
    <Box>
      <Heading as="h3" size="md" mb="4" px="4">
        Your products
      </Heading>

      <StructuredList>
        <StructuredListItem as={Link} href="/blocks" borderRadius="lg">
          <StructuredListCell>
            <Heading as="h4" size="sm">
              Blocks
            </Heading>
            <Text color="muted" fontSize="xs">
              Pre-built React components
            </Text>
          </StructuredListCell>
        </StructuredListItem>
        <StructuredListItem
          as={Link}
          href="https://github.com/saas-js/saas-ui-pro-nextjs-starter-kit"
          borderRadius="lg"
        >
          <StructuredListCell>
            <Heading as="h4" size="sm">
              Next.js starter kit
            </Heading>
            <Text color="muted" fontSize="xs">
              Production-ready Next.js starter kit
            </Text>
          </StructuredListCell>
        </StructuredListItem>
        <StructuredListItem
          as={Link}
          href="https://github.com/saas-js/saas-ui-pro"
          borderRadius="lg"
        >
          <StructuredListCell>
            <Heading as="h4" size="sm">
              Saas UI Pro
            </Heading>
            <Text color="muted" fontSize="xs">
              Premium components and templates
            </Text>
          </StructuredListCell>
        </StructuredListItem>
      </StructuredList>

      <Box px="4">
        <Divider mb="4" />

        <DiscordRoles />
      </Box>
    </Box>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = getServerSidePropsClient(ctx)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const licenses: Array<{
    githubAccount: string
    key: string
    email: string
    product: string
    activationLimit: number
    activations: number
    createdAt: string
    expiresAt: string
    status: string
  }> = []

  for await (const license of user.user_metadata.licenses) {
    try {
      const data = await getLicense(license.licenseKey)

      licenses.push({
        ...data,
        githubAccount: license.githubAccount,
      })
    } catch (err) {
      continue
    }
  }

  return {
    props: {
      licenses,
    },
  }
}

const getLicense = async (licenseKey: string) => {
  const API_KEY = process.env.LEMON_API_KEY

  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/validate`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      method: 'POST',
      body: `license_key=${licenseKey}`,
    }
  )

  const result = (await response.json()) as {
    valid: boolean
    error: string
    license_key: {
      status: string
      key: string
      created_at: string
      expires_at: string
      activation_limit: number
      activation_usage: number
    }
    meta: {
      customer_email: string
      variant_name: string
    }
  }

  if (!result) {
    throw new Error('Invalid license')
  }

  return {
    status: result.license_key.status,
    key: result.license_key.key,
    createdAt: result.license_key.created_at,
    expiresAt: result.license_key.expires_at,
    activationLimit: result.license_key.activation_limit,
    activations: result.license_key.activation_usage,
    email: result.meta?.customer_email,
    product: result.meta?.variant_name,
  }
}
