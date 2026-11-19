import { createComponent } from "./create-component"

export const EmAnatomy = createComponent((props) => {
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
      <rect x={63} y={100} width={274} height={12} rx={6} fill={palette[2]} />
      <rect x={63} y={128} width={90} height={12} rx={6} fill={palette[2]} />
      <path d="M173 128H253L246 140H166L173 128Z" fill={palette[3]} />
      <rect x={267} y={128} width={70} height={12} rx={6} fill={palette[2]} />
      <rect x={63} y={156} width={230} height={12} rx={6} fill={palette[2]} />
      <path
        d="M189 182L211 182M210 214L188 214M206 182L192 214"
        stroke={palette[3]}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  )
})
