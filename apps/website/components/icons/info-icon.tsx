import React from 'react';

export interface InfoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * info
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const InfoIcon: React.FC<InfoIconProps> = ({ 
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
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g>
    </svg>
  );
};
