import { createComponent } from "./create-component"

export const RichTextEditorAnatomy = createComponent((props) => {
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
      <rect x={53} y={60} width={294} height={180} rx={6} fill={palette[3]} />
      <rect x={53} y={60} width={294} height={40} rx={6} fill={palette[2]} />
      <rect x={53} y={88} width={294} height={12} fill={palette[2]} />
      <rect x={63} y={68} width={24} height={24} rx={4} fill={palette[3]} />
      <path
        d="M70 73H77C79.2 73 81 74.8 81 77C81 79.2 79.2 81 77 81H70V73ZM70 81H78C80.2 81 82 82.8 82 85C82 87.2 80.2 89 78 89H70V81Z"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d="M103 73H113M108 73L104 87M109 87H99"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M129 72V81C129 85 131.5 88 135 88C138.5 88 141 85 141 81V72"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect x={160} y={70} width={2} height={20} rx={1} fill={palette[7]} />
      <path
        d="M176 74H196M176 80H196M176 86H190"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M210 74H230M214 80H230M210 86H230"
        stroke={palette[15]}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect x={73} y={120} width={150} height={12} rx={6} fill={palette[15]} />
      <rect x={73} y={146} width={254} height={9} rx={4.5} fill={palette[7]} />
      <rect x={73} y={165} width={234} height={9} rx={4.5} fill={palette[7]} />
      <rect x={73} y={184} width={254} height={9} rx={4.5} fill={palette[7]} />
      <rect x={73} y={203} width={150} height={9} rx={4.5} fill={palette[7]} />
      <rect x={227} y={199} width={2} height={17} rx={1} fill={palette[15]} />
    </svg>
  )
})
