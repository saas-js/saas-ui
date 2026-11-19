import { createComponent } from "./create-component"

export const SidebarAnatomy = createComponent((props) => {
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
      <rect x={110} y={50} width={180} height={200} rx={8} fill={palette[3]} />
      <circle cx={136} cy={76} r={10} fill={palette[15]} />
      <rect
        x={154}
        y={71.5}
        width={60}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect x={124} y={104} width={152} height={30} rx={6} fill={palette[2]} />
      <rect x={136} y={114.5} width={9} height={9} rx={2} fill={palette[15]} />
      <rect
        x={155}
        y={114.5}
        width={80}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect x={136} y={150.5} width={9} height={9} rx={2} fill={palette[5]} />
      <rect
        x={155}
        y={150.5}
        width={64}
        height={9}
        rx={4.5}
        fill={palette[5]}
      />
      <rect x={136} y={178.5} width={9} height={9} rx={2} fill={palette[5]} />
      <rect
        x={155}
        y={178.5}
        width={90}
        height={9}
        rx={4.5}
        fill={palette[5]}
      />
      <rect x={136} y={206.5} width={9} height={9} rx={2} fill={palette[5]} />
      <rect
        x={155}
        y={206.5}
        width={72}
        height={9}
        rx={4.5}
        fill={palette[5]}
      />
    </svg>
  )
})
