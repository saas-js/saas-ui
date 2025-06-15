'use client'

import { Persona, Stack } from '@saas-ui/react'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export const PersonaSizes = () => {
  return (
    <Stack>
      {sizes.map((size) => (
        <Persona.Root key={size} size={size}>
          <Persona.Avatar name="David Wilson" src="/avatars/1.png" />
          <Persona.Details>
            <Persona.Label>David Wilson</Persona.Label>
            <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
          </Persona.Details>
        </Persona.Root>
      ))}
    </Stack>
  )
}
