import * as React from 'react'

import { chakra, SimpleGrid, SimpleGridProps, useTheme } from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

export interface FormLayoutProps extends SimpleGridProps {}

interface FormLayoutItemProps {
  children: React.ReactNode
}

const FormLayoutItem: React.FC<FormLayoutItemProps> = ({ children }) => {
  return <chakra.div>{children}</chakra.div>
}

FormLayoutItem.displayName = 'FormLayoutItem'

/**
 * Create consistent field spacing and positioning.
 *
 *
 * Renders form items in a `SimpleGrid`
 * @see https://chakra-ui.com/docs/layout/simple-grid
 *
 * @see https://saas-ui.dev/docs/components/forms/form
 */
export const FormLayout = ({ children, ...props }: FormLayoutProps) => {
  const theme = useTheme()

  const defaultProps = theme.components?.SuiFormLayout?.defaultProps ?? {
    spacing: 4,
  }

  const gridProps = {
    ...defaultProps,
    ...props,
  }

  return (
    <SimpleGrid
      {...gridProps}
      className={cx('sui-form__layout', props.className)}
    >
      {children}
    </SimpleGrid>
  )
}

FormLayout.displayName = 'FormLayout'
