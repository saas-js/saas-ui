'use client'

import { Persona } from '@saas-ui/react'

export const PersonaOutOfOffice = () => {
  return (
    <Persona.Root outOfOffice>
      <Persona.Avatar name="David Wilson" src="/avatars/1.png" />
      <Persona.Details>
        <Persona.Label>David Wilson</Persona.Label>
        <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
        <Persona.TertiaryLabel>On a road trip</Persona.TertiaryLabel>
      </Persona.Details>
    </Persona.Root>
  )
}
