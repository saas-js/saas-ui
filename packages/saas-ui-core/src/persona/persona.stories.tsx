import { Avatar, AvatarBadge, Container, Icon, VStack } from '@chakra-ui/react'
import * as React from 'react'

import { FiClock } from 'react-icons/fi'
import { MinusIcon, PhoneIcon } from '@chakra-ui/icons'

import {
  Persona,
  PersonaContainer,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
  PersonaTertiaryLabel,
  Presence,
} from '../'

export default {
  title: 'Components/Data display/Persona',
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

export const basic = () => (
  <>
    <VStack spacing="8">
      <Persona {...persona} size="2xs" />

      <Persona {...persona} size="xs" />

      <Persona {...persona} size="sm" />

      <Persona {...persona} size="md" />

      <Persona {...persona} size="lg" />

      <Persona {...persona} size="xl" />

      <Persona {...persona} size="2xl" />
    </VStack>
  </>
)

export const composed = () => (
  <>
    <PersonaContainer>
      <PersonaAvatar name={persona.name} presence="away" />
      <PersonaDetails>
        <PersonaLabel>{persona.name}</PersonaLabel>
        <PersonaSecondaryLabel>{persona.secondaryLabel}</PersonaSecondaryLabel>
        <PersonaTertiaryLabel>{persona.tertiaryLabel}</PersonaTertiaryLabel>
      </PersonaDetails>
    </PersonaContainer>
  </>
)

export const hideDetails = () => (
  <>
    <VStack spacing="8">
      <Persona {...persona} hideDetails presence="offline" />
    </VStack>
  </>
)

export const badgeIcon = () => (
  <>
    <VStack spacing="8">
      <PersonaContainer size="lg">
        <PersonaAvatar
          name={persona.name}
          presence="away"
          presenceIcon={<Icon as={FiClock} />}
        />
        <PersonaDetails>
          <PersonaLabel>{persona.name}</PersonaLabel>
          <PersonaSecondaryLabel>
            {persona.secondaryLabel}
          </PersonaSecondaryLabel>
          <PersonaTertiaryLabel>{persona.tertiaryLabel}</PersonaTertiaryLabel>
        </PersonaDetails>
      </PersonaContainer>

      <Persona
        {...persona}
        presenceIcon={<MinusIcon boxSize="0.4em" />}
        size="xl"
        presence="busy"
      />
    </VStack>
  </>
)

export const customAvatar = () => (
  <>
    <VStack spacing="8">
      <PersonaContainer size="lg">
        <Avatar name={persona.name}>
          <AvatarBadge boxSize="1em" bg={Presence.away}>
            <Icon as={FiClock} />
          </AvatarBadge>
        </Avatar>
        <PersonaDetails>
          <PersonaLabel>{persona.name}</PersonaLabel>
          <PersonaSecondaryLabel>
            {persona.secondaryLabel}
          </PersonaSecondaryLabel>
          <PersonaTertiaryLabel>{persona.tertiaryLabel}</PersonaTertiaryLabel>
        </PersonaDetails>
      </PersonaContainer>
    </VStack>
  </>
)

export const labelWithIcon = () => (
  <>
    <VStack spacing="8">
      <Persona
        {...persona}
        presence="busy"
        secondaryLabel={
          <>
            <PhoneIcon /> On a call
          </>
        }
      />
    </VStack>
  </>
)

export const outOfOffice = () => (
  <>
    <VStack spacing="8">
      <Persona {...persona} presence="offline" size="xs" isOutOfOffice />
      <Persona {...persona} presence="online" isOutOfOffice />
      <Persona {...persona} presence="away" size="xl" isOutOfOffice />
    </VStack>
  </>
)
