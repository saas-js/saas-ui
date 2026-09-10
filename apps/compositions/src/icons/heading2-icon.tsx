import React from 'react'

export interface Heading2IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

/**
 * heading-2
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const Heading2Icon: React.FC<Heading2IconProps> = ({
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
        <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
      </g>
    </svg>
  )
}
