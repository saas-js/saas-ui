import { createComponent } from "./create-component"

export const CarouselAnatomy = createComponent((props) => {
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
      <rect x={53} y={70} width={30} height={130} rx={6} fill={palette[2]} />
      <rect x={317} y={70} width={30} height={130} rx={6} fill={palette[2]} />
      <rect x={95} y={60} width={210} height={150} rx={8} fill={palette[3]} />
      <path
        d="M150 180L180 140L200 165L215 150L250 180H150Z"
        fill={palette[7]}
      />
      <circle cx={230} cy={110} r={12} fill={palette[7]} />
      <circle cx={95} cy={135} r={16} fill={palette[15]} />
      <path
        d="M98 128L91 135L98 142"
        stroke={palette[3]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={305} cy={135} r={16} fill={palette[15]} />
      <path
        d="M302 128L309 135L302 142"
        stroke={palette[3]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={174} y={226} width={20} height={8} rx={4} fill={palette[3]} />
      <circle cx={206} cy={230} r={4} fill={palette[2]} />
      <circle cx={220} cy={230} r={4} fill={palette[2]} />
    </svg>
  )
})
