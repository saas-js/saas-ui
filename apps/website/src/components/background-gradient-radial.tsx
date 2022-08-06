import {
  Box,
  useTheme,
  useColorModeValue,
  AspectRatio,
  keyframes,
} from '@chakra-ui/react'

import { useInView } from 'react-intersection-observer'

const glow = keyframes`
0% {
    opacity: 0;
    transform: scale(0.2);
    animation-timing-function: cubic-bezier(.74,.25,.76,1);
}
10% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(.12,.01,.08,.99);
}
100% {
    transform: scale(1);
    opacity: 0.8;
}`

export const BackgroundGradientRadial = ({
  animate,
  hideOverlay,
  ...props
}: any) => {
  const theme = useTheme()

  const colors = [
    theme.colors.primary['800'],
    theme.colors.secondary['500'],
    theme.colors.cyan['500'],
    theme.colors.teal['500'],
  ]

  let gradient = `radial-gradient(at 40% 45%, ${colors[0]} 10%, transparent 30%), radial-gradient(at 60% 60%, ${colors[1]} 0%, transparent 40%), radial-gradient(at 30% 60%, var(--chakra-colors-cyan-500) 0%, transparent 30%), radial-gradient(at 70% 70%, ${colors[3]} 0%, transparent 10%),  radial-gradient(at 60% 70%, ${colors[0]} 0%, transparent 30%)`

  return (
    <Box
      position="absolute"
      left="0"
      width="100%"
      zIndex="1"
      opacity="0"
      animation={animate && `${glow} 4s ease-out 0.2s`}
      sx={{ animationFillMode: 'forwards' }}
      {...props}
    >
      <AspectRatio
        ratio={1}
        width="100%"
        margin="0 auto"
        maxW="container.2xl"
        left="0"
      >
        <Box
          backgroundImage={gradient}
          backgroundBlendMode="saturation"
          opacity={useColorModeValue('1', '0.5')}
          overflow="hidden"
          pointerEvents="none"
          objectFit="cover"
          filter="blur(160px)"
        />
      </AspectRatio>
    </Box>
  )
}
