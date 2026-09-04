import React, { useState } from 'react';
import { SKILLS_DATA, SkillItem } from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillSpotlight } from './skills/SkillSpotlight';
import { SkillConstellation } from './skills/SkillConstellation';
import { SkillsMarquee } from './skills/SkillsMarquee';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillsSection
 * 
 * Harmonious integration of:
 * 1. Image 1: The floating skill icons constellation (tiered pyramid layout over space vortex)
 * 2. Image 2: The 3D extruded headline & punchy one-liner quote spotlight (e.g. Tailwind)
 * 3. Transparent Seamless Flowing Marquee: Specifically streaming the skills alongside their
 *    quotes across the viewport, completely transparent with starfield particles flowing through.
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  // Default to 'tailwind' as showcased in user's Image 2!
  const defaultSkill =
    SKILLS_DATA.find((s) => s.id === 'tailwind') || SKILLS_DATA[0];
  const [activeSkill, setActiveSkill] = useState<SkillItem>(defaultSkill);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-28 sm:pt-36 md:pt-40 pb-28 sm:pb-36 text-white z-10 bg-transparent overflow-x-clip"
      aria-label="Skills & Technologies"
    >
      {/* 
        LAYER 1: Subtle Cosmic Glow (Transparent & non-blocking)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[550px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(112, 66, 248, 0.08) 0%, rgba(79, 70, 229, 0.02) 45%, transparent 75%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      {/* 
        LAYER 2: Cosmic Purple Vortex / Video Sphere (Directly from Image 1)
        Blended via screen mode and subtle opacity so Three.js star particles remain sharply visible.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 45%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 45%, transparent 75%)',
        }}
      >
        <video
          className="w-full h-auto min-h-full min-w-full object-cover opacity-20 pointer-events-none select-none mix-blend-screen"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/videos/skills-bg.webm"
        />
      </div>

      {/* 1. EDITORIAL HEADER */}
      <SkillText />

      {/* 
        2. 3D SPOTLIGHT DISPLAY (Directly inspired by Image 2)
        Shows 3D extruded skill name + its punchy one-liner (e.g. Tailwind: "utility classes hitting diff fr fr")
      */}
      <SkillSpotlight
        activeSkill={activeSkill}
        onSelectProject={onSelectProject}
      />

      {/* 
        3. SKILL CONSTELLATION (Directly matching Image 1)
        Floating tiered pyramid of official skill icons over the space vortex.
        Hovering or clicking any icon smoothly updates the 3D Spotlight above!
      */}
      <SkillConstellation
        activeSkillId={activeSkill.id}
        onSelectSkill={(skill) => setActiveSkill(skill)}
      />

      {/* 
        4. TRANSPARENT INFINITE FLOWING MARQUEE (Showcasing Skill One-Liners)
        Dual tracks flowing in opposite directions with official logos, names, and quotes.
        100% transparent so background Three.js starfield particles drift right through.
      */}
      <SkillsMarquee
        activeSkillId={activeSkill.id}
        onSelectSkill={(skill) => setActiveSkill(skill)}
      />
    </section>
  );
};
