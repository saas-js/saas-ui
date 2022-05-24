import { Box, Stack, VStack } from '@chakra-ui/layout'
import {
  ButtonProps as ChakraButtonProps,
  useMultiStyleConfig,
  Button,
  StylesProvider,
  omitThemingProps,
  SystemStyleObject,
} from '@chakra-ui/react'
import SectionWrapper, { SectionProps } from '../section-wrapper'
import SectionTitle, { SectionTitleProps } from '../section-title'

export interface CTAAction extends ChakraButtonProps {
  label: string
  href?: string
}

export interface CTAProps extends Omit<SectionProps, 'children'> {
  title: string
  description?: React.ReactNode
  action?: CTAAction
  secondaryAction?: CTAAction
  variant?: 'subtle' | 'solid' | 'light'
  children?: React.ReactNode
  aside?: React.ReactNode
}

const ActionButton = ({ label, ...actionProps }: CTAAction) => {
  return <Button {...actionProps}>{label}</Button>
}

export default function CTASection(props: CTAProps) {
  const {
    title,
    description,
    action,
    secondaryAction,
    variant,
    children,
    aside,
  } = props

  // const direction = !!aside ? 'column' : 'row'
  const align = !!aside ? 'left' : 'center'
  // const ip = !!aside ? 'left' : 'top'
  // console.log(ip)

  const styles = useMultiStyleConfig('CTA', props)

  const ownProps = omitThemingProps(props)

  let actionBtn
  if (action) {
    actionBtn = (
      <ActionButton
        colorScheme={variant === 'solid' ? 'secondary' : 'primary'}
        sx={styles.action}
        {...action}
      />
    )
  }

  let secondaryBtn
  if (secondaryAction) {
    secondaryBtn = (
      <ActionButton
        variant="ghost"
        colorScheme="white"
        sx={styles.secondaryAction}
        {...secondaryAction}
      />
    )
  }

  return (
    <StylesProvider value={styles}>
      <SectionWrapper sx={styles.wrapper} {...ownProps}>
        <Stack direction="row">
          <VStack flex="1" align={align}>
            <SectionTitle
              title={title}
              description={description}
              align={align}
              variant={variant === 'solid' ? 'light' : 'default'}
            />
            <Stack direction="row">
              {actionBtn}
              {secondaryBtn}
              {children}
            </Stack>
          </VStack>
          {aside && (
            <Box flex="1" p="8">
              {aside}
            </Box>
          )}
        </Stack>
      </SectionWrapper>
    </StylesProvider>
  )
}
