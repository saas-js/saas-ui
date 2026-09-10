'use client'

import { Link } from 'compositions/ui/link'
import { Checkbox } from 'compositions/ui/checkbox'

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
