import { createComponent } from "./create-component"

export const DatePickerAnatomy = createComponent((props) => {
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
      <rect x={53} y={56} width={170} height={42} rx={6} fill={palette[3]} />
      <rect x={69} y={72.5} width={96} height={9} rx={4.5} fill={palette[7]} />
      <rect
        x={194}
        y={67}
        width={18}
        height={18}
        rx={3}
        stroke={palette[15]}
        strokeWidth={2.5}
      />
      <path d="M194 73.5H212" stroke={palette[15]} strokeWidth={2.5} />
      <rect x={120} y={108} width={226} height={142} rx={6} fill={palette[3]} />
      <rect x={136} y={120} width={90} height={10} rx={5} fill={palette[15]} />
      <path
        d="M310 120L305 125L310 130M322 120L327 125L322 130"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={139} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={167} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={223} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={251} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={279} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={307} y={146} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={139} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={167} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={218} y={163} width={24} height={22} rx={4} fill={palette[15]} />
      <rect x={223} y={170} width={14} height={8} rx={4} fill={palette[3]} />
      <rect x={251} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={279} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={307} y={170} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={139} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={167} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={223} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={251} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={279} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={307} y={194} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={139} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={167} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={223} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={251} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={279} y={218} width={14} height={8} rx={4} fill={palette[15]} />
      <rect x={307} y={218} width={14} height={8} rx={4} fill={palette[15]} />
    </svg>
  )
})
