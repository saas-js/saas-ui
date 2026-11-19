import { createComponent } from "./create-component"

export const ContainerAnatomy = createComponent((props) => {
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
        x={53}
        y={70}
        width={294}
        height={160}
        fill={palette[3]}
      />
      <rect x={108} y={70} width={184} height={160} fill={palette[2]} />
      <rect x={126} y={92} width={110} height={12} rx={6} fill={palette[15]} />
      <rect
        x={126}
        y={120}
        width={148}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={126}
        y={138}
        width={128}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={126}
        y={156}
        width={140}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M62 150H100M62 150L68 144M62 150L68 156M100 150L94 144M100 150L94 156"
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M300 150H338M300 150L306 144M300 150L306 156M338 150L332 144M338 150L332 156"
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
