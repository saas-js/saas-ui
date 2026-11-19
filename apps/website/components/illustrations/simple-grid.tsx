import { createComponent } from "./create-component"

export const SimpleGridAnatomy = createComponent((props) => {
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
        width={261}
        height={160}
        fill={palette[3]}
      />
      <rect x={70} y={70} width={81} height={75} fill={palette[2]} />
      <rect x={160} y={70} width={81} height={75} fill={palette[2]} />
      <rect x={250} y={70} width={81} height={75} fill={palette[2]} />
      <rect x={70} y={155} width={81} height={75} fill={palette[2]} />
      <rect x={160} y={155} width={81} height={75} fill={palette[2]} />
      <rect x={250} y={155} width={81} height={75} fill={palette[2]} />
    </svg>
  )
})
