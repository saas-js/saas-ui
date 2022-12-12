import { useState, useEffect } from 'react'

import {
  chakra,
  Stack,
  Heading,
  Text,
  Spinner,
  Center,
  IconButton,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { ButtonLink } from '@/components/link'

import {
  useLocalStorage,
  Link,
  Form,
  FormLayout,
  Field,
  SubmitButton,
  Card,
  CardBody,
  ButtonGroup,
  useSnackbar,
} from '@saas-ui/react'

import { FaGithub, FaDiscord } from 'react-icons/fa'

import confetti from 'canvas-confetti'

export function RedeemForm(props) {
  const router = useRouter()
  const snackbar = useSnackbar()

  const [data, setData] = useLocalStorage('saas-ui.data', null)

  const [licenseKey, setLicenseKey] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(true)

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

  const handleSubmit = async ({ licenseKey, githubAccount }) => {
    setTimeout(() => {
      /* @ts-ignore */
      window?.pirsch?.('Redeem Submitted')
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
  } else if (data) {
    content = (
      <Stack spacing="4" fontSize="md">
        <Heading size="md">
          Welcome on board{' '}
          <chakra.span onClick={celebrate} cursor="pointer">
            🥳
          </chakra.span>
        </Heading>
        <Text>
          {data.githubInvited || !router.query.sale_id ? (
            <Text>
              Your Github account <strong>{data.githubAccount}</strong> has been
              added to the private{' '}
              <Link
                href="https://github.com/saas-js/saas-ui-pro"
                target="_blank"
              >
                Github repo
              </Link>
              .
            </Text>
          ) : (
            'You will receive a Github invite shortly, depending on the timezone you are in.'
          )}
        </Text>

        <Text>
          As an early adopter your opinion is very important to me, please
          don&apos;t hestitate to reach out when you have any questions or
          feedback, especially if you don&apos;t like something :)
        </Text>

        <Text>Here are some links to get your started.</Text>

        <ButtonGroup>
          <ButtonLink href="/docs/pro/overview">Documentation</ButtonLink>
          <ButtonLink
            href={data.discordInvite}
            leftIcon={<FaDiscord />}
            target="_blank"
          >
            Discord
          </ButtonLink>

          <ButtonLink
            variant="ghost"
            href="https://github.com/saas-js/saas-ui-pro"
            leftIcon={<FaGithub />}
            target="_blank"
          >
            Github
          </ButtonLink>

          <ButtonLink
            href="https://roadmap.saas-ui.dev"
            variant="ghost"
            target="_blank"
          >
            Roadmap
          </ButtonLink>
        </ButtonGroup>
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
      >
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

          <SubmitButton label="Redeem" />
        </FormLayout>
      </Form>
    )
  }

  return (
    <Card {...props}>
      <CardBody>{content}</CardBody>
    </Card>
  )
}
