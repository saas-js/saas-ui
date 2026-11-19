import { createComponent } from "./create-component"

export const ListboxAnatomy = createComponent((props) => {
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
      <rect x={88} y={62} width={224} height={176} rx={6} fill={palette[3]} />
      <rect x={96} y={112} width={208} height={36} rx={4} fill={palette[2]} />
      <rect
        x={110}
        y={83.5}
        width={120}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={110}
        y={125.5}
        width={140}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M276 130L281 135L290 125"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={110}
        y={165.5}
        width={96}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={110}
        y={205.5}
        width={130}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
    </svg>
  )
})
