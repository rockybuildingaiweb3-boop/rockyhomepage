import React from 'react';
import { OFFICIAL_LOGOS } from '../../data/officialLogos';

export interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
  color?: string;
  useOfficialColor?: boolean;
}

/**
 * TechLogo
 * 
 * Renders 100% authentic, official vector SVGs directly extracted from
 * the canonical `devicon` and `simple-icons` developer repositories.
 * 
 * Features:
 * - Exact official geometries, multi-color badges, and shields (e.g. HTML5 shield,
 *   CSS3 shield, JS yellow badge, TS blue badge, React cyan atom, Tailwind waves, etc.)
 * - Zero network latency / zero broken links (compiled directly into bundle)
 * - Scalable vector rendering via crisp SVG data URIs
 */
export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = '',
  size = 28,
  color,
  useOfficialColor = true,
}) => {
  const normId = id.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Alias lookup
  let key = normId;
  if (key === 'ts') key = 'typescript';
  if (key === 'js') key = 'javascript';
  if (key === 'html') key = 'html5';
  if (key === 'css') key = 'html5'; // fallback or css
  if (key === 'node') key = 'nodejs';
  if (key === 'postgres') key = 'postgresql';
  if (key === 'three') key = 'threejs';

  const meta = OFFICIAL_LOGOS[key] || OFFICIAL_LOGOS[id] || null;

  if (!meta) {
    // Fallback icon
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          stroke={color || '#A855F7'}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </span>
    );
  }

  // If a specific color override is requested, apply brightness/tint filter or display cleanly
  const filterStyle = color && color !== meta.brandColor
    ? { filter: `drop-shadow(0 0 6px ${color}80)` }
    : undefined;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, ...filterStyle }}
      title={meta.name}
    >
      <img
        src={meta.dataUri}
        alt={meta.name}
        width={size}
        height={size}
        className="w-full h-full object-contain pointer-events-none transition-transform duration-200"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </span>
  );
};
