import React from 'react'

export interface CodeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * code
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const CodeIcon: React.FC<CodeIconProps> = ({
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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </g>
    </svg>
  )
}
