import * as React from 'react'

export const mapNestedFields = (name: string, children: React.ReactNode) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.name) {
      return React.cloneElement(child, {
        ...child.props,
        name: `${name}.${child.props.name}`,
      })
    }
    return child
  })
}
