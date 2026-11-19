import { createComponent } from "./create-component"

export const LinkOverlayAnatomy = createComponent((props) => {
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
      <rect
        x={83}
        y={64}
        width={234}
        height={172}
        rx={8}
        fill={palette[3]}
        stroke={palette[2]}
        strokeWidth={6}
        strokeDasharray="12 10"
      />
      <rect x={103} y={84} width={194} height={60} rx={4} fill={palette[7]} />
      <rect x={103} y={162} width={120} height={12} rx={6} fill={palette[15]} />
      <rect
        x={103}
        y={178}
        width={120}
        height={3}
        rx={1.5}
        fill={palette[15]}
      />
      <rect x={103} y={194} width={180} height={9} rx={4.5} fill={palette[5]} />
      <rect x={103} y={210} width={140} height={9} rx={4.5} fill={palette[5]} />
      <path
        d="M262 180L262 204L268 198L272 207L276 205L272 196L280 196Z"
        fill={palette[0]}
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
})
