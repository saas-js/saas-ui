import { createComponent } from "./create-component"

export const IconBadgeAnatomy = createComponent((props) => {
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
      <rect x={100} y={110} width={80} height={80} rx={16} fill={palette[3]} />
      <path
        d="M140 128L145.878 139.91L159 141.82L149.5 151.08L151.756 164.15L140 157.97L128.244 164.15L130.5 151.08L121 141.82L134.122 139.91L140 128Z"
        fill={palette[15]}
      />
      <rect x={220} y={120} width={60} height={60} rx={12} fill={palette[2]} />
      <path
        d="M250 136V164M236 150H264"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
