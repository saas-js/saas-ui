import { chakra, HTMLChakraProps, keyframes } from '@chakra-ui/react'

const dash = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -220%;
  }

`

interface LogoGlyph extends HTMLChakraProps<'svg'> {
  isAnimating?: boolean
}

const LogoGlyph: React.FC<LogoGlyph> = (props) => {
  const { isAnimating, ...rest } = props
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 91.08 91.08"
      {...rest}
    >
      <defs>
        <linearGradient
          id="saas-ui-logo-gradient"
          y1="45.54"
          x2="91.08"
          y2="45.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6052a3" />
          <stop offset=".55" stopColor="#5165af" />
          <stop offset="1" stopColor="#52a1d8" />
        </linearGradient>
      </defs>
      <path
        fill="currentColor"
        d="M22.61 62.24q-4.76-4.78-4.75-13.69V25.41h7.62v22.85q0 12.07 10.43 12.07t10.37-12.07V25.41h7.5v23.14q0 8.91-4.71 13.69t-13.22 4.77q-8.49 0-13.24-4.77ZM64.45 25.41h7.61v41h-7.61Z"
      />
      <chakra.rect
        x="2"
        y="2"
        width="87px"
        height="87px"
        rx="12"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="4"
        strokeDasharray={isAnimating ? '100' : '0'}
        stroke="url(#saas-ui-logo-gradient)"
        animation={isAnimating ? `${dash} 1s infinite linear` : ''}
      />
    </chakra.svg>
  )
}

export default LogoGlyph
