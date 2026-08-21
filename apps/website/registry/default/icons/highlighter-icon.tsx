import React from 'react'

export interface HighlighterIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * highlighter
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const HighlighterIcon: React.FC<HighlighterIconProps> = ({
  size = '1em',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m9 11-6 6v3h9l3-3" />
        <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
      </g>
    </svg>
  )
}
