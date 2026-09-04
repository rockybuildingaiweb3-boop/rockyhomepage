import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { SKILL_ICONS, SkillIconDefinition } from '../../data/skillIcons';
import { OFFICIAL_LOGOS } from '../../data/officialLogos';

export interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
  color?: string;
  useCdn?: boolean;
}

/**
 * TechLogo
 * 
 * Implements User Schemes A & B:
 * - Scheme A: Official Simple Icons CDN (https://cdn.simpleicons.org/[slug]/[hex])
 * - Scheme B: Professional @iconify/react dynamic vector rendering (simple-icons:*, lucide:*)
 * - Fallback: Canonical local vector registry (OFFICIAL_LOGOS)
 * 
 * Handles conceptual/non-brand overrides per user specification:
 *   Canvas API -> lucide:palette
 *   UV/Baking -> lucide:layers
 *   Design Systems -> lucide:layout-grid
 *   Draco/Meshopt -> lucide:archive
 *   MCP -> lucide:cpu
 *   Foundry -> lucide:hammer
 *   Privy -> lucide:key-round
 *   ERC-4337 -> lucide:wallet-cards
 */
export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = '',
  size = 28,
  color,
  useCdn = false,
}) => {
  const normId = id.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Normalized lookup
  let key = normId;
  if (key === 'ts') key = 'typescript';
  if (key === 'js') key = 'javascript';
  if (key === 'html') key = 'html5';
  if (key === 'node') key = 'nodejs';
  if (key === 'postgres') key = 'postgresql';
  if (key === 'three') key = 'threejs';

  const iconDef: SkillIconDefinition | undefined = SKILL_ICONS[key] || SKILL_ICONS[id];
  const localMeta = OFFICIAL_LOGOS[key] || OFFICIAL_LOGOS[id];

  const [cdnFailed, setCdnFailed] = useState(false);

  // If explicit CDN mode is requested (Scheme A) and has not failed:
  if (useCdn && iconDef?.cdnUrl && !cdnFailed) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={iconDef.name}
      >
        <img
          src={iconDef.cdnUrl}
          alt={iconDef.name}
          width={size}
          height={size}
          className="w-full h-full object-contain pointer-events-none transition-transform duration-200"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setCdnFailed(true)}
        />
      </span>
    );
  }

  // Canonical Vector SVG (100% accurate, zero network latency, authentic brand paths)
  if (localMeta?.svg) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:block transition-transform duration-200 ${className}`}
        style={{ width: `${size}px`, height: `${size}px`, color: color || localMeta.brandColor }}
        title={localMeta.name}
        dangerouslySetInnerHTML={{ __html: localMeta.svg }}
      />
    );
  }

  // Scheme B: @iconify/react dynamic vector rendering
  if (iconDef?.iconifyIcon) {
    const iconColor = color || (iconDef.isConceptual ? '#A855F7' : iconDef.brandColor);
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none transition-transform duration-200 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={iconDef.name}
      >
        <Icon
          icon={iconDef.iconifyIcon}
          width={size}
          height={size}
          style={{ color: iconColor }}
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </span>
    );
  }

  // Fallback to local official SVG data URI
  if (localMeta?.dataUri) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={localMeta.name}
      >
        <img
          src={localMeta.dataUri}
          alt={localMeta.name}
          width={size}
          height={size}
          className="w-full h-full object-contain pointer-events-none transition-transform duration-200"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </span>
    );
  }

  // Final emergency fallback
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {id.slice(0, 2).toUpperCase()}
    </span>
  );
};
