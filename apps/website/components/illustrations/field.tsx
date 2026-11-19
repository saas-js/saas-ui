import { createComponent } from "./create-component"

export const FieldAnatomy = createComponent((props) => {
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
      <rect x={53} y={88} width={96} height={10} rx={5} fill={palette[3]} />
      <circle cx={159} cy={93} r={4} fill={palette[3]} />
      <rect x={53} y={112} width={294} height={46} rx={6} fill={palette[3]} />
      <rect
        x={71}
        y={130.5}
        width={130}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <rect x={53} y={172} width={208} height={8} rx={4} fill={palette[2]} />
      <rect x={53} y={192} width={140} height={8} rx={4} fill={palette[7]} />
    </svg>
  )
})
