import { createComponent } from "./create-component"

export const GroupAnatomy = createComponent((props) => {
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
      <rect
        opacity={0.34}
        x={70}
        y={118}
        width={260}
        height={64}
        rx={6}
        fill={palette[3]}
      />
      <rect x={78} y={126} width={76} height={48} rx={4} fill={palette[2]} />
      <rect x={162} y={126} width={76} height={48} rx={4} fill={palette[2]} />
      <rect x={246} y={126} width={76} height={48} rx={4} fill={palette[2]} />
      <rect
        x={98}
        y={145.5}
        width={36}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={182}
        y={145.5}
        width={36}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={266}
        y={145.5}
        width={36}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
    </svg>
  )
})
