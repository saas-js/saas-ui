import React from 'react'

export interface ListIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * list
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const ListIcon: React.FC<ListIconProps> = ({
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
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
        <path d="M3 6h.01" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M8 6h13" />
      </g>
    </svg>
  )
}
