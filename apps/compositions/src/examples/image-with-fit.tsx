'use client'

import { Image } from '@saas-ui/react'

export const ImageWithFit = () => (
  <Image
    border="1px solid red"
    rounded="md"
    h="200px"
    w="300px"
    fit="contain"
    src="https://bit.ly/dan-abramov"
  />
)
