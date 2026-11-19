import { createComponent } from "./create-component"

export const CheckmarkAnatomy = createComponent((props) => {
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
      <rect x={84} y={126} width={48} height={48} rx={8} fill={palette[3]} />
      <path
        d="M96 151L104.5 159.5L121 141"
        stroke={palette[15]}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={176} y={126} width={48} height={48} rx={8} fill={palette[3]} />
      <path
        d="M188 150H212"
        stroke={palette[15]}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect
        x={270}
        y={128}
        width={44}
        height={44}
        rx={7}
        stroke={palette[8]}
        strokeWidth={4}
      />
    </svg>
  )
})
