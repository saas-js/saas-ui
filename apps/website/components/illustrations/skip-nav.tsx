import { createComponent } from "./create-component"

export const SkipNavAnatomy = createComponent((props) => {
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
      <rect x={53} y={110} width={294} height={140} rx={6} fill={palette[2]} />
      <rect x={53} y={110} width={294} height={36} fill={palette[5]} />
      <rect x={71} y={123} width={40} height={10} rx={5} fill={palette[15]} />
      <rect x={125} y={123} width={40} height={10} rx={5} fill={palette[15]} />
      <rect x={179} y={123} width={40} height={10} rx={5} fill={palette[15]} />
      <rect x={71} y={166} width={160} height={12} rx={6} fill={palette[3]} />
      <rect x={71} y={190} width={240} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={208} width={200} height={9} rx={4.5} fill={palette[7]} />
      <rect
        x={67}
        y={56}
        width={122}
        height={44}
        rx={8}
        stroke={palette[8]}
        strokeWidth={4}
      />
      <rect x={73} y={62} width={110} height={32} rx={4} fill={palette[3]} />
      <rect x={89} y={73} width={60} height={10} rx={5} fill={palette[15]} />
      <path
        d="M161 72L167 78L161 84"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
