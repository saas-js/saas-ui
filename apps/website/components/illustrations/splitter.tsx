import { createComponent } from "./create-component"

export const SplitterAnatomy = createComponent((props) => {
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
      <rect x={53} y={56} width={140} height={188} rx={8} fill={palette[3]} />
      <rect x={207} y={56} width={140} height={188} rx={8} fill={palette[2]} />
      <rect x={71} y={76} width={90} height={10} rx={5} fill={palette[15]} />
      <rect x={71} y={100} width={104} height={9} rx={4.5} fill={palette[5]} />
      <rect x={71} y={118} width={80} height={9} rx={4.5} fill={palette[5]} />
      <rect x={225} y={76} width={90} height={10} rx={5} fill={palette[3]} />
      <rect x={225} y={100} width={104} height={9} rx={4.5} fill={palette[7]} />
      <rect x={225} y={118} width={80} height={9} rx={4.5} fill={palette[7]} />
      <rect x={194} y={124} width={12} height={52} rx={6} fill={palette[3]} />
      <circle cx={200} cy={138} r={2} fill={palette[15]} />
      <circle cx={200} cy={150} r={2} fill={palette[15]} />
      <circle cx={200} cy={162} r={2} fill={palette[15]} />
    </svg>
  )
})
