import { createComponent } from "./create-component"

export const EnvironmentProviderAnatomy = createComponent((props) => {
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
      <rect x={63} y={60} width={274} height={180} rx={8} fill={palette[2]} />
      <rect x={81} y={76} width={90} height={10} rx={5} fill={palette[15]} />
      <rect x={81} y={102} width={238} height={122} rx={6} fill={palette[3]} />
      <rect x={99} y={118} width={70} height={10} rx={5} fill={palette[15]} />
      <rect
        x={99}
        y={142}
        width={202}
        height={66}
        rx={4}
        stroke={palette[15]}
        strokeWidth={4}
        strokeDasharray="10 8"
      />
      <rect x={117} y={160} width={110} height={10} rx={5} fill={palette[5]} />
      <rect x={117} y={180} width={80} height={10} rx={5} fill={palette[5]} />
    </svg>
  )
})
