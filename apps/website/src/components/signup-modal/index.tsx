import { useRef, useState, FormEvent } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

function encode(data: Record<string, any>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export function SignupModal({ isOpen, onClose }: any) {
  const initialRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<boolean | null>(null)

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    setLoading(true)

    /* @ts-ignore */
    window?.pirsch?.('Signup Submitted')

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
        window?.pirsch?.('Signup Failed')
        setResult(false)
      })
      .finally(() => setLoading(false))
  }

  let content

  if (result) {
    content = (
      <Text fontWeight="semibold">
        {`Awesome 😎 ! Thanks for signing up, we really appreciate your early
        support. You\'ll hear from us soon.`}
      </Text>
    )
  } else {
    content = (
      <>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            ref={initialRef}
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormControl>
      </>
    )
  }

  let footer

  if (result) {
    footer = (
      <Button colorScheme="primary" onClick={onClose}>
        Close
      </Button>
    )
  } else {
    footer = (
      <>
        <Button variant="ghost" mr={3} onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button colorScheme="primary" type="submit" isLoading={loading}>
          Request access
        </Button>
      </>
    )
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} data-netlify="true">
        <ModalHeader>Sign up for early access</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="4" fontSize="sm" opacity={0.6}>
            We are still working hard on the first release of Saas UI. Once we
            release the public beta, you will be the first to know.
          </Text>

          {content}
        </ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
