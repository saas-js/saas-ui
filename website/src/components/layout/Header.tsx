import { Box, BoxProps, Container, Flex } from '@chakra-ui/layout'
import Navigation from '@/components/layout/Navigation'
import Logo from './Logo'

import LogoSolid from '/public/saasui.svg'
import LogoDark from '/public/saasui-dark.svg'

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  return (
    <Box
      as="header"
      top="0"
      w="full"
      backdropFilter="blur(5px)"
      zIndex="sticky"
      {...props}
    >
      <Container maxW="container.2xl" px="8" py="4">
        <Flex width="full" align="center" justify="space-between">
          <Logo
            svg={<LogoDark />}
            svgDark={<LogoSolid />}
            text="Saas UI"
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
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
