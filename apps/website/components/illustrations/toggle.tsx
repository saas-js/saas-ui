import { createComponent } from "./create-component"

export const ToggleAnatomy = createComponent((props) => {
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
      <rect x={96} y={115} width={70} height={70} rx={8} fill={palette[3]} />
      <path
        d="M120 133H134C139.523 133 144 137.477 144 143C144 146 142.5 148.5 140.5 150C143.5 151.5 146 154.5 146 158.5C146 164 141.5 168 136 168H120V133Z"
        stroke={palette[15]}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path d="M120 150H136" stroke={palette[15]} strokeWidth={5} />
      <rect
        x={167}
        y={117}
        width={66}
        height={66}
        rx={7}
        stroke={palette[2]}
        strokeWidth={4}
      />
      <path
        d="M207 135H193M200 135L196 165M207 165H189"
        stroke={palette[2]}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect
        x={236}
        y={117}
        width={66}
        height={66}
        rx={7}
        stroke={palette[2]}
        strokeWidth={4}
      />
      <path
        d="M256 133V151C256 158.732 261.373 164 269 164C276.627 164 282 158.732 282 151V133"
        stroke={palette[2]}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d="M254 170H284"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
