import React from 'react';

export interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * arrow-left
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/>
    </svg>
  );
};
