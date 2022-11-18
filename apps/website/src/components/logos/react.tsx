import { useColorModeValue } from '@chakra-ui/system'
import * as React from 'react'

export const ReactLogo = (props) => {
  const color = useColorModeValue('black', 'white')
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="-11.5 -10.232 23 20.463"
      {...props}
    >
      <circle r="2.05" fill={color} />
      <g stroke={color} fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}
