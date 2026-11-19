import { createComponent } from "./create-component"

export const AsideAnatomy = createComponent((props) => {
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
      <rect x={53} y={50} width={294} height={200} rx={8} fill={palette[2]} />
      <rect x={247} y={50} width={100} height={200} fill={palette[3]} />
      <rect x={261} y={68} width={60} height={12} rx={6} fill={palette[15]} />
      <rect x={261} y={96} width={72} height={9} rx={4.5} fill={palette[5]} />
      <rect x={261} y={114} width={72} height={9} rx={4.5} fill={palette[5]} />
      <rect x={261} y={132} width={52} height={9} rx={4.5} fill={palette[5]} />
      <rect x={261} y={214} width={72} height={22} rx={4} fill={palette[15]} />
      <rect x={71} y={68} width={150} height={12} rx={6} fill={palette[15]} />
      <rect x={71} y={96} width={158} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={114} width={130} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={132} width={144} height={9} rx={4.5} fill={palette[7]} />
    </svg>
  )
})
