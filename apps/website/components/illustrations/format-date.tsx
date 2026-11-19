import { createComponent } from "./create-component"

export const FormatDateAnatomy = createComponent((props) => {
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
      <rect x={73} y={92} width={110} height={116} rx={8} fill={palette[3]} />
      <path
        d="M73 100C73 95.5817 76.5817 92 81 92H175C179.418 92 183 95.5817 183 100V122H73V100Z"
        fill={palette[2]}
      />
      <rect x={97} y={80} width={8} height={24} rx={4} fill={palette[3]} />
      <rect x={151} y={80} width={8} height={24} rx={4} fill={palette[3]} />
      <rect x={93} y={138} width={16} height={14} rx={2} fill={palette[15]} />
      <rect x={120} y={138} width={16} height={14} rx={2} fill={palette[5]} />
      <rect x={147} y={138} width={16} height={14} rx={2} fill={palette[5]} />
      <rect x={93} y={166} width={16} height={14} rx={2} fill={palette[5]} />
      <rect x={120} y={166} width={16} height={14} rx={2} fill={palette[5]} />
      <rect x={147} y={166} width={16} height={14} rx={2} fill={palette[5]} />
      <rect x={207} y={118} width={36} height={14} rx={7} fill={palette[3]} />
      <rect x={251} y={118} width={70} height={14} rx={7} fill={palette[2]} />
      <rect x={207} y={144} width={114} height={14} rx={7} fill={palette[2]} />
      <rect x={207} y={170} width={80} height={14} rx={7} fill={palette[5]} />
    </svg>
  )
})
