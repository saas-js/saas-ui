import React from 'react';

export interface FilterIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * filter
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const FilterIcon: React.FC<FilterIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
    </svg>
  );
};
