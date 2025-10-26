import React from 'react';

export interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * chevron-down
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ 
  size = "1em", 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>
    </svg>
  );
};
