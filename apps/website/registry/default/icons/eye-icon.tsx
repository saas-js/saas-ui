import React from 'react';

export interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * eye
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const EyeIcon: React.FC<EyeIconProps> = ({ 
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
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></g>
    </svg>
  );
};
