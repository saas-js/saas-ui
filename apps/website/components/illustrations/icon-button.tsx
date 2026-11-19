import { createComponent } from "./create-component"

export const IconButtonAnatomy = createComponent((props) => {
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
      <rect x={86} y={118} width={64} height={64} rx={8} fill={palette[3]} />
      <path
        d="M118 136V164M104 150H132"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={168} y={118} width={64} height={64} rx={8} fill={palette[2]} />
      <path
        d="M187 150C187 150 192 139 200 139C208 139 213 150 213 150C213 150 208 161 200 161C192 161 187 150 187 150Z"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle cx={200} cy={150} r={4} fill={palette[15]} />
      <rect
        x={251.5}
        y={119.5}
        width={61}
        height={61}
        rx={6.5}
        stroke={palette[3]}
        strokeWidth={3}
      />
      <path
        d="M270 140L294 160M294 140L270 160"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
