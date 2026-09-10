'use client';
import { Persona } from 'compositions/ui/persona'
import { Stack } from '@chakra-ui/react'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export const PersonaSizes = () => {
  return (
    <Stack>
      {sizes.map((size) => (
        <Persona.Root key={size} size={size}>
          <Persona.Avatar name="David Wilson" src="/img/avatars/1.png" />
          <Persona.Details>
            <Persona.Label>David Wilson</Persona.Label>
            <Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
          </Persona.Details>
        </Persona.Root>
      ))}
    </Stack>
  )
}
