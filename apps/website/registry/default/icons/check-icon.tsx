import React from 'react';

export interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * check
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const CheckIcon: React.FC<CheckIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>
    </svg>
  );
};
