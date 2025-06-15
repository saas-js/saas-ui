'use client'

import { Button, HStack } from '@chakra-ui/react'
import { Checkbox, Slider, Switch } from '@saas-ui/react'

import { TokenDoc } from './token-doc'

export const CursorTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.cursor" mt="8">
      <HStack wrap="wrap" gap="4">
        <Button size="sm">Button</Button>
        <Button size="sm" disabled>
          Disabled
        </Button>
        <Checkbox />
        <Switch />
        <Slider width="120px" defaultValue={[50]} />
      </HStack>
    </TokenDoc>
  )
}
