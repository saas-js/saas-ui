import { createComponent } from "./create-component"

export const ColorPickerAnatomy = createComponent((props) => {
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
      <defs>
        <linearGradient id="color-picker-sat" x1={0} y1={0} x2={1} y2={0}>
          <stop offset={0} stopColor={palette[15]} />
          <stop offset={1} stopColor={palette[3]} />
        </linearGradient>
        <linearGradient id="color-picker-val" x1={0} y1={0} x2={0} y2={1}>
          <stop offset={0} stopColor={palette[14]} stopOpacity={0} />
          <stop offset={1} stopColor={palette[14]} />
        </linearGradient>
        <linearGradient id="color-picker-hue" x1={0} y1={0} x2={1} y2={0}>
          <stop offset={0} stopColor={palette[7]} />
          <stop offset={0.5} stopColor={palette[3]} />
          <stop offset={1} stopColor={palette[7]} />
        </linearGradient>
      </defs>
      <rect x={93} y={52} width={214} height={196} rx={8} fill={palette[2]} />
      <rect
        x={105}
        y={64}
        width={190}
        height={104}
        rx={4}
        fill="url(#color-picker-sat)"
      />
      <rect
        x={105}
        y={64}
        width={190}
        height={104}
        rx={4}
        fill="url(#color-picker-val)"
      />
      <circle cx={232} cy={92} r={7} stroke={palette[15]} strokeWidth={3} />
      <rect
        x={105}
        y={180}
        width={190}
        height={14}
        rx={7}
        fill="url(#color-picker-hue)"
      />
      <circle
        cx={170}
        cy={187}
        r={9}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={2}
      />
      <rect x={105} y={206} width={30} height={30} rx={4} fill={palette[3]} />
      <rect x={143} y={206} width={152} height={30} rx={4} fill={palette[5]} />
      <rect
        x={155}
        y={216.5}
        width={70}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
    </svg>
  )
})
