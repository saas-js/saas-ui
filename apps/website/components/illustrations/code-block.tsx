import { createComponent } from "./create-component"

export const CodeBlockAnatomy = createComponent((props) => {
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
      <rect x={53} y={64} width={294} height={172} rx={8} fill={palette[3]} />
      <path
        d="M53 72C53 67.5817 56.5817 64 61 64H339C343.418 64 347 67.5817 347 72V96H53V72Z"
        fill={palette[2]}
      />
      <circle cx={73} cy={80} r={5} fill={palette[15]} />
      <circle cx={89} cy={80} r={5} fill={palette[15]} />
      <circle cx={105} cy={80} r={5} fill={palette[15]} />
      <rect
        x={319}
        y={73}
        width={14}
        height={14}
        rx={3}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect
        x={315}
        y={77}
        width={10}
        height={10}
        rx={2}
        fill={palette[2]}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect x={73} y={116} width={60} height={10} rx={5} fill={palette[7]} />
      <rect x={141} y={116} width={110} height={10} rx={5} fill={palette[15]} />
      <rect x={93} y={138} width={80} height={10} rx={5} fill={palette[15]} />
      <rect x={181} y={138} width={50} height={10} rx={5} fill={palette[7]} />
      <rect x={93} y={160} width={140} height={10} rx={5} fill={palette[15]} />
      <rect x={113} y={182} width={70} height={10} rx={5} fill={palette[7]} />
      <rect x={191} y={182} width={90} height={10} rx={5} fill={palette[15]} />
      <rect x={73} y={204} width={40} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
