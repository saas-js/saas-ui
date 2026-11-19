import { createComponent } from "./create-component"

export const PersonaAnatomy = createComponent((props) => {
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
      <rect x={90} y={113} width={74} height={74} rx={37} fill={palette[3]} />
      <path
        d="M150.6 175.1C144.9 180.8 136.9 184.3 128 184.3C119.1 184.3 111.1 180.7 105.3 174.9V171.1C105.3 166.2 109.4 162.3 114.4 162.3H141.6C146.6 162.3 150.6 166.2 150.6 171.1V175.1Z"
        fill={palette[15]}
      />
      <circle cx={128} cy={140} r={13.5} fill={palette[15]} />
      <circle cx={155} cy={178} r={9} fill={palette[15]} />
      <circle cx={155} cy={178} r={6} fill={palette[2]} />
      <rect x={180} y={130} width={130} height={14} rx={7} fill={palette[3]} />
      <rect x={180} y={156} width={90} height={10} rx={5} fill={palette[2]} />
    </svg>
  )
})
