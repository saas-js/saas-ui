import { useRef } from 'react'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

export interface ScaleInViewProps {
  children?: React.ReactNode
}

export default function ScaleInView({ children }: ScaleInViewProps) {
  const ref = useRef<HTMLDivElement | null>()

  let innerHeight = 0
  if (typeof window !== 'undefined') {
    innerHeight = window.innerHeight
  }

  const height = ref.current?.offsetHeight as number
  const start = (ref.current?.offsetTop as number) - innerHeight
  const end = start + height

  const { scrollY } = useViewportScroll()
  const scale = useTransform(scrollY, [start, end], [0.8, 1]) || 1
  const opacity = useTransform(scrollY, [start, end], [0.25, 1]) || 1

  return (
    <motion.div
      ref={(node) => (ref.current = node)}
      style={{
        scale,
        opacity,
        // transition: 'all .2s ease-out'
      }}
    >
      {children}
    </motion.div>
  )
}
