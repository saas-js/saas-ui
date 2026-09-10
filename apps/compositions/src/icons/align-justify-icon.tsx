import React from 'react'

export interface AlignJustifyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * align-justify
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const AlignJustifyIcon: React.FC<AlignJustifyIconProps> = ({
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
        <path d="M3 12h18" />
        <path d="M3 18h18" />
        <path d="M3 6h18" />
      </g>
    </svg>
  )
}
