import { createComponent } from "./create-component"

export const DataTableAnatomy = createComponent((props) => {
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
      <rect x={53} y={58} width={294} height={160} rx={6} fill={palette[3]} />
      <path
        d="M53 64C53 60.6863 55.6863 58 59 58H341C344.314 58 347 60.6863 347 64V86H53V64Z"
        fill={palette[7]}
      />
      <rect
        x={67}
        y={66}
        width={12}
        height={12}
        rx={2}
        stroke={palette[3]}
        strokeWidth={2}
      />
      <rect x={95} y={67.5} width={60} height={9} rx={4.5} fill={palette[3]} />
      <path d="M163 75L167 70L171 75H163Z" fill={palette[3]} />
      <rect x={195} y={67.5} width={50} height={9} rx={4.5} fill={palette[3]} />
      <rect x={275} y={67.5} width={50} height={9} rx={4.5} fill={palette[3]} />
      <rect
        x={67}
        y={94}
        width={12}
        height={12}
        rx={2}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect x={95} y={96} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={96} width={40} height={8} rx={4} fill={palette[2]} />
      <rect x={275} y={96} width={30} height={8} rx={4} fill={palette[2]} />
      <rect x={53} y={114} width={294} height={26} fill={palette[14]} />
      <rect x={67} y={120} width={12} height={12} rx={2} fill={palette[15]} />
      <path
        d="M69.5 126L72 128.5L76.5 124"
        stroke={palette[3]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect x={95} y={122} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={122} width={47} height={8} rx={4} fill={palette[2]} />
      <rect x={275} y={122} width={41} height={8} rx={4} fill={palette[2]} />
      <rect
        x={67}
        y={146}
        width={12}
        height={12}
        rx={2}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect x={95} y={148} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={148} width={54} height={8} rx={4} fill={palette[2]} />
      <rect x={275} y={148} width={30} height={8} rx={4} fill={palette[2]} />
      <rect
        x={67}
        y={172}
        width={12}
        height={12}
        rx={2}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect x={95} y={174} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={174} width={61} height={8} rx={4} fill={palette[2]} />
      <rect x={275} y={174} width={41} height={8} rx={4} fill={palette[2]} />
      <rect
        x={67}
        y={198}
        width={12}
        height={12}
        rx={2}
        stroke={palette[15]}
        strokeWidth={2}
      />
      <rect x={95} y={200} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={195} y={200} width={43} height={8} rx={4} fill={palette[2]} />
      <rect x={275} y={200} width={30} height={8} rx={4} fill={palette[2]} />
      <rect x={53} y={228} width={80} height={9} rx={4.5} fill={palette[2]} />
      <rect x={263} y={224} width={24} height={18} rx={4} fill={palette[2]} />
      <rect x={293} y={224} width={24} height={18} rx={4} fill={palette[3]} />
      <rect x={323} y={224} width={24} height={18} rx={4} fill={palette[2]} />
    </svg>
  )
})
