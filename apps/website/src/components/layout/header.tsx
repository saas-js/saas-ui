import * as React from 'react'

import {
  Box,
  BoxProps,
  Container,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import Navigation from './navigation'
import Logo from './logo'
import { useViewportScroll } from 'framer-motion'

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  const bg = useColorModeValue('whiteAlpha.700', 'hsl(210 11% 10% / 85%)')

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      backdropFilter="blur(16px)"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="slow"
      bg={y > height ? bg : 'transparent'}
      boxShadow={y > height ? 'md' : ''}
      borderBottomWidth="1px"
      {...props}
    >
      <Container maxW="container.2xl" px="8" py="4">
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
  )
}

export default Header
