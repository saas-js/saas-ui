import { useRef, useState, FormEvent } from 'react'

import {
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { FormLayout } from '@saas-ui/forms'

function encode(data: Record<string, any>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export function SignupForm({ isOpen, onClose }: any) {
  const initialRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<boolean | null>(null)

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      setError('Invalid email')
      return
    }

    setLoading(true)

    /* @ts-ignore */
    window?.woopra.track('Signup Submitted')

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      redirect: 'manual',
      body: encode({
        'form-name': 'early-access',
        name,
        email,
      }),
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          setResult(true)
        }
      })
      .catch((error) => {
        console.error(error)
        /* @ts-ignore */
        window?.woopra.track('Signup Failed')
        setResult(false)
      })
      .finally(() => setLoading(false))
  }

  let content

  if (result) {
    content = (
      <Text>
        {`Awesome 😎 ! Thanks for signing up, we really appreciate your early
        support.`}{' '}
        <br />
        <br /> {`We'll contact you at `} <strong>{email}</strong> {`soon.`}
      </Text>
    )
  } else {
    content = (
      <FormLayout>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            ref={initialRef}
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>

        <FormControl isRequired isInvalid={!!error}>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormControl>

        <Text
          fontSize="sm"
          color="muted"
        >{`Don't worry, we hate spam too. We'll send you one follow-up email and will notify you when Saas UI Pro is launched.`}</Text>
      </FormLayout>
    )
  }

  let footer

  if (result) {
    // footer = (
    //   <Button colorScheme="primary" onClick={onClose}>
    //     Close
    //   </Button>
    // )
  } else {
    footer = (
      <Flex justify="flex-end" pt="8">
        <Button
          colorScheme="primary"
          type="submit"
          size="md"
          isLoading={loading}
        >
          Get notified
        </Button>
      </Flex>
    )
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      data-netlify="true"
      name="early-access"
    >
      <Box>{content}</Box>
      {footer}
    </Box>
  )
}
