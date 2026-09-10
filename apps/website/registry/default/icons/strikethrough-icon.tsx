import React from 'react'

export interface StrikethroughIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * strikethrough
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const StrikethroughIcon: React.FC<StrikethroughIconProps> = ({
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
        <path d="M16 4H9a3 3 0 0 0-2.83 4" />
        <path d="M14 12a4 4 0 0 1 0 8H6" />
        <line x1="4" x2="20" y1="12" y2="12" />
      </g>
    </svg>
  )
}
