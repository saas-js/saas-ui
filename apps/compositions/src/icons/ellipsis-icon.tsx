import React from 'react';

export interface EllipsisIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * ellipsis
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const EllipsisIcon: React.FC<EllipsisIconProps> = ({ 
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
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></g>
    </svg>
  );
};
