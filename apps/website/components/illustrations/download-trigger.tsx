import { createComponent } from "./create-component"

export const DownloadTriggerAnatomy = createComponent((props) => {
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
      <rect x={110} y={122} width={180} height={56} rx={4} fill={palette[3]} />
      <path
        d="M144 136V158M144 158L135 149M144 158L153 149"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M133 164H155"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={170} y={145} width={96} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
