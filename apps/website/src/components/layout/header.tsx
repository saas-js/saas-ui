import * as React from 'react'

import { Box, BoxProps, Button, Container, HStack } from '@chakra-ui/react'
import Navigation from './navigation'
import Logo from './logo'
import { useScroll } from 'framer-motion'
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
      colorScheme="primary"
      display="flex"
      justifyContent="center"
    >
      <BannerContent alignItems="center" justifyContent="center">
        <BannerTitle>Black Friday Sale 🤩</BannerTitle>
        <BannerDescription>
          Use code <strong>BLACKFRIDAY30</strong> and get{' '}
          <strong>30% OFF</strong>
        </BannerDescription>
        <BannerActions>
          <ButtonLink href="/pricing">Buy now</ButtonLink>
        </BannerActions>
      </BannerContent>
    </Banner>
  )
}

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

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
      {...props}
    >
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
          WebkitMask: 'linear-gradient(to bottom, black 60px, transparent)',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Box borderBottomWidth="1px" position="relative" zIndex="1">
          <Container maxW="container.2xl" px={{ base: 4, sm: 8 }} py="3">
            <HStack width="full" align="center">
              <Logo
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault()

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
                }}
              />
              <Navigation />
            </HStack>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
