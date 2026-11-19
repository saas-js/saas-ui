import { createComponent } from "./create-component"

export const ScrollAreaAnatomy = createComponent((props) => {
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
      <rect x={88} y={56} width={224} height={188} rx={8} fill={palette[3]} />
      <rect x={106} y={74} width={170} height={9} rx={4.5} fill={palette[15]} />
      <rect x={106} y={96} width={150} height={9} rx={4.5} fill={palette[5]} />
      <rect x={106} y={118} width={166} height={9} rx={4.5} fill={palette[5]} />
      <rect x={106} y={140} width={130} height={9} rx={4.5} fill={palette[5]} />
      <rect x={106} y={162} width={160} height={9} rx={4.5} fill={palette[5]} />
      <rect x={106} y={184} width={140} height={9} rx={4.5} fill={palette[5]} />
      <rect x={106} y={206} width={166} height={9} rx={4.5} fill={palette[5]} />
      <rect
        x={106}
        y={228}
        width={120}
        height={9}
        rx={4.5}
        opacity={0.5}
        fill={palette[5]}
      />
      <rect x={292} y={66} width={8} height={168} rx={4} fill={palette[2]} />
      <rect x={292} y={92} width={8} height={56} rx={4} fill={palette[15]} />
    </svg>
  )
})
