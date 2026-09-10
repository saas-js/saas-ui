'use client';
import { Persona } from 'compositions/ui/persona'
import { Stack } from '@chakra-ui/react'

export const PersonaWithShape = () => {
  return (
    <Stack gap="4">
      <Persona.Root>
        <Persona.Avatar
          name="David Wilson"
          src="/img/avatars/1.png"
          shape="square"
        />
      </Persona.Root>
      <Persona.Root>
        <Persona.Avatar
          name="Marcus Chen"
          src="/avatars/2.png"
          shape="rounded"
        />
      </Persona.Root>
      <Persona.Root>
        <Persona.Avatar
          name="Sarah Johnson"
          src="/avatars/3.png"
          shape="full"
        />
      </Persona.Root>
    </Stack>
  )
}
