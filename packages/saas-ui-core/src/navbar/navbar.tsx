import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavbar, type NavbarProps } from './use-navbar'
import { NavBarStylesProvider, NavbarProvider } from './navbar-context'
import { cx } from '@saas-ui/react-utils'

const MotionBox = chakra(motion.nav)

export const Navbar = forwardRef<NavbarProps, 'div'>((props, ref) => {
  const { children, ...otherProps } = props

  const context = useNavbar({ ...otherProps, ref })

  const styles = useMultiStyleConfig('SuiNavbar', props)

  const content = (
    <chakra.header __css={styles.inner} className="sui-navbar__inner">
      {children}
    </chakra.header>
  )

  const containerStyles = {
    top: props.position === 'sticky' ? '0' : undefined,
    insetX: props.position === 'sticky' ? '0' : undefined,
    ...styles.container,
  }

  return (
    <NavBarStylesProvider value={styles}>
      <NavbarProvider value={context}>
        <MotionBox
          __css={containerStyles}
          animate={context.isHidden ? 'hidden' : 'visible'}
          initial={false}
          variants={{
            hidden: { y: '-100%' },
            visible: { y: 0, transition: { ease: 'easeInOut' } },
          }}
          className={cx('sui-navbar', props.className)}
          {...context.getContainerProps(props)}
        >
          {content}
        </MotionBox>
      </NavbarProvider>
    </NavBarStylesProvider>
  )
})

Navbar.displayName = 'Navbar'
