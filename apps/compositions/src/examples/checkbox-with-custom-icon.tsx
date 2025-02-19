'use client'

import { Checkbox } from '@saas-ui/react'
import { HiOutlinePlus } from 'react-icons/hi'

export const CheckboxWithCustomIcon = () => {
  return (
    <Checkbox defaultChecked icon={<HiOutlinePlus />}>
      With Custom Icon
    </Checkbox>
  )
}
