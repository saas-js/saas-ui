import React from 'react'

export interface UnderlineIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * underline
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const UnderlineIcon: React.FC<UnderlineIconProps> = ({
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
        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
        <line x1="4" x2="20" y1="20" y2="20" />
      </g>
    </svg>
  )
}
