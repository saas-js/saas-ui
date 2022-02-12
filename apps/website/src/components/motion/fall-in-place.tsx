import MotionBox, { MotionBoxProps } from './box'
import React from 'react'

export const FallInPlace = ({ children, ...rest }: MotionBoxProps) => {
  return (
    <MotionBox
      initial={{ scale: 1, opacity: 0, translateY: '20px' }}
      animate={{ scale: 1, opacity: 1, translateY: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 2,
        delay: 0.2,
      }}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
