'use client'

import { Icon } from '@chakra-ui/react'
import { Switch } from '@saas-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

export const SwitchWithTrackLabel = () => {
  return (
    <Switch
      colorPalette="blue"
      size="lg"
      trackLabel={{
        on: (
          <Icon color="yellow.400">
            <FaSun />
          </Icon>
        ),
        off: (
          <Icon color="gray.400">
            <FaMoon />
          </Icon>
        ),
      }}
    />
  )
}
