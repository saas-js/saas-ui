import { Container } from '@chakra-ui/layout'
import {
  chakra,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  StyleProps,
  HTMLChakraProps,
} from '@chakra-ui/react'

export interface SectionProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'Section'> {
  children: React.ReactNode
  innerWidth?: StyleProps['width']
}

export default function Section({
  children,
  innerWidth,
  ...props
}: SectionProps) {
  const styles = useStyleConfig('Section', props)

  const ownProps = omitThemingProps(props)

  return (
    <chakra.div __css={styles} {...ownProps}>
      <Container height="full" width={innerWidth}>
        {children}
      </Container>
    </chakra.div>
  )
}
