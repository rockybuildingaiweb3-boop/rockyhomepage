import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  FolderGit2,
  Layers,
  Code2,
} from 'lucide-react';
import { SkillItem, PROJECT_NAMES } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillDetailDrawerProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillDetailDrawer
 * High-end cinematic floating HUD Inspector inspired by Linear, Raycast, and Apple VisionOS.
 * Replaces the dated CRM side drawer with an elevated, luminous floating glass modal
 * centered in space, featuring dynamic brand glows, bento architecture cards,
 * and visual project previews with direct slider navigation.
 */
export const SkillDetailDrawer: React.FC<SkillDetailDrawerProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skill) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6 md:p-8">
          {/* Cinematic dark backdrop with soft blur to focus attention */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md pointer-events-auto cursor-pointer"
            aria-hidden="true"
          />

          {/* Dynamic Technology Brand Ambient Aura */}
          <motion.div
            key={`brand-aura-${skill.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full pointer-events-none -z-10 blur-[110px]"
            style={{
              background: `radial-gradient(circle, ${skill.brandColor || '#7042f8'}35 0%, rgba(112, 66, 248, 0.15) 50%, transparent 75%)`,
            }}
            aria-hidden="true"
          />

          {/* 
            FLOATING HOLOGRAPHIC INSPECTOR CARD
            On Desktop: Centered floating glass card with hairline gradient border
            On Mobile: Floating bottom sheet with smooth drag handle
          */}
          <motion.div
            key={`inspector-card-${skill.id}`}
            initial={
              isMobile
                ? { y: '100%', opacity: 0 }
                : { scale: 0.94, opacity: 0, y: 16 }
            }
            animate={
              isMobile
                ? { y: 0, opacity: 1 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            exit={
              isMobile
                ? { y: '100%', opacity: 0 }
                : { scale: 0.94, opacity: 0, y: 16 }
            }
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 350,
            }}
            id="skill-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
            className={`
              relative w-full pointer-events-auto flex flex-col overflow-hidden text-white
              bg-[#080518]/92 backdrop-blur-3xl
              border border-white/10
              shadow-[0_0_80px_rgba(0,0,0,0.85),0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(112,66,248,0.2)]
              ${
                isMobile
                  ? 'fixed bottom-0 left-0 right-0 max-h-[88vh] rounded-t-[28px] border-b-0'
                  : 'max-w-[640px] max-h-[85vh] rounded-[24px]'
              }
            `}
          >
            {/* Top Hairline Light Reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Mobile Drag Indicator */}
            {isMobile && (
              <div className="w-full flex items-center justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/25" />
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* HERO HEADER: Official Logo, Title, Verification, Close */}
            {/* ------------------------------------------------------------- */}
            <div className="relative px-6 sm:px-8 pt-6 pb-5 border-b border-white/[0.08] shrink-0 bg-white/[0.01]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  {/* Holographic Logo Pedestal */}
                  <div
                    className="relative shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center p-3 border border-white/10 bg-white/[0.03] transition-transform hover:scale-105"
                    style={{
                      boxShadow: `0 0 35px ${skill.brandColor}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
                    }}
                  >
                    <TechLogo id={skill.id} size={50} />
                  </div>

                  {/* Title & Category Matrix */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        {skill.rowTitle}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PROD VERIFIED
                      </span>
                    </div>

                    <h3
                      id="skill-modal-title"
                      className="text-2xl sm:text-3xl font-light tracking-tight text-white truncate"
                    >
                      {skill.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5 truncate">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Close Button & ESC pill */}
                <div className="flex items-center gap-2 shrink-0">
                  {!isMobile && (
                    <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md tracking-widest uppercase">
                      ESC
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 cursor-pointer"
                    aria-label="Close skill details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SCROLLABLE BENTO CONTENT BODY */}
            {/* ------------------------------------------------------------- */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 custom-scrollbar">
              {/* BENTO CARD 1: Architectural Role & Production Focus */}
              <div
                className="relative rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/[0.08] overflow-hidden"
                style={{
                  borderLeftColor: skill.brandColor || '#7042f8',
                  borderLeftWidth: '3px',
                }}
              >
                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                    Architectural Positioning
                  </span>
                </div>
                <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-100 font-light">
                  {skill.positioning || skill.role || skill.editorialSummary}
                </p>

                {/* Practical production experience if available */}
                {skill.experience && skill.experience !== skill.positioning && (
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-400 font-light mt-3 pt-3 border-t border-white/[0.06]">
                    {skill.experience}
                  </p>
                )}
              </div>

              {/* BENTO CARD 2: Core Engineering Capabilities (Feature Vectors) */}
              {skill.tags && skill.tags.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <h4 className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
                      Core Competencies & Patterns
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-200 font-light px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-purple-400/50 hover:bg-purple-500/15 hover:text-white transition-all duration-200 cursor-default"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: skill.brandColor || '#a855f7' }}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* BENTO CARD 3: Production Commercial Works (Visual Project Cards) */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-neutral-400">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
                      <h4 className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
                        Implemented in Featured Projects
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400/80">
                      {skill.relatedProjects.length} WORK{' '}
                      {skill.relatedProjects.length === 1 ? 'ITEM' : 'ITEMS'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {skill.relatedProjects.map((projKey) => {
                      const projInfo = PROJECT_NAMES[projKey] || {
                        title: projKey,
                        number: '•',
                        category: 'Web Experience',
                        image: `/assets/imgs/work-back/${projKey}/cover.jpg`,
                      };

                      return (
                        <button
                          key={projKey}
                          type="button"
                          onClick={() => {
                            if (onSelectProject) {
                              onSelectProject(projKey);
                            }
                            onClose();
                          }}
                          className="group relative w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/40 transition-all duration-200 text-left cursor-pointer overflow-hidden"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Project Visual Cover Thumbnail */}
                            <div className="relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#161426]">
                              <img
                                src={projInfo.image}
                                alt={projInfo.title}
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                onError={(e) => {
                                  // Fallback gracefully if image fails
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>

                            {/* Project Title & Category */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-mono text-purple-400 font-semibold">
                                  {projInfo.number}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider truncate">
                                  {projInfo.category}
                                </span>
                              </div>
                              <h5 className="text-sm font-normal text-white group-hover:text-purple-200 transition-colors truncate">
                                {projInfo.title}
                              </h5>
                            </div>
                          </div>

                          {/* Navigation CTA Pill */}
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 group-hover:bg-purple-500/20 text-neutral-400 group-hover:text-purple-200 border border-white/5 group-hover:border-purple-500/30 transition-all shrink-0 ml-2">
                            <span className="text-[10px] font-mono hidden sm:inline">
                              VIEW WORK
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SPATIAL FOOTER / METRIC STATUS BAR */}
            {/* ------------------------------------------------------------- */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-[11px] font-mono text-neutral-400 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="tracking-wider text-neutral-400">
                  ROCKY BABCOCK • ARCHITECTURE HUD
                </span>
              </div>
              <span className="text-purple-300 font-medium tracking-wide">
                TIER-1 STACK
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
