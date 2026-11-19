import { createComponent } from "./create-component"

export const PresenceAnatomy = createComponent((props) => {
  const { palette, ...rest } = props
  return (
    <svg
      width={400}
      height={300}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x={63} y={110} width={80} height={80} rx={8} fill={palette[3]} />
      <rect
        x={160}
        y={110}
        width={80}
        height={80}
        rx={8}
        fill={palette[3]}
        opacity={0.55}
      />
      <rect
        x={257}
        y={110}
        width={80}
        height={80}
        rx={8}
        fill={palette[3]}
        opacity={0.2}
      />
      <rect
        x={257}
        y={110}
        width={80}
        height={80}
        rx={8}
        stroke={palette[3]}
        strokeWidth={4}
        strokeDasharray="8 8"
      />
      <path
        d="M143 220H337M325 210L337 220L325 230"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
