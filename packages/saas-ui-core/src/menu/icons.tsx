import * as React from 'react'
import { Icon, IconProps } from '@chakra-ui/icons'

export const MoreIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </Icon>
  )
}
