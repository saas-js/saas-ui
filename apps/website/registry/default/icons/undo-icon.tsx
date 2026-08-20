import React from 'react'

export interface UndoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * undo
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const UndoIcon: React.FC<UndoIconProps> = ({
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
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
      </g>
    </svg>
  )
}
