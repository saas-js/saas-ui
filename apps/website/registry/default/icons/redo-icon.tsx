import React from 'react'

export interface RedoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * redo
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const RedoIcon: React.FC<RedoIconProps> = ({
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
        <path d="M21 7v6h-6" />
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
      </g>
    </svg>
  )
}
