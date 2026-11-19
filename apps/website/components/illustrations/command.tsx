import { createComponent } from "./create-component"

export const CommandAnatomy = createComponent((props) => {
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
      <rect x={53} y={52} width={294} height={196} rx={8} fill={palette[3]} />
      <circle cx={75} cy={77} r={6} stroke={palette[15]} strokeWidth={2} />
      <path
        d="M79.5 81.5L84 86"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect x={95} y={72.5} width={110} height={9} rx={4.5} fill={palette[7]} />
      <rect x={53} y={100} width={294} height={1} fill={palette[2]} />
      <rect x={69} y={114} width={50} height={7} rx={3.5} fill={palette[2]} />
      <rect x={61} y={128} width={278} height={30} rx={4} fill={palette[8]} />
      <rect x={71} y={136} width={14} height={14} rx={3} fill={palette[15]} />
      <rect
        x={95}
        y={138.5}
        width={110}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect x={293} y={135} width={18} height={16} rx={3} fill={palette[2]} />
      <rect x={315} y={135} width={16} height={16} rx={3} fill={palette[2]} />
      <rect x={71} y={166} width={14} height={14} rx={3} fill={palette[2]} />
      <rect
        x={95}
        y={168.5}
        width={140}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect x={293} y={165} width={18} height={16} rx={3} fill={palette[2]} />
      <rect x={315} y={165} width={16} height={16} rx={3} fill={palette[2]} />
      <rect x={69} y={196} width={60} height={7} rx={3.5} fill={palette[2]} />
      <rect x={71} y={214} width={14} height={14} rx={3} fill={palette[2]} />
      <rect
        x={95}
        y={216.5}
        width={90}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
    </svg>
  )
})
