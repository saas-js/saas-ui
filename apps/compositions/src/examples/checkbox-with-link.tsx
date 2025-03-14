'use client'

import { Link } from '@chakra-ui/react'
import { Checkbox } from '@saas-ui/react'

export const CheckboxWithLink = () => {
  return (
    <Checkbox>
      I agree to the{' '}
      <Link colorPalette="teal" href="https://google.com">
        terms and conditions
      </Link>
    </Checkbox>
  )
}
