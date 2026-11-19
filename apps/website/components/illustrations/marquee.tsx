import { createComponent } from "./create-component"

export const MarqueeAnatomy = createComponent((props) => {
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
      <rect x={53} y={115} width={294} height={70} rx={6} fill={palette[2]} />
      <rect
        x={53}
        y={127}
        width={36}
        height={46}
        rx={6}
        fill={palette[3]}
        opacity={0.3}
      />
      <rect
        x={101}
        y={127}
        width={60}
        height={46}
        rx={6}
        fill={palette[3]}
        opacity={0.8}
      />
      <circle cx={131} cy={150} r={10} fill={palette[15]} />
      <rect x={173} y={127} width={60} height={46} rx={6} fill={palette[3]} />
      <rect x={193} y={140} width={20} height={20} rx={4} fill={palette[15]} />
      <rect
        x={245}
        y={127}
        width={60}
        height={46}
        rx={6}
        fill={palette[3]}
        opacity={0.8}
      />
      <path d="M275 139L286 160H264L275 139Z" fill={palette[15]} />
      <rect
        x={317}
        y={127}
        width={30}
        height={46}
        rx={6}
        fill={palette[3]}
        opacity={0.3}
      />
      <path
        d="M180 210H220M220 210L212 203M220 210L212 217"
        stroke={palette[3]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
