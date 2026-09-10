'use client'

import { Persona } from 'compositions/ui/persona'

export const PersonaOutOfOffice = () => {
  return (
    <Persona.Root outOfOffice presence="away">
      <Persona.Avatar name="David Wilson" src="/img/avatars/1.png">
        <Persona.PresenceBadge />
      </Persona.Avatar>
      <Persona.Details>
        <Persona.Label>David Wilson</Persona.Label>
        <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
        <Persona.TertiaryLabel>On a road trip</Persona.TertiaryLabel>
      </Persona.Details>
    </Persona.Root>
  )
}
