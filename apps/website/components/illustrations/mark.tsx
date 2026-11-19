import { createComponent } from "./create-component"

export const MarkAnatomy = createComponent((props) => {
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
      <rect x={63} y={100} width={274} height={12} rx={6} fill={palette[2]} />
      <rect x={63} y={128} width={80} height={12} rx={6} fill={palette[2]} />
      <rect x={153} y={120} width={104} height={28} rx={4} fill={palette[3]} />
      <rect x={163} y={128} width={84} height={12} rx={6} fill={palette[15]} />
      <rect x={267} y={128} width={70} height={12} rx={6} fill={palette[2]} />
      <rect x={63} y={156} width={230} height={12} rx={6} fill={palette[2]} />
      <rect x={63} y={184} width={160} height={12} rx={6} fill={palette[2]} />
    </svg>
  )
})
