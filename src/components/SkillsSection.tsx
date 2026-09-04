import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, Orbit, Globe, Sparkles } from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillSpotlight } from './skills/SkillSpotlight';
import { SkillKeycapsBoard } from './skills/SkillKeycapsBoard';
import { SkillSpaceArc } from './skills/SkillSpaceArc';
import { SkillConstellation } from './skills/SkillConstellation';
import { SkillCategoryTabs, SkillCategoryKey } from './skills/SkillCategoryTabs';
import { SkillsMarquee } from './skills/SkillsMarquee';
import { SkillsPlanetBackground } from './skills/SkillsPlanetBackground';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export type SkillViewMode = 'keycaps' | 'space-arc' | 'constellation';

/**
 * SkillsSection
 * 
 * Direct synthesis of User Reference Images 1 & 2:
 * 1. 3D Keycaps Deck (Reference Image 1): Tactile mechanical keyboard switchboard
 * 2. Cosmic Planetary Arc (Reference Image 2): Multi-tier floating official tech badges
 * 3. 3D Constellation Sphere: Interactive Three.js celestial node galaxy
 * 4. 100% Official Vector SVGs: Canonical geometries from Devicon & Simple-Icons
 * 5. Telemetry Cockpit: Live architectural specs, interactive keycap tester & copyable import snippets
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  // Default to 'typescript' or 'tailwind'
  const defaultSkill =
    SKILLS_DATA.find((s) => s.id === 'typescript') ||
    SKILLS_DATA.find((s) => s.id === 'tailwind') ||
    SKILLS_DATA[0];

  const [activeSkill, setActiveSkill] = useState<SkillItem>(defaultSkill);
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('all');
  const [viewMode, setViewMode] = useState<SkillViewMode>('keycaps');

  // Filter skills based on selected architectural category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') {
      return SKILLS_DATA;
    }
    return SKILLS_DATA.filter((skill) => skill.categoryKey === activeCategory);
  }, [activeCategory]);

  // Current index in filtered list
  const currentIndex = useMemo(() => {
    const idx = filteredSkills.findIndex((s) => s.id === activeSkill.id);
    return idx >= 0 ? idx : 0;
  }, [filteredSkills, activeSkill.id]);

  // Handle switching category tab: adjust activeSkill to first skill in that category if needed
  const handleSelectCategory = useCallback(
    (category: SkillCategoryKey) => {
      setActiveCategory(category);
      const items =
        category === 'all'
          ? SKILLS_DATA
          : SKILLS_DATA.filter((s) => s.categoryKey === category);
      if (items.length > 0 && !items.some((s) => s.id === activeSkill.id)) {
        setActiveSkill(items[0]);
      }
    },
    [activeSkill.id]
  );

  // Native Pager Handlers
  const handlePrevSkill = useCallback(() => {
    const total = filteredSkills.length;
    const prevIdx = (currentIndex - 1 + total) % total;
    setActiveSkill(filteredSkills[prevIdx]);
  }, [filteredSkills, currentIndex]);

  const handleNextSkill = useCallback(() => {
    const total = filteredSkills.length;
    const nextIdx = (currentIndex + 1) % total;
    setActiveSkill(filteredSkills[nextIdx]);
  }, [filteredSkills, currentIndex]);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-28 sm:pt-36 md:pt-40 pb-28 sm:pb-36 text-white z-10 bg-transparent overflow-x-clip"
      aria-label="Skills & Technologies"
    >
      {/* Planetary Cosmic Background */}
      <SkillsPlanetBackground activeSkill={activeSkill} />

      {/* 1. EDITORIAL HEADER */}
      <SkillText />

      {/* 
        2. ARCHITECTURAL CATEGORY TABS BRIDGE:
        Transitions between top headline and the interactive stage.
      */}
      <SkillCategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        filteredSkills={filteredSkills}
      />

      {/* 
        3. VIEW MODE SWITCHER (Directly bridging Image 1 & Image 2):
        - 3D Keycaps Deck (Image 1)
        - Planetary Orbital Arc (Image 2)
        - 3D Constellation Sphere
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-wrap items-center justify-between gap-4 relative z-20">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            Presentation Mode:
          </span>
          <div className="flex items-center p-1 rounded-2xl bg-black/50 border border-white/[0.12] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('keycaps')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                viewMode === 'keycaps'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>3D Keycaps Deck</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 ml-0.5">Img 1</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('space-arc')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                viewMode === 'space-arc'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Cosmic Space Arc</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 ml-0.5">Img 2</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('constellation')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                viewMode === 'constellation'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3D Sphere</span>
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Official Devicon & Simple-Icons Integration</span>
        </div>
      </div>

      {/* 
        4. DUAL INTERACTIVE STAGE:
        Left Column: Aerospace Telemetry Cockpit (SkillSpotlight)
        Right Column: Active View (Keycaps Deck / Cosmic Space Arc / 3D Constellation)
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
        {/* Left Column: Cockpit Spotlight */}
        <div className="lg:col-span-5 w-full sticky top-28">
          <SkillSpotlight
            activeSkill={activeSkill}
            currentIndex={currentIndex}
            totalCount={filteredSkills.length}
            onPrevSkill={handlePrevSkill}
            onNextSkill={handleNextSkill}
            onSelectProject={onSelectProject}
          />
        </div>

        {/* Right Column: Dynamic Stage */}
        <div className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">
            {viewMode === 'keycaps' && (
              <motion.div
                key="keycaps"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <SkillKeycapsBoard
                  skills={filteredSkills}
                  activeSkill={activeSkill}
                  onSelectSkill={(skill) => setActiveSkill(skill)}
                />
              </motion.div>
            )}

            {viewMode === 'space-arc' && (
              <motion.div
                key="space-arc"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <SkillSpaceArc
                  skills={filteredSkills}
                  activeSkill={activeSkill}
                  onSelectSkill={(skill) => setActiveSkill(skill)}
                />
              </motion.div>
            )}

            {viewMode === 'constellation' && (
              <motion.div
                key="constellation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <SkillConstellation
                  skills={filteredSkills}
                  activeSkill={activeSkill}
                  onSelectSkill={(skill) => setActiveSkill(skill)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 
        5. TRANSPARENT INFINITE FLOWING MARQUEE:
        Using 100% official SVGs with smooth drift speed.
      */}
      <SkillsMarquee
        activeSkillId={activeSkill.id}
        onSelectSkill={(skill) => setActiveSkill(skill)}
      />
    </section>
  );
};
