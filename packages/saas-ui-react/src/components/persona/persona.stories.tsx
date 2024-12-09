import * as React from 'react'

import { Container, VStack } from '@chakra-ui/react'
import { FiMinus, FiPhone } from 'react-icons/fi'

import { Persona } from './persona.tsx'

export default {
  title: 'Components/Persona',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const persona = {
  name: 'Elliot Alderson',
  presence: 'online',
  secondaryLabel: 'Mr Robot',
  tertiaryLabel: 'Away for lunch',
}

export const Basic = () => (
  <>
    <VStack gap="8">
      <Persona {...persona} presence="online" size="2xs" />

      <Persona {...persona} presence="online" size="xs" />

      <Persona {...persona} presence="online" size="sm" />

      <Persona {...persona} presence="online" size="md" />

      <Persona {...persona} presence="online" size="lg" />

      <Persona {...persona} presence="online" size="xl" />

      <Persona {...persona} presence="online" size="2xl" />
    </VStack>
  </>
)

export const HideDetails = () => (
  <>
    <VStack gap="8">
      <Persona {...persona} hideDetails presence="offline" />
    </VStack>
  </>
)

export const BadgeIcon = () => (
  <>
    <VStack gap="8">
      <Persona
        {...persona}
        presenceIcon={<FiMinus size="0.4em" />}
        size="xl"
        presence="busy"
      />
    </VStack>
  </>
)

export const LabelWithIcon = () => (
  <>
    <VStack gap="8">
      <Persona
        {...persona}
        presence="busy"
        secondaryLabel={
          <>
            <FiPhone /> On a call
          </>
        }
      />
    </VStack>
  </>
)

export const OutOfOffice = () => (
  <>
    <VStack gap="8">
      <Persona {...persona} presence="offline" size="xs" isOutOfOffice />
      <Persona {...persona} presence="online" isOutOfOffice />
      <Persona {...persona} presence="away" size="xl" isOutOfOffice />
    </VStack>
  </>
)

export const Overflow = () => (
  <>
    <VStack gap="8">
      <Persona
        {...persona}
        secondaryLabel="This is a very long text and should overflow."
        presence="offline"
        isOutOfOffice
        maxW="200px"
      />
    </VStack>
  </>
)
