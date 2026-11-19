import { createComponent } from "./create-component"

export const ModalsAnatomy = createComponent((props) => {
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
      <rect x={113} y={50} width={214} height={140} rx={10} fill={palette[2]} />
      <rect x={93} y={75} width={214} height={150} rx={10} fill={palette[5]} />
      <rect x={73} y={100} width={234} height={150} rx={10} fill={palette[3]} />
      <rect x={93} y={120} width={130} height={14} rx={7} fill={palette[15]} />
      <rect x={93} y={150} width={194} height={10} rx={5} fill={palette[5]} />
      <rect x={93} y={170} width={140} height={10} rx={5} fill={palette[5]} />
      <rect x={235} y={208} width={52} height={26} rx={4} fill={palette[15]} />
      <rect x={175} y={208} width={52} height={26} rx={4} fill={palette[2]} />
    </svg>
  )
})
