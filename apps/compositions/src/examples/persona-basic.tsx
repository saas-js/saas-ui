'use client'

import { Persona } from 'compositions/ui/persona'

export const PersonaBasic = () => {
  return (
    <Persona.Root>
      <Persona.Avatar name="David Wilson" src="/img/avatars/1.png" />
      <Persona.Details>
        <Persona.Label>David Wilson</Persona.Label>
        <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
      </Persona.Details>
    </Persona.Root>
  )
}
