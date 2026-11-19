import { createComponent } from "./create-component"

export const ThemeAnatomy = createComponent((props) => {
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
      <path
        d="M71 76C71 71.5817 74.5817 68 79 68H200V232H79C74.5817 232 71 228.418 71 224V76Z"
        fill={palette[7]}
      />
      <path
        d="M200 68H321C325.418 68 329 71.5817 329 76V224C329 228.418 325.418 232 321 232H200V68Z"
        fill={palette[3]}
      />
      <circle cx={135} cy={124} r={16} fill={palette[3]} />
      <path
        d="M135 96V100M135 148V152M107 124H111M159 124H163M115 104L118 107M152 141L155 144M155 104L152 107M118 141L115 144"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={275} cy={124} r={18} fill={palette[15]} />
      <circle cx={285} cy={115} r={15} fill={palette[3]} />
      <rect x={95} y={180} width={80} height={10} rx={5} fill={palette[3]} />
      <rect x={95} y={200} width={56} height={10} rx={5} fill={palette[3]} />
      <rect x={225} y={180} width={80} height={10} rx={5} fill={palette[15]} />
      <rect x={225} y={200} width={56} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
