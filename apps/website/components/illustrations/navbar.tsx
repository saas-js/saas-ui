import { createComponent } from "./create-component"

export const NavbarAnatomy = createComponent((props) => {
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
      <rect x={53} y={118} width={294} height={64} rx={8} fill={palette[3]} />
      <circle cx={83} cy={150} r={13} fill={palette[15]} />
      <rect
        x={104}
        y={145.5}
        width={46}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={172}
        y={145.5}
        width={36}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect
        x={220}
        y={145.5}
        width={36}
        height={9}
        rx={4.5}
        fill={palette[5]}
      />
      <rect x={172} y={160} width={36} height={3} rx={1.5} fill={palette[15]} />
      <rect x={279} y={137} width={52} height={26} rx={4} fill={palette[15]} />
    </svg>
  )
})
