import { Box, Heading, useStyleConfig } from '@chakra-ui/react'

export interface CardProps {
  title?: string
  actions?: Record<string, any>
  size?: string
  variant?: string
  children?: React.ReactNode
}

export default function Card({
  title,
  actions,
  size,
  variant,
  children,
  ...props
}: CardProps) {
  const styles = useStyleConfig('Card', { size, variant })
  return (
    <Box __css={styles} {...props}>
      {title && (
        <Heading size="md" p={4}>
          {title}
        </Heading>
      )}
      {children}
    </Box>
  )
}

Card.Section = function CardSection({ children }: any) {
  return <Box>{children}</Box>
}
