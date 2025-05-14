'use client'

import { chakra } from '@chakra-ui/react'

export const Annoucement = chakra('div', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    textStyle: 'sm',
    gap: '2.5',
    fontWeight: 'medium',
    color: 'colorPalette.fg/80',
    rounded: 'full',
    focusRing: 'outside',
    '& svg': {
      transform: 'translateX(-4px)',
      transition: 'transform 0.2s ease-in-out',
    },
    _hover: {
      color: 'colorPalette.fg',
      '& svg': {
        transform: 'translateX(0)',
      },
    },
  },
})
