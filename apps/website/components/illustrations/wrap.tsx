import { createComponent } from "./create-component"

export const WrapAnatomy = createComponent((props) => {
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
        y={90}
        width={260}
        height={120}
        fill={palette[3]}
      />
      <rect x={70} y={90} width={70} height={34} rx={4} fill={palette[2]} />
      <rect x={148} y={90} width={100} height={34} rx={4} fill={palette[2]} />
      <rect x={256} y={90} width={60} height={34} rx={4} fill={palette[2]} />
      <rect x={70} y={133} width={110} height={34} rx={4} fill={palette[2]} />
      <rect x={188} y={133} width={80} height={34} rx={4} fill={palette[2]} />
      <rect x={70} y={176} width={84} height={34} rx={4} fill={palette[2]} />
      <path
        d="M322 107C336 107 336 150 300 150M300 150L306 144M300 150L306 156"
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
