'use client'

import { Persona } from '@saas-ui/react'

export const PersonaWithPresence = () => {
  return (
    <Persona.Root presence="online">
      <Persona.Avatar name="David Wilson" src="/avatars/1.png">
        <Persona.PresenceBadge />
      </Persona.Avatar>
      <Persona.Details>
        <Persona.Label>David Wilson</Persona.Label>
        <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
      </Persona.Details>
    </Persona.Root>
  )
}
