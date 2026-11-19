import { createComponent } from "./create-component"

export const HoverCardAnatomy = createComponent((props) => {
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
      <rect x={113} y={58} width={174} height={12} rx={6} fill={palette[3]} />
      <rect x={113} y={74} width={174} height={3} rx={1.5} fill={palette[3]} />
      <path
        d="M198.586 92.4142C199.367 91.6332 200.633 91.6332 201.414 92.4142L211 102H189L198.586 92.4142Z"
        fill={palette[3]}
      />
      <rect x={73} y={102} width={254} height={140} rx={8} fill={palette[3]} />
      <circle cx={117} cy={144} r={24} fill={palette[5]} />
      <rect x={155} y={130} width={110} height={12} rx={6} fill={palette[15]} />
      <rect x={155} y={150} width={70} height={9} rx={4.5} fill={palette[2]} />
      <rect x={93} y={188} width={214} height={9} rx={4.5} fill={palette[5]} />
      <rect x={93} y={207} width={160} height={9} rx={4.5} fill={palette[5]} />
      <path
        d="M226 66L226 90L232 84L236 93L240 91L236 82L244 82Z"
        fill={palette[0]}
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
})
