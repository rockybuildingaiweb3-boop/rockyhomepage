import React from 'react';
import { motion } from 'motion/react';
import { SKILL_ROWS, SKILLS_BY_ROW, SkillItem } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillConstellationProps {
  activeSkillId: string;
  onSelectSkill: (skill: SkillItem) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  activeSkillId,
  onSelectSkill,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 my-6 sm:my-10 flex flex-col items-center gap-4 sm:gap-5 md:gap-6 select-none relative z-20">
      {SKILL_ROWS.map((rowDef, rowIdx) => {
        const skillsInRow = SKILLS_BY_ROW[rowDef.row] || [];

        return (
          <motion.div
            key={`matrix-row-${rowDef.row}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rowIdx * 0.08 }}
            className="w-full flex flex-col items-center gap-2"
          >
            {/* Row Category Label / Track Marker */}
            <div className="flex items-center gap-3 w-full max-w-4xl px-2 justify-between sm:justify-start">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                <span className="text-purple-400 font-bold">0{rowDef.row}</span>
                <span className="text-white/20">//</span>
                <span>{rowDef.title}</span>
              </span>
              <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                (10 MODULES)
              </span>
            </div>

            {/* 10 Items Row with Unified Glass Containers */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3 max-w-full">
              {skillsInRow.map((skill, skillIdx) => {
                const isActive = activeSkillId === skill.id;

                return (
                  <motion.button
                    key={`skill-${skill.row}-${skill.id}-${skillIdx}`}
                    onClick={() => onSelectSkill(skill)}
                    onMouseEnter={() => onSelectSkill(skill)}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                    className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.12] scale-110 z-30 shadow-[0_0_24px_rgba(168,85,247,0.45)]'
                        : 'bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/30 shadow-[0_4px_14px_rgba(0,0,0,0.5)]'
                    } border backdrop-blur-md`}
                    style={{
                      borderColor: isActive
                        ? skill.brandColor || '#A855F7'
                        : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isActive
                        ? `0 0 20px ${skill.brandColor}60, 0 4px 14px rgba(0,0,0,0.6)`
                        : undefined,
                    }}
                    title={`${skill.name} — ${skill.shortDescription || skill.positioning}`}
                    aria-label={skill.name}
                  >
                    {/* Unified Micro-Glow Underlay */}
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center transition-all duration-300"
                      style={{
                        filter: isActive
                          ? `drop-shadow(0 0 8px ${skill.brandColor}) brightness(1.2)`
                          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      }}
                    >
                      <TechLogo
                        id={skill.id}
                        size={26}
                        color={isActive ? skill.brandColor : undefined}
                      />
                    </div>

                    {/* Active Accent Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-black"
                        style={{ backgroundColor: skill.brandColor || '#A855F7' }}
                      />
                    )}

                    {/* Tooltip on Hover for Precision Identification */}
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[10px] font-mono tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-40 hidden sm:block">
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
