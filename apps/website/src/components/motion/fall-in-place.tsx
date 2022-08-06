import MotionBox, { MotionBoxProps } from './box'
import React from 'react'
import { useInView, IntersectionOptions } from 'react-intersection-observer'

export const FallInPlace = ({
  children,
  delay = 0.2,
  translateY = '20px',
  initialInView,
  onChange,
  ...rest
}: MotionBoxProps & {
  delay?: number
  initialInView?: boolean
  translateY?: string
  onChange?: IntersectionOptions['onChange']
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    initialInView,
    onChange,
  })

  return (
    <MotionBox
      ref={ref}
      initial={{ scale: 1, opacity: 0, translateY }}
      animate={inView && { scale: 1, opacity: 1, translateY: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 2,
        delay: initialInView ? delay : 0,
      }}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
