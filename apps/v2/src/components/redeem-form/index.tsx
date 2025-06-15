import { useState, useEffect } from 'react'

import {
  chakra,
  Stack,
  Heading,
  Text,
  Spinner,
  Center,
  Card,
  CardBody,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { ButtonLink } from '@/components/link'

import {
  useLocalStorage,
  FormLayout,
  SubmitButton,
  useSnackbar,
} from '@saas-ui/react'

import { Form } from '@saas-ui/forms/zod'

import * as z from 'zod'

import confetti from 'canvas-confetti'

export function RedeemForm(props) {
  const router = useRouter()
  const snackbar = useSnackbar()

  const [data, setData] = useLocalStorage<{
    licenseKey: string
    githubAccount: string
    discordInvite: string
    githubInvited: boolean
  } | null>('saas-ui.data', null)

  const [licenseKey, setLicenseKey] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(true)
  const [success, setSuccess] = useState<boolean>(false)
  const celebrate = () => {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
    })
  }

  useEffect(() => {
    if (router.query.sale_id) {
      setLoading(true)

      fetch('/api/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: router.query.product_id,
          productPermalink: router.query.product_permalink,
          saleId: router.query.sale_id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.licenseKey) {
            setLicenseKey(response.licenseKey)
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else if (router.isReady) {
      setLoading(false)
    }
  }, [router.query, router.isReady])

  useEffect(() => {
    if (router.isReady && router.query.license_key) {
      setLicenseKey(router.query.license_key as string)
    }
  }, [router.query, router.isReady])

  const handleSubmit = async ({ licenseKey, githubAccount }) => {
    setTimeout(() => {
      try {
        /* @ts-ignore */
        window?.pirsch?.('Redeem Submitted', {
          meta: {
            aff: localStorage.getItem('aff'),
          },
        })
      } catch (e) {
        console.log(e)
      }
    })
    return fetch('/api/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseKey,
        githubAccount,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          return snackbar.error(response.error)
        } else {
          snackbar.success('Your license has been activated!')
          celebrate()
        }
        setData({
          licenseKey,
          githubAccount,
          discordInvite: response.discordInvite,
          githubInvited: response.githubInvited,
        })
        setSuccess(true)
      })
      .catch((error) => {
        console.error(error)
        /* @ts-ignore */
        window?.pirsch?.('Redeem Failed')
      })
  }

  let content

  if (loading) {
    content = (
      <Center>
        <Spinner />
      </Center>
    )
  } else if (success && data) {
    content = (
      <Stack spacing="4" fontSize="md">
        <Heading size="md">
          Welcome on board{' '}
          <chakra.span onClick={celebrate} cursor="pointer">
            🥳
          </chakra.span>
        </Heading>

        {data.githubInvited || !router.query.sale_id ? (
          <Text>
            Your Github account <strong>{data.githubAccount}</strong> has been
            added to the GitHub members team.
          </Text>
        ) : (
          <Text>You will receive a Github invite shortly.</Text>
        )}

        <ButtonLink href="/account">Continue to your account</ButtonLink>
      </Stack>
    )
  } else {
    content = (
      <Form
        onSubmit={handleSubmit}
        defaultValues={{
          licenseKey,
          githubAccount: '',
        }}
        minW="400px"
        schema={z.object({
          licenseKey: z.string().min(1, 'License key is required'),
          githubAccount: z
            .string()
            .regex(
              /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
              'Please enter a valid Github username'
            ),
        })}
      >
        {({ Field }) => (
          <FormLayout>
            <Field
              name="licenseKey"
              label="License key"
              rules={{ required: true }}
            />
            <Field
              name="githubAccount"
              label="Github username"
              rules={{ required: true }}
            />

            <SubmitButton>Redeem</SubmitButton>
          </FormLayout>
        )}
      </Form>
    )
  }

  return (
    <Card {...props}>
      <CardBody>{content}</CardBody>
    </Card>
  )
}
