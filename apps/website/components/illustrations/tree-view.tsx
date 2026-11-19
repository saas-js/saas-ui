import { createComponent } from "./create-component"

export const TreeViewAnatomy = createComponent((props) => {
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
      <rect x={53} y={56} width={294} height={188} rx={8} fill={palette[3]} />
      <path
        d="M71 78L76 83L81 78"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89 74C89 72.8954 89.8954 72 91 72H96L99 75H107C108.105 75 109 75.8954 109 77V86C109 87.1046 108.105 88 107 88H91C89.8954 88 89 87.1046 89 86V74Z"
        fill={palette[7]}
      />
      <rect x={117} y={76} width={80} height={9} rx={4.5} fill={palette[15]} />
      <rect x={81} y={96} width={2} height={84} fill={palette[2]} />
      <path
        d="M95 107L100 112L105 107"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M113 103C113 101.895 113.895 101 115 101H120L123 104H131C132.105 104 133 104.895 133 106V115C133 116.105 132.105 117 131 117H115C113.895 117 113 116.105 113 115V103Z"
        fill={palette[7]}
      />
      <rect x={141} y={105} width={70} height={9} rx={4.5} fill={palette[15]} />
      <rect x={105} y={125} width={2} height={55} fill={palette[2]} />
      <rect x={81} y={128} width={266} height={26} fill={palette[8]} />
      <rect x={121} y={133} width={13} height={16} rx={2} fill={palette[15]} />
      <rect
        x={142}
        y={136.5}
        width={100}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <rect x={121} y={162} width={13} height={16} rx={2} fill={palette[2]} />
      <rect
        x={142}
        y={165.5}
        width={84}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path
        d="M97 193L102 198L97 203"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M113 190C113 188.895 113.895 188 115 188H120L123 191H131C132.105 191 133 191.895 133 193V202C133 203.105 132.105 204 131 204H115C113.895 204 113 203.105 113 202V190Z"
        fill={palette[7]}
      />
      <rect x={141} y={192} width={60} height={9} rx={4.5} fill={palette[15]} />
      <path
        d="M73 218L78 223L73 228"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89 215C89 213.895 89.8954 213 91 213H96L99 216H107C108.105 216 109 216.895 109 218V227C109 228.105 108.105 229 107 229H91C89.8954 229 89 228.105 89 227V215Z"
        fill={palette[7]}
      />
      <rect x={117} y={217} width={90} height={9} rx={4.5} fill={palette[15]} />
    </svg>
  )
})
