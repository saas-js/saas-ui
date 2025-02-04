import { Box } from '@saas-ui/panda-preset/jsx'

export const BackgroundGradient = () => {
  const fallbackBackground =
    'radial-gradient(at 40% 45%, #4f1d9e 10%, transparent 30%),radial-gradient(at 60% 60%, #2ab4d9 0%, transparent 40%),radial-gradient(at 30% 60%, {colors.cyan.500} 0%, transparent 30%),radial-gradient(at 70% 70%, #1d979e 0%, transparent 10%),radial-gradient(at 60% 70%, #4f1d9e 0%, transparent 30%)'

  return (
    <Box
      backgroundImage={fallbackBackground}
      backgroundBlendMode="saturation"
      position="absolute"
      top="-1000px"
      left="0"
      zIndex="0"
      opacity={{
        base: 0.3,
        md: 0.5,
      }}
      height="1500px"
      width="100%"
      overflow="hidden"
      pointerEvents="none"
      transform="translate3d(0, 0, 0)"
      filter="blur(240px)"
    />
  )
}
