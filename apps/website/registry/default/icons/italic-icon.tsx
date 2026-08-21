import React from 'react'

export interface ItalicIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * italic
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const ItalicIcon: React.FC<ItalicIconProps> = ({
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
        <line x1="19" x2="10" y1="4" y2="4" />
        <line x1="14" x2="5" y1="20" y2="20" />
        <line x1="15" x2="9" y1="4" y2="20" />
      </g>
    </svg>
  )
}
