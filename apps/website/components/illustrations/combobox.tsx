import { createComponent } from "./create-component"

export const ComboboxAnatomy = createComponent((props) => {
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
      <rect x={53} y={56} width={294} height={45} rx={6} fill={palette[3]} />
      <rect x={71} y={74} width={60} height={9} rx={4.5} fill={palette[15]} />
      <rect x={136} y={68} width={2} height={21} rx={1} fill={palette[15]} />
      <path
        d="M318 75L325 82L332 75"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={53} y={111} width={294} height={136} rx={6} fill={palette[3]} />
      <rect x={53} y={158} width={294} height={42} fill={palette[5]} />
      <rect x={71} y={129} width={60} height={9} rx={4.5} fill={palette[15]} />
      <rect x={131} y={129} width={80} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={174} width={60} height={9} rx={4.5} fill={palette[15]} />
      <rect x={131} y={174} width={120} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={220} width={60} height={9} rx={4.5} fill={palette[15]} />
      <rect x={131} y={220} width={60} height={9} rx={4.5} fill={palette[7]} />
    </svg>
  )
})
