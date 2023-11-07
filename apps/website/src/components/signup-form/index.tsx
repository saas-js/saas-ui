import { useRef, useState, FormEvent } from 'react'

import {
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
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
    window?.pirsch?.('Signup Submitted')

    fetch('/api/figma-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
        window?.pirsch?.('Signup Failed')
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
      <>
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
          >{`Don't worry, we hate spam too. We'll send you one follow-up email and will notify when there are important updates.`}</Text>

          <Button
            colorScheme="primary"
            type="submit"
            size="md"
            isLoading={loading}
          >
            Get notified
          </Button>
        </FormLayout>
      </>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Figma early access <ModalCloseButton />
        </ModalHeader>
        <ModalBody pb="6">
          <Box
            as="form"
            onSubmit={handleSubmit}
            data-netlify="true"
            name="early-access"
          >
            <Box>{content}</Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
