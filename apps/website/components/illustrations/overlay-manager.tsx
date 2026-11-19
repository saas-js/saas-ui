import { createComponent } from "./create-component"

export const OverlayManagerAnatomy = createComponent((props) => {
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
        d="M200 52L330 112L200 172L70 112L200 52Z"
        fill={palette[5]}
        opacity={0.35}
      />
      <path
        d="M200 72L330 132L200 192L70 132L200 72Z"
        fill={palette[2]}
        opacity={0.5}
      />
      <path
        d="M200 100L330 160L200 220L70 160L200 100Z"
        fill={palette[5]}
        opacity={0.75}
      />
      <path d="M200 128L330 188L200 248L70 188L200 128Z" fill={palette[3]} />
      <rect x={160} y={180} width={80} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
