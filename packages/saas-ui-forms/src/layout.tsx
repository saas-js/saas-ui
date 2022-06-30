import * as React from 'react'

import { chakra, SimpleGrid, SimpleGridProps, useTheme } from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'

export type FormLayoutProps = SimpleGridProps

interface FormLayoutItemProps {
  children: React.ReactNode
}

const FormLayoutItem: React.FC<FormLayoutItemProps> = ({ children }) => {
  return <chakra.div>{children}</chakra.div>
}

if (__DEV__) {
  FormLayoutItem.displayName = 'FormLayoutItem'
}

/**
 * FormLayout
 *
 * Renders form items in a `SimpleGrid`
 * @see https://chakra-ui.com/docs/layout/simple-grid
 */
export const FormLayout = ({ children, ...props }: FormLayoutProps) => {
  const theme = useTheme()

  const defaultProps = theme.components?.FormLayout?.defaultProps ?? {
    spacing: 4,
  }

  const gridProps = {
    ...defaultProps,
    ...props,
  }

  return (
    <SimpleGrid
      {...gridProps}
      className={cx('saas-form__layout', props.className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <FormLayoutItem>{child}</FormLayoutItem>
        }
        return child
      })}
    </SimpleGrid>
  )
}

if (__DEV__) {
  FormLayout.displayName = 'FormLayout'
}
