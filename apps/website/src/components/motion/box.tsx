import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { motion, HTMLMotionProps } from 'framer-motion'

import { Merge } from '../../types/merge'

export type MotionBoxProps = Merge<
  HTMLChakraProps<'div'>,
  HTMLMotionProps<'div'>
>

const MotionBox = chakra(motion.div)

export default MotionBox
