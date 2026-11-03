import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Strict Brand Logo Component:
 * Uses the exact provided image with "MAF" in yellow and "TH" in white on hot-pink square.
 * Strictly never redrawn, always displayed inside its pink square tile.
 */
export default function Logo({ size = 'md', className = '', asLink = true }) {
  const sizeMap = {
    sm: 'w-8 h-8 rounded',
    md: 'w-10 h-10 rounded-[5px]',
    lg: 'w-12 h-12 rounded-[6px]',
    xl: 'w-16 h-16 rounded-[8px]',
  };

  const tile = (
    <div
      className={`inline-flex items-center justify-center overflow-hidden flex-shrink-0 select-none shadow-sm ${sizeMap[size] || sizeMap.md
        } ${className}`}
      style={{
        boxShadow: '0 2px 6px rgba(255, 0, 122, 0.25)',
      }}
      aria-label="MAFTH Marketplace Logo"
    >
      <img
        src="/logo.jpg"
        alt="MAFTH"
        className="w-full h-full object-cover block"
        loading="eager"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-flex items-center gap-2 group focus:outline-none">
        {tile}
      </Link>
    );
  }

  return tile;
}
