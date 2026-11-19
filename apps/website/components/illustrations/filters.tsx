import { createComponent } from "./create-component"

export const FiltersAnatomy = createComponent((props) => {
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
      <rect x={53} y={90} width={128} height={36} rx={6} fill={palette[3]} />
      <rect x={67} y={103.5} width={40} height={9} rx={4.5} fill={palette[7]} />
      <rect
        x={113}
        y={103.5}
        width={44}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M164 103L172 111M172 103L164 111"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect x={189} y={90} width={118} height={36} rx={6} fill={palette[3]} />
      <rect
        x={203}
        y={103.5}
        width={34}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <rect
        x={243}
        y={103.5}
        width={40}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M290 103L298 111M298 103L290 111"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect x={315} y={90} width={36} height={36} rx={6} fill={palette[2]} />
      <path
        d="M333 100V116M325 108H341"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect x={53} y={140} width={294} height={110} rx={6} fill={palette[2]} />
      <rect x={67} y={156} width={120} height={9} rx={4.5} fill={palette[15]} />
      <rect x={53} y={176} width={294} height={1} fill={palette[5]} />
      <rect x={67} y={188} width={220} height={9} rx={4.5} fill={palette[7]} />
      <rect x={53} y={208} width={294} height={1} fill={palette[5]} />
      <rect x={67} y={220} width={170} height={9} rx={4.5} fill={palette[7]} />
    </svg>
  )
})
