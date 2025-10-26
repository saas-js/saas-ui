import React from 'react';

export interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * calendar
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const CalendarIcon: React.FC<CalendarIconProps> = ({ 
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
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></g>
    </svg>
  );
};
