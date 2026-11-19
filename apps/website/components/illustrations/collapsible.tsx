import { createComponent } from "./create-component"

export const CollapsibleAnatomy = createComponent((props) => {
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
      <rect x={53} y={70} width={294} height={45} rx={6} fill={palette[3]} />
      <rect x={71} y={88} width={130} height={9} rx={4.5} fill={palette[15]} />
      <path
        d="M318 88L324 94L330 88"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={53} y={125} width={294} height={105} rx={6} fill={palette[2]} />
      <rect x={71} y={145} width={240} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={167} width={256} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={189} width={190} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={211} width={120} height={9} rx={4.5} fill={palette[7]} />
    </svg>
  )
})
