import React from 'react'

export interface AlignCenterIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * align-center
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const AlignCenterIcon: React.FC<AlignCenterIconProps> = ({
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
        <path d="M17 12H7" />
        <path d="M19 18H5" />
        <path d="M21 6H3" />
      </g>
    </svg>
  )
}
