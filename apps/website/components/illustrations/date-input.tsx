import { createComponent } from "./create-component"

export const DateInputAnatomy = createComponent((props) => {
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
      <rect x={71} y={141} width={34} height={18} rx={4} fill={palette[2]} />
      <rect
        x={77}
        y={145.5}
        width={22}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M115 158L121 142"
        stroke={palette[7]}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect
        x={131}
        y={145.5}
        width={22}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <path
        d="M163 158L169 142"
        stroke={palette[7]}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect
        x={179}
        y={145.5}
        width={44}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <rect
        x={313}
        y={139}
        width={22}
        height={22}
        rx={4}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <path d="M313 147H335" stroke={palette[15]} strokeWidth={3} />
      <path
        d="M319 135V141M329 135V141"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
})
