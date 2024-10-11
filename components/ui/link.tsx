"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className = '', activeClassName = '' }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseStyles = "inline-flex items-center justify-center w-[140px] h-[36px] rounded-[6px] transition-colors";
  const hoverStyles = "hover:text-brand";
  const activeStyles = isActive ? `font-bold text-brand bg-surface-brand-highlights ${activeClassName}` : '';

  return (
    <Link href={href} className={`${baseStyles} ${hoverStyles} ${className} ${activeStyles}`}>
      {children}
    </Link>
  );
};

export default CustomLink;

