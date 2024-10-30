import * as React from 'react'

import { Container, Icon, VStack } from '@chakra-ui/react'
import { FiClock } from 'react-icons/fi'

import * as PersonaPrimitive from './namespace'

export default {
  title: 'Primitives/Persona',
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

export const Default = () => (
  <>
    <PersonaPrimitive.Root presence="away">
      <PersonaPrimitive.Avatar name={persona.name} />
      <PersonaPrimitive.Details>
        <PersonaPrimitive.Label>{persona.name}</PersonaPrimitive.Label>
        <PersonaPrimitive.SecondaryLabel>
          {persona.secondaryLabel}
        </PersonaPrimitive.SecondaryLabel>
        <PersonaPrimitive.TertiaryLabel>
          {persona.tertiaryLabel}
        </PersonaPrimitive.TertiaryLabel>
      </PersonaPrimitive.Details>
    </PersonaPrimitive.Root>
  </>
)

export const BadgeIcon = () => (
  <>
    <VStack gap="8">
      <PersonaPrimitive.Root size="lg" presence="away">
        <PersonaPrimitive.Avatar name={persona.name}>
          <PersonaPrimitive.PresenceBadge>
            <Icon as={FiClock} />
          </PersonaPrimitive.PresenceBadge>
        </PersonaPrimitive.Avatar>
        <PersonaPrimitive.Details>
          <PersonaPrimitive.Label>{persona.name}</PersonaPrimitive.Label>
          <PersonaPrimitive.SecondaryLabel>
            {persona.secondaryLabel}
          </PersonaPrimitive.SecondaryLabel>
          <PersonaPrimitive.TertiaryLabel>
            {persona.tertiaryLabel}
          </PersonaPrimitive.TertiaryLabel>
        </PersonaPrimitive.Details>
      </PersonaPrimitive.Root>
    </VStack>
  </>
)

export const CustomAvatar = () => (
  <>
    <VStack gap="8">
      <PersonaPrimitive.Root size="lg">
        <PersonaPrimitive.Avatar name={persona.name}>
          <PersonaPrimitive.PresenceBadge>
            <Icon as={FiClock} />
          </PersonaPrimitive.PresenceBadge>
        </PersonaPrimitive.Avatar>
        <PersonaPrimitive.Details>
          <PersonaPrimitive.Label>{persona.name}</PersonaPrimitive.Label>
          <PersonaPrimitive.SecondaryLabel>
            {persona.secondaryLabel}
          </PersonaPrimitive.SecondaryLabel>
          <PersonaPrimitive.TertiaryLabel>
            {persona.tertiaryLabel}
          </PersonaPrimitive.TertiaryLabel>
        </PersonaPrimitive.Details>
      </PersonaPrimitive.Root>
    </VStack>
  </>
)
