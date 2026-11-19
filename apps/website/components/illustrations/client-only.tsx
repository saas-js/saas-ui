import { createComponent } from "./create-component"

export const ClientOnlyAnatomy = createComponent((props) => {
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
      <rect x={63} y={60} width={274} height={180} rx={8} fill={palette[3]} />
      <circle cx={83} cy={78} r={5} fill={palette[15]} />
      <circle cx={99} cy={78} r={5} fill={palette[15]} />
      <circle cx={115} cy={78} r={5} fill={palette[15]} />
      <rect x={135} y={72} width={180} height={12} rx={6} fill={palette[2]} />
      <rect x={75} y={96} width={250} height={132} rx={4} fill={palette[2]} />
      <rect x={91} y={114} width={100} height={96} rx={4} fill={palette[5]} />
      <rect x={207} y={114} width={100} height={12} rx={6} fill={palette[15]} />
      <rect x={207} y={136} width={80} height={9} rx={4.5} fill={palette[7]} />
      <rect x={207} y={154} width={90} height={9} rx={4.5} fill={palette[7]} />
      <rect x={207} y={186} width={60} height={24} rx={4} fill={palette[3]} />
    </svg>
  )
})
