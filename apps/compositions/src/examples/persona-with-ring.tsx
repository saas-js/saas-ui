'use client'

import { Persona, defineStyle } from '@saas-ui/react'

export const PersonaWithRing = () => {
  return (
    <Persona.Root>
      <Persona.Avatar name="David Wilson" src="/avatars/1.png" css={ringCss} />
      <Persona.Details>
        <Persona.Label>David Wilson</Persona.Label>
        <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
      </Persona.Details>
    </Persona.Root>
  )
}

const ringCss = defineStyle({
  outlineWidth: '2px',
  outlineColor: 'presence.online',
  outlineOffset: '2px',
  outlineStyle: 'solid',
})
