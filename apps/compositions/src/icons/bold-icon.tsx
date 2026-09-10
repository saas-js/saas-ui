import React from 'react'

export interface BoldIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * bold
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const BoldIcon: React.FC<BoldIconProps> = ({
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
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
      />
    </svg>
  )
}
