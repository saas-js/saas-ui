import { createComponent } from "./create-component"

export const ColorSwatchAnatomy = createComponent((props) => {
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
      <rect x={58} y={110} width={48} height={48} rx={8} fill={palette[7]} />
      <rect x={118} y={110} width={48} height={48} rx={8} fill={palette[2]} />
      <rect x={178} y={110} width={48} height={48} rx={8} fill={palette[5]} />
      <rect x={238} y={110} width={48} height={48} rx={8} fill={palette[3]} />
      <rect x={298} y={110} width={48} height={48} rx={8} fill={palette[14]} />
      <rect
        x={232}
        y={104}
        width={60}
        height={60}
        rx={11}
        stroke={palette[3]}
        strokeWidth={3}
      />
      <rect x={58} y={174} width={48} height={9} rx={4.5} fill={palette[2]} />
      <rect x={118} y={174} width={48} height={9} rx={4.5} fill={palette[2]} />
      <rect x={178} y={174} width={48} height={9} rx={4.5} fill={palette[2]} />
      <rect x={238} y={174} width={48} height={9} rx={4.5} fill={palette[3]} />
      <rect x={298} y={174} width={48} height={9} rx={4.5} fill={palette[2]} />
    </svg>
  )
})
