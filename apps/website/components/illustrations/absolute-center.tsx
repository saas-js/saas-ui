import { createComponent } from "./create-component"

export const AbsoluteCenterAnatomy = createComponent((props) => {
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
        x={70}
        y={70}
        width={260}
        height={160}
        fill={palette[3]}
      />
      <line
        x1={200}
        y1={70}
        x2={200}
        y2={230}
        stroke={palette[3]}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={70}
        y1={150}
        x2={330}
        y2={150}
        stroke={palette[3]}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <rect x={160} y={125} width={80} height={50} fill={palette[2]} />
      <circle cx={200} cy={150} r={4} fill={palette[15]} />
    </svg>
  )
})
