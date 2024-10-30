import { defineRecipe } from '@chakra-ui/react'

export const iconRecipe = defineRecipe({
  className: 'chakra-icon',
  base: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    lineHeight: '1em',
    flexShrink: 0,
    color: 'currentcolor',
  },
})
