import { Box } from '@chakra-ui/react'
import Image from 'next/image'

const sizes = {
  sm: { box: '10', font: 'md', px: 40 },
  md: { box: { base: '14', md: '16' }, font: { base: 'lg', md: 'xl' }, px: 64 },
} as const

export function PackageMark({
  mark,
  logo,
  logoFramed,
  name,
  size = 'md',
}: {
  mark: string
  logo?: string
  logoFramed?: boolean
  name: string
  size?: keyof typeof sizes
}) {
  const { box, font, px } = sizes[size]

  if (logo) {
    return (
      <Box
        flexShrink="0"
        boxSize={box}
        aspectRatio="1 / 1"
        display="grid"
        placeItems="center"
        overflow="hidden"
        p={logoFramed ? (size === 'sm' ? '1.5' : '2') : undefined}
        borderRadius={logoFramed ? 'lg' : undefined}
        borderWidth={logoFramed ? '1px' : undefined}
        borderColor={logoFramed ? 'border' : undefined}
        bg={logoFramed ? 'bg' : undefined}
        boxShadow={logoFramed ? 'xs' : undefined}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={px}
          height={px}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    )
  }

  return (
    <Box
      flexShrink="0"
      boxSize={box}
      aspectRatio="1 / 1"
      display="grid"
      placeItems="center"
      borderRadius="lg"
      bg="bg"
      color="fg"
      borderWidth="1px"
      borderColor="border"
      boxShadow="xs"
      fontFamily="mono"
      fontWeight="medium"
      fontSize={font}
      letterSpacing="-0.04em"
      aria-hidden="true"
    >
      {mark}
    </Box>
  )
}
