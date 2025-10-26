import React from 'react';

export interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * menu
 * Lucide
 * @url https://icon-sets.iconify.design/lucide
 * @license ISC
 */
export const MenuIcon: React.FC<MenuIconProps> = ({ 
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
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/>
    </svg>
  );
};
