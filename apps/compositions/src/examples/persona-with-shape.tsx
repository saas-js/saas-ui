'use client'

import { Persona, Stack } from '@saas-ui/react'

export const PersonaWithShape = () => {
  return (
    <Stack gap="4">
      <Persona.Root>
        <Persona.Avatar
          name="David Wilson"
          src="/avatars/1.png"
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
