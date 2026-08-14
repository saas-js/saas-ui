import React from 'react';

export interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * search
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const SearchIcon: React.FC<SearchIconProps> = ({ 
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
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m21 21l-4.34-4.34"/><circle cx="11" cy="11" r="8"/></g>
    </svg>
  );
};
