import React, { useEffect, useState, useContext } from 'react'
import MotionBox from './motion/Box'

export const ScrollSpyContext = React.createContext({
  active: undefined,
})

export const useScrollSpy = () => {
  return useContext(ScrollSpyContext)
}

export const useIsActive = (id) => {
  const { active } = useScrollSpy()
  return active && id === active
}

const ScrollSpyProvider = ({ offsetTop = 0, offsetLeft = 0, children }) => {
  const [active, setActive] = useState()

  useEffect(() => {
    const sourceElements = []
    const targetElements = []

    const throttle = (fn, wait = 100) => {
      let timer
      let time = Date.now()

      return (params) => {
        clearTimeout(timer)

        if (time + wait - Date.now() < 0) {
          fn(params)
          time = Date.now()
        } else {
          timer = setTimeout(fn, wait / 5)
        }
      }
    }

    const onScrollHandler = throttle(() => {
      const scrollElement =
        document.scrollingElement || document.documentElement

      const center = {
        x: scrollElement.scrollLeft + window.innerWidth / 2,
        y: scrollElement.scrollTop + window.innerHeight / 2,
      }

      sourceElements.map((source, i) => {
        const target = targetElements[i]

        // const center = {
        //   x: scrollElement.scrollLeft + source.ref.current.offsetLeft,
        //   y: scrollElement.scrollTop + source.ref.current.offsetTop
        // }

        // console.log('source', center.y)

        // console.log('target', target.offsetTop)

        // console.log(target.offsetLeft >= 0,
        //   center.x >= target.offsetLeft,
        //   center.x < target.offsetLeft + target.offsetWidth)

        const visibleHorizontal =
          target.offsetLeft >= 0 &&
          center.x >= target.offsetLeft &&
          center.x < target.offsetLeft + target.offsetWidth

        const visibleVertical =
          target.offsetTop >= 0 &&
          center.y >= target.offsetTop &&
          center.y < target.offsetTop + target.offsetHeight

        if (visibleVertical) {
          setActive(source.props.spy)
        }

        return true
      })
    })

    children.map((el) => {
      const href = el.props && el.props.href
      const spy = el.props && el.props.spy
      const self = el.ref && el.ref.current

      const selector = href || spy

      if (!selector || selector.charAt(0) !== '#') {
        return false
      }

      const targetElement =
        selector === '#' ? document.body : document.querySelector(selector)

      if (targetElement) {
        targetElements.push(targetElement)
        sourceElements.push(el)
      }

      return true
    })

    if (targetElements.length) {
      const ScrollEvent = new Event('scroll')
      window.addEventListener('scroll', onScrollHandler, { passive: true })
      window.dispatchEvent(ScrollEvent)
    }

    return () => {
      window.removeEventListener('scroll', onScrollHandler)
    }
  }, [children, offsetTop, offsetLeft])

  return (
    <ScrollSpyContext.Provider value={{ active }}>
      {children}
    </ScrollSpyContext.Provider>
  )
}

const ScrollSpy = ({ children }) => {
  return (
    <ScrollSpyProvider>
      {React.Children.map(children, (child) => {
        const { spy, ...props } = child.props
        return (
          <Spy spy={spy} ref={React.createRef()}>
            {React.cloneElement(child, { ...props })}
          </Spy>
        )
      })}
    </ScrollSpyProvider>
  )
}

const variants = {
  open: {
    opacity: 1,
    x: 0,
    display: 'block',
  },
  closed: {
    opacity: 0,
    x: '-100%',
    transitionEnd: {
      display: 'none',
    },
  },
}

const Spy = React.forwardRef(({ spy, children }, ref) => {
  const isActive = useIsActive(spy)
  return (
    <MotionBox
      ref={ref}
      position="absolute"
      width="full"
      animate={isActive ? 'open' : 'closed'}
      variants={variants}
    >
      {children}
    </MotionBox>
  )
})

Spy.displayName = 'Spy'

export default ScrollSpy
