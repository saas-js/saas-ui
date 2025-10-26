import React from 'react';

export interface MinusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * minus
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const MinusIcon: React.FC<MinusIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
    </svg>
  );
};
