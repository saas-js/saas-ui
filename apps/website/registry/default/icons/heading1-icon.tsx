import React from 'react'

export interface Heading1IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * heading-1
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const Heading1Icon: React.FC<Heading1IconProps> = ({
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
        <path d="M4 12h8" />
        <path d="M4 18V6" />
        <path d="M12 18V6" />
        <path d="m17 12 3-2v8" />
      </g>
    </svg>
  )
}
