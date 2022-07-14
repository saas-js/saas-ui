import { VStack, Heading, Box, StackProps } from '@chakra-ui/layout'
import { useMultiStyleConfig, SystemStyleObject } from '@chakra-ui/react'

export interface SectionTitleProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  variant?: string
}

export default function SectionTitle({
  title,
  description,
  align,
  variant,
  ...props
}: SectionTitleProps) {
  const styles = useMultiStyleConfig('SectionTitle', { variant })

  return (
    <VStack
      sx={styles.wrapper}
      alignItems={align === 'left' ? 'flex-start' : 'center'}
      spacing={4}
      {...props}
    >
      <Heading sx={styles.title} as="h2">
        {title}
      </Heading>
      {description && (
        <Box sx={styles.description} textAlign={align}>
          {description}
        </Box>
      )}
    </VStack>
  )
}
