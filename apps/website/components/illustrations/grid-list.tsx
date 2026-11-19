import { createComponent } from "./create-component"

export const GridListAnatomy = createComponent((props) => {
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
      <rect x={53} y={62} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={59} y={68} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={63} y={116} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={63} y={129} width={34} height={6} rx={3} fill={palette[2]} />
      <rect x={155} y={62} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={161} y={68} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={165} y={116} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={165} y={129} width={34} height={6} rx={3} fill={palette[2]} />
      <rect x={257} y={62} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={263} y={68} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={267} y={116} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={267} y={129} width={34} height={6} rx={3} fill={palette[2]} />
      <rect x={53} y={160} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={59} y={166} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={63} y={214} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={63} y={227} width={34} height={6} rx={3} fill={palette[2]} />
      <rect x={155} y={160} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={161} y={166} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={165} y={214} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={165} y={227} width={34} height={6} rx={3} fill={palette[2]} />
      <rect x={257} y={160} width={90} height={80} rx={6} fill={palette[3]} />
      <rect x={263} y={166} width={78} height={40} rx={4} fill={palette[7]} />
      <rect x={267} y={214} width={50} height={8} rx={4} fill={palette[15]} />
      <rect x={267} y={227} width={34} height={6} rx={3} fill={palette[2]} />
    </svg>
  )
})
