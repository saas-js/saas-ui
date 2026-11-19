import { createComponent } from "./create-component"

export const TagsInputAnatomy = createComponent((props) => {
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
      <rect x={53} y={124} width={294} height={52} rx={6} fill={palette[3]} />
      <rect x={65} y={136} width={80} height={28} rx={14} fill={palette[2]} />
      <rect
        x={77}
        y={145.5}
        width={42}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M127 146L134 153M134 146L127 153"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect x={153} y={136} width={96} height={28} rx={14} fill={palette[2]} />
      <rect
        x={165}
        y={145.5}
        width={58}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M231 146L238 153M238 146L231 153"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect
        x={262}
        y={145.5}
        width={50}
        height={9}
        rx={4.5}
        fill={palette[7]}
      />
      <rect x={318} y={139} width={2} height={22} rx={1} fill={palette[15]} />
    </svg>
  )
})
