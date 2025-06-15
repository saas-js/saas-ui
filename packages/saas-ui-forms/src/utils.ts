import * as React from 'react'

import { FieldOption, FieldOptions } from './types'

export const mapNestedFields = (name: string, children: React.ReactNode) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement<any>(child)) {
      const props = child.props as any

      if (!props.name) {
        return child
      }

      let childName = props.name
      if (childName.includes('.')) {
        childName = childName.replace(/^.*\.(.*)/, '$1')
      } else if (childName.includes('.$')) {
        childName = childName.replace(/^.*\.\$(.*)/, '$1')
      }

      return React.cloneElement(child, {
        ...props,
        name: `${name}.${childName}`,
      })
    }

    return child
  })
}

export const mapOptions = <TOption extends FieldOption = FieldOption>(
  options: FieldOptions<TOption>,
) => {
  return options.map((option) => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      }
    }
    return option
  })
}
