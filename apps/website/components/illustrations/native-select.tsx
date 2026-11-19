import { createComponent } from "./create-component"

export const NativeSelectAnatomy = createComponent((props) => {
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
      <rect x={53} y={127} width={294} height={46} rx={6} fill={palette[3]} />
      <rect
        x={71}
        y={145.5}
        width={130}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <path
        d="M318 145L325 152L332 145"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
