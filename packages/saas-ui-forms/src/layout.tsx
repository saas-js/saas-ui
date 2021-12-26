import * as React from 'react'

import { chakra, SimpleGrid, SimpleGridProps, useTheme } from '@chakra-ui/react'

export type FormLayoutProps = SimpleGridProps

interface FormLayoutItemProps {
  children: React.ReactNode
}

const FormLayoutItem: React.FC<FormLayoutItemProps> = ({ children }) => {
  return <chakra.div>{children}</chakra.div>
}

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
    <SimpleGrid {...gridProps}>
      {React.Children.map(children, (child) => {
        return <FormLayoutItem>{child}</FormLayoutItem>
      })}
    </SimpleGrid>
  )
}
