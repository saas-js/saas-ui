'use client'

import { HStack } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { RiArrowRightLine, RiMailLine } from 'react-icons/ri'

export const ButtonWithIcons = () => {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        <RiMailLine /> Email
      </Button>
      <Button colorPalette="teal" variant="outline">
        Call us <RiArrowRightLine />
      </Button>
    </HStack>
  )
}
