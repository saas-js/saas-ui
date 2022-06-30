import { cx } from '@chakra-ui/utils'
import {
  chakra,
  useStyleConfig,
  omitThemingProps,
  Container,
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
  className,
  ...props
}: SectionProps) {
  const styles = useStyleConfig('Section', props)

  const ownProps = omitThemingProps(props)

  return (
    <chakra.div
      __css={styles}
      className={cx('section', className)}
      {...ownProps}
    >
      <Container height="full" maxW={innerWidth}>
        {children}
      </Container>
    </chakra.div>
  )
}
