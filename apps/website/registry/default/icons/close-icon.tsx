import React from 'react';

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * close
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const CloseIcon: React.FC<CloseIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
};
