import { createComponent } from "./create-component"

export const ToggleTipAnatomy = createComponent((props) => {
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
      <rect x={132} y={70} width={136} height={60} rx={8} fill={palette[3]} />
      <rect x={150} y={88} width={100} height={9} rx={4.5} fill={palette[15]} />
      <rect x={150} y={106} width={70} height={9} rx={4.5} fill={palette[5]} />
      <path
        d="M198.586 142.586C199.367 143.367 200.633 143.367 201.414 142.586L211 133H189L198.586 142.586Z"
        fill={palette[3]}
      />
      <path d="M189 130H211V133H189Z" fill={palette[3]} />
      <circle cx={200} cy={185} r={28} fill={palette[5]} />
      <circle cx={200} cy={172} r={4} fill={palette[0]} />
      <rect x={196} y={181} width={8} height={22} rx={4} fill={palette[0]} />
    </svg>
  )
})
