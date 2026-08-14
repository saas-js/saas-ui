'use client';
import { Persona } from 'compositions/ui/persona'
import { Stack } from '@chakra-ui/react'

const presenceOptions = ['online', 'busy', 'dnd', 'away', 'offline'] as const

export const PersonaWithPresenceRing = () => {
  return (
    <Stack>
      {presenceOptions.map((presence) => (
        <Persona.Root presence={presence} variant="ring">
          <Persona.Avatar name="David Wilson" src="/img/avatars/1.png">
            <Persona.PresenceBadge />
          </Persona.Avatar>
          <Persona.Details>
            <Persona.Label>David Wilson</Persona.Label>
            <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
          </Persona.Details>
        </Persona.Root>
      ))}
    </Stack>
  )
}
