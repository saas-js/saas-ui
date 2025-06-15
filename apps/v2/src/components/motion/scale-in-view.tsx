import { useEffect, useCallback, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface ScaleInViewProps {
  children?: React.ReactNode
}

export default function ScaleInView({ children }: ScaleInViewProps) {
  const ref = useRef<HTMLDivElement | null>()

  const [innerHeight, setInnerHeight] = useState(0)

  const handleResize = useCallback(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    setInnerHeight(window.innerHeight)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const height = (ref.current?.offsetHeight as number) || 0
  const offset = (ref.current?.offsetTop as number) || 0
  const start = offset - innerHeight
  const end = start + height

  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [start, end], [0.8, 1])
  const opacity = useTransform(scrollY, [start, end], [0.25, 1])

  return (
    <motion.div
      ref={(node) => (ref.current = node)}
      style={{
        scale,
        opacity,
      }}
    >
      {children}
    </motion.div>
  )
}
