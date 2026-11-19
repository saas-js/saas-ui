import { createComponent } from "./create-component"

export const SplitPageAnatomy = createComponent((props) => {
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
      <rect x={157} y={50} width={2} height={200} fill={palette[2]} />
      <rect x={67} y={66} width={76} height={34} rx={6} fill={palette[2]} />
      <rect x={77} y={74} width={50} height={7} rx={3.5} fill={palette[15]} />
      <rect x={77} y={87} width={36} height={6} rx={3} fill={palette[7]} />
      <rect x={77} y={116} width={50} height={7} rx={3.5} fill={palette[5]} />
      <rect x={77} y={129} width={36} height={6} rx={3} fill={palette[5]} />
      <rect x={77} y={154} width={50} height={7} rx={3.5} fill={palette[5]} />
      <rect x={77} y={167} width={36} height={6} rx={3} fill={palette[5]} />
      <rect x={77} y={192} width={50} height={7} rx={3.5} fill={palette[5]} />
      <rect x={77} y={205} width={36} height={6} rx={3} fill={palette[5]} />
      <rect x={177} y={68} width={110} height={12} rx={6} fill={palette[15]} />
      <rect x={177} y={96} width={152} height={9} rx={4.5} fill={palette[5]} />
      <rect x={177} y={114} width={132} height={9} rx={4.5} fill={palette[5]} />
      <rect x={177} y={140} width={152} height={92} rx={6} fill={palette[2]} />
    </svg>
  )
})
