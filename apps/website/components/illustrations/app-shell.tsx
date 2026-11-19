import { createComponent } from "./create-component"

export const AppShellAnatomy = createComponent((props) => {
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
      <rect x={53} y={50} width={294} height={200} rx={8} fill={palette[2]} />
      <rect x={53} y={50} width={294} height={36} fill={palette[3]} />
      <rect x={69} y={63} width={48} height={10} rx={5} fill={palette[15]} />
      <circle cx={327} cy={68} r={9} fill={palette[15]} />
      <rect x={53} y={86} width={80} height={164} fill={palette[5]} />
      <rect x={65} y={102} width={56} height={9} rx={4.5} fill={palette[15]} />
      <rect x={65} y={124} width={56} height={9} rx={4.5} fill={palette[3]} />
      <rect x={65} y={146} width={44} height={9} rx={4.5} fill={palette[3]} />
      <rect x={65} y={168} width={50} height={9} rx={4.5} fill={palette[3]} />
      <rect x={149} y={102} width={182} height={12} rx={6} fill={palette[15]} />
      <rect x={149} y={128} width={182} height={106} rx={6} fill={palette[7]} />
    </svg>
  )
})
