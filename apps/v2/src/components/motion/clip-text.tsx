import { useScroll, useTransform } from 'framer-motion'
import MotionBox from './box'

export interface ClipTextProps {
  children: React.ReactChild
  bg?: string
  bgGradient?: string
  bgImg?: string
  bgSize?: string
  animate?: boolean
}

const ClipText = ({
  children,
  bg,
  bgGradient,
  bgImg,
  bgSize = 'cover',
  animate,
}: ClipTextProps) => {
  let style

  const { scrollYProgress } = useScroll()
  const pos = useTransform(scrollYProgress, [0, 0.1], ['0%', '100%'])

  if (animate) {
    style = {
      backgroundPositionY: pos,
      transition: 'all .2s ease-out',
    }
  }

  return (
    <MotionBox
      as="span"
      backgroundClip="text"
      bg={bg}
      bgGradient={bgGradient}
      bgImg={bgImg}
      bgSize={bgSize}
      style={style}
    >
      {children}
    </MotionBox>
  )
}

export default ClipText
