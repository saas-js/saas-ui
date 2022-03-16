import { Fragment } from 'react'
import {
  Box,
  BoxProps,
  Stack,
  VStack,
  SimpleGrid,
  Heading,
  Text,
} from '@chakra-ui/layout'
import {
  Icon,
  Circle,
  ResponsiveValue,
  useMultiStyleConfig,
  ThemingProps,
  SystemProps,
} from '@chakra-ui/react'
import SectionWrapper, { SectionProps } from '../section-wrapper'
import SectionTitle, { SectionTitleProps } from '../section-title'

import ScaleInView from '@/components/motion/scale-in-view'

export interface FeaturesProps
  extends Omit<SectionTitleProps, 'title'>,
    ThemingProps<'Features'> {
  title?: React.ReactNode
  description?: React.ReactNode
  features: Array<FeatureProps>
  columns?: ResponsiveValue<number>
  spacing?: string | number
  aside?: React.ReactChild
  reveal?: boolean
  iconSize?: SystemProps['boxSize']
  innerWidth?: SystemProps['maxW']
}

export interface FeatureProps {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: any
  iconPosition?: 'left' | 'top'
  iconSize?: SystemProps['boxSize']
  ip?: 'left' | 'top'
  variant?: string
}

export function Feature({
  title,
  description,
  icon,
  iconPosition,
  iconSize = 8,
  ip,
  variant,
}: FeatureProps) {
  const styles = useMultiStyleConfig('Feature', { variant })

  const pos = iconPosition || ip
  const direction = pos === 'left' ? 'row' : 'column'

  return (
    <Stack sx={styles.container} direction={direction}>
      {icon && (
        <Circle sx={styles.icon}>
          <Icon as={icon} boxSize={iconSize} />
        </Circle>
      )}
      <Box>
        <Heading sx={styles.title}>{title}</Heading>
        <Text sx={styles.description}>{description}</Text>
      </Box>
    </Stack>
  )
}

export default function Features({
  title,
  description,
  features,
  columns = [1, 2, 3],
  spacing = 8,
  align = 'center',
  iconSize = 8,
  aside,
  reveal,
  ...props
}: FeaturesProps) {
  if (!!aside) {
    align = 'left'
  }
  const ip = align === 'left' ? 'left' : 'top'

  let Wrap: React.FunctionComponent = Fragment
  if (reveal) {
    Wrap = ScaleInView
  }

  return (
    <SectionWrapper {...props}>
      <Stack direction="row" height="full" align="flex-start">
        <VStack flex="1" spacing={[4, null, 8]} alignItems="stretch">
          {(title || description) && (
            <Wrap>
              <SectionTitle
                title={title}
                description={description}
                align={align}
              />
            </Wrap>
          )}
          <SimpleGrid columns={columns} spacing={spacing}>
            {features.map((feature, i) => {
              return (
                <Wrap key={i}>
                  <Feature iconSize={iconSize} {...feature} ip={ip} />
                </Wrap>
              )
            })}
          </SimpleGrid>
        </VStack>
        {aside && (
          <Box flex="1" p="8">
            {aside}
          </Box>
        )}
      </Stack>
    </SectionWrapper>
  )
}
