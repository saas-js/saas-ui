import * as React from 'react'

import { Box, BoxProps, Button, Container, HStack } from '@chakra-ui/react'
import { Navigation } from './navigation-menu'
import Logo from './logo'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Banner,
  BannerActions,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from '@saas-ui/react'
import { ButtonLink } from '../link'

const GlobalBanner = () => {
  return (
    <Banner
      variant="solid"
      // bg="black"
      colorScheme="primary"
      display="flex"
      justifyContent="center"
      py="1"
    >
      <BannerContent alignItems="center" justifyContent="center" fontSize="sm">
        <BannerTitle>Saas UI v3 beta is now available!</BannerTitle>
        <BannerDescription>
          Check out the new docs and give us feedback on Github
        </BannerDescription>
        <BannerActions>
          <ButtonLink
            href="https://beta.saas-ui.dev"
            colorScheme="white"
            size="xs"
            height="6"
          >
            Check it out
          </ButtonLink>
        </BannerActions>
      </BannerContent>
    </Banner>
  )
}

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  const { maxWidth = 'container.xl', ...rest } = props

  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest)
  })

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="slow"
      boxShadow={y > height ? 'md' : ''}
      bg="whiteAlpha.900"
      _dark={{
        bg: 'transparent',
      }}
      {...rest}
    >
      <GlobalBanner />
      <Box
        zIndex="1"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bottom: '-20px',
          backdropFilter: 'blur(16px)',
          mask: 'linear-gradient(to-b, black, transparent)',
          WebkitMask: 'linear-gradient(to bottom, black 49px, transparent)',
          transform: 'translate3d(0, 0, 0)',
          pointerEvents: 'none',
        }}
      >
        <Box borderBottomWidth="1px" position="relative" zIndex="1">
          <Container maxW={maxWidth} px="4" py="2">
            <Navigation />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
