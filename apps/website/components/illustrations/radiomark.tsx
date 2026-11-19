import { createComponent } from "./create-component"

export const RadiomarkAnatomy = createComponent((props) => {
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
      <circle cx={108} cy={150} r={24} fill={palette[3]} />
      <circle cx={108} cy={150} r={9} fill={palette[15]} />
      <circle cx={200} cy={150} r={22} stroke={palette[8]} strokeWidth={4} />
      <circle cx={292} cy={150} r={24} fill={palette[2]} />
      <circle cx={292} cy={150} r={9} fill={palette[7]} />
    </svg>
  )
})
