import { createComponent } from "./create-component"

export const BleedAnatomy = createComponent((props) => {
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
        opacity={0.34}
        x={110}
        y={60}
        width={180}
        height={180}
        fill={palette[3]}
      />
      <rect x={130} y={80} width={140} height={9} rx={4.5} fill={palette[2]} />
      <rect x={130} y={98} width={110} height={9} rx={4.5} fill={palette[2]} />
      <rect x={70} y={124} width={260} height={56} fill={palette[2]} />
      <rect x={130} y={196} width={140} height={9} rx={4.5} fill={palette[2]} />
      <rect x={130} y={214} width={90} height={9} rx={4.5} fill={palette[2]} />
      <line
        x1={110}
        y1={60}
        x2={110}
        y2={240}
        stroke={palette[3]}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={290}
        y1={60}
        x2={290}
        y2={240}
        stroke={palette[3]}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <path
        d="M78 152H102M78 152L84 146M78 152L84 158"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M322 152H298M322 152L316 146M322 152L316 158"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
