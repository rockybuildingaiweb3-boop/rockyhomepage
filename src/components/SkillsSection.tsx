import React from 'react';
import { PureSkills5Lines } from './skills/PureSkills5Lines';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillsSection
 * 
 * Minimalist, high-end 5-line architectural presentation:
 * - Pure, clean aesthetic with generous negative space and zero visual clutter
 * - 5 distinct, curated domain lines (Frontend, 3D/Graphics, Backend/Cloud, AI Protocols, Web3)
 * - 100% authentic, canonical vector SVGs rendered with exact brand fidelity
 * - Silky smooth ambient drift (Reference Image 2) with static grid toggle & pause-on-hover
 * - Sleek, non-intrusive inspection drawer on click
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-28 sm:pt-36 md:pt-40 pb-28 sm:pb-36 text-white z-10 bg-transparent overflow-x-clip"
      aria-label="Skills & Technologies"
    >
      {/* Subtle Background Radial Vignette for High-End Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Pure 5-Line Presentation Component */}
      <div className="w-full relative z-10">
        <PureSkills5Lines onSelectProject={onSelectProject} />
      </div>
    </section>
  );
};
export default SkillsSection;
