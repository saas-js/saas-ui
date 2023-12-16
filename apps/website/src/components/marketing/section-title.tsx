import { VStack, Heading, Box, StackProps } from '@chakra-ui/react'
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
      {typeof title === 'string' ? (
        <Heading sx={styles.title} as="h2" textStyle="sectionTitle">
          {title}
        </Heading>
      ) : (
        title
      )}
      {typeof description === 'string' ? (
        <Box sx={styles.description} textAlign={align}>
          {description}
        </Box>
      ) : (
        description
      )}
    </VStack>
  )
}
