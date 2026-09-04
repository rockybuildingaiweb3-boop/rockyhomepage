import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillItem } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillSpotlightProps {
  activeSkill: SkillItem;
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillSpotlight
 * Visual aesthetic directly inspired by Image 2 (Tailwind 3D headline + quote).
 * 
 * Features:
 * - Bold 3D extruded typography (.text-3d-headline)
 * - The punchy personality one-liner (e.g., "utility classes hitting diff fr fr")
 * - Category badge and brand color atmospheric glow
 */
export const SkillSpotlight: React.FC<SkillSpotlightProps> = ({ activeSkill }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 relative z-20 flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSkill.id}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center select-none"
        >
          {/* Subtle Category Pill with Brand Color Dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-3 sm:mb-4">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeSkill.brandColor || '#A855F7' }}
            />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-400 uppercase">
              {activeSkill.category || activeSkill.rowTitle}
            </span>
          </div>

          {/* 
            3D EXTRUDED HEADLINE (Directly matching Image 2 Tailwind 3D text)
          */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
            <div
              className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center filter"
              style={{
                filter: `drop-shadow(0 0 12px ${activeSkill.brandColor || '#A855F7'}80)`,
              }}
            >
              <TechLogo id={activeSkill.id} size={42} color={activeSkill.brandColor} />
            </div>

            <h3 className="text-3d-headline text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              {activeSkill.name}
            </h3>
          </div>

          {/* 
            PUNCHY ONE-LINER / PHRASE (Directly matching Image 2 "utility classes hitting diff fr fr")
          */}
          <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-200 max-w-2xl px-4 leading-snug">
            {activeSkill.shortDescription || activeSkill.positioning}
          </p>

          {/* Tags preview */}
          {activeSkill.tags && activeSkill.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 opacity-80">
              {activeSkill.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] sm:text-[11px] text-neutral-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
