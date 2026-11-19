import { createComponent } from "./create-component"

export const FloatingPanelAnatomy = createComponent((props) => {
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
      <rect x={83} y={60} width={234} height={180} rx={8} fill={palette[3]} />
      <path
        d="M83 68C83 63.5817 86.5817 60 91 60H309C313.418 60 317 63.5817 317 68V96H83V68Z"
        fill={palette[2]}
      />
      <rect x={101} y={73} width={96} height={10} rx={5} fill={palette[15]} />
      <circle cx={275} cy={78} r={6} fill={palette[15]} />
      <circle cx={297} cy={78} r={6} fill={palette[15]} />
      <rect x={101} y={116} width={198} height={10} rx={5} fill={palette[5]} />
      <rect x={101} y={138} width={170} height={10} rx={5} fill={palette[5]} />
      <rect x={101} y={160} width={186} height={10} rx={5} fill={palette[5]} />
      <path
        d="M309 220L297 232M309 228L305 232"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M180 70L180 94L186 88L190 97L194 95L190 86L198 86Z"
        fill={palette[0]}
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
})
