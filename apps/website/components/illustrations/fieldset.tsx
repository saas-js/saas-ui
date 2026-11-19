import { createComponent } from "./create-component"

export const FieldsetAnatomy = createComponent((props) => {
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
        x={55}
        y={66}
        width={290}
        height={176}
        rx={8}
        stroke={palette[2]}
        strokeWidth={4}
      />
      <rect x={75} y={60} width={100} height={12} rx={6} fill={palette[3]} />
      <rect x={77} y={92} width={80} height={9} rx={4.5} fill={palette[3]} />
      <rect x={77} y={108} width={246} height={38} rx={6} fill={palette[3]} />
      <rect
        x={93}
        y={122.5}
        width={100}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <rect x={77} y={162} width={80} height={9} rx={4.5} fill={palette[3]} />
      <rect x={77} y={178} width={246} height={38} rx={6} fill={palette[3]} />
      <rect
        x={93}
        y={192.5}
        width={130}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
    </svg>
  )
})
