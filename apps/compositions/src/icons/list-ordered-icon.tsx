import React from 'react'

export interface ListOrderedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * list-ordered
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const ListOrderedIcon: React.FC<ListOrderedIconProps> = ({
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
        <path d="M10 12h11" />
        <path d="M10 18h11" />
        <path d="M10 6h11" />
        <path d="M4 10h2" />
        <path d="M4 6h1v4" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </g>
    </svg>
  )
}
