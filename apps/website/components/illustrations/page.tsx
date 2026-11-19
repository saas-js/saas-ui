import { createComponent } from "./create-component"

export const PageAnatomy = createComponent((props) => {
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
      <rect x={53} y={50} width={294} height={200} rx={8} fill={palette[3]} />
      <rect x={53} y={50} width={294} height={56} fill={palette[2]} />
      <rect x={73} y={66} width={130} height={14} rx={7} fill={palette[15]} />
      <rect x={73} y={88} width={90} height={7} rx={3.5} fill={palette[7]} />
      <rect x={267} y={65} width={60} height={26} rx={4} fill={palette[15]} />
      <rect x={73} y={124} width={254} height={9} rx={4.5} fill={palette[5]} />
      <rect x={73} y={144} width={224} height={9} rx={4.5} fill={palette[5]} />
      <rect x={73} y={164} width={240} height={9} rx={4.5} fill={palette[5]} />
      <rect x={73} y={184} width={160} height={9} rx={4.5} fill={palette[5]} />
    </svg>
  )
})
