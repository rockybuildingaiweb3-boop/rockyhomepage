import React, { useState } from 'react';
import { SkillItem } from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillsKeyboard } from './skills/SkillsKeyboard';
import { SkillDetailDrawer } from './skills/SkillDetailDrawer';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-32 md:pb-40 px-3 sm:px-6 md:px-10 lg:px-12 text-white z-10 bg-transparent overflow-x-clip"
      aria-label="Skills Mechanical Keyboard"
    >
      {/* 
        WORK → SKILLS SPATIAL ATMOSPHERIC BRIDGE
        Soft cosmic radial aura that bridges smoothly between the Work horizontal slider
        and the Skills section.
      */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[450px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(112, 66, 248, 0.12) 0%, rgba(79, 70, 229, 0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* 
        LAYER 2: Central Purple Nebula Video Background
        Feathered using a RADIAL ELLIPTICAL MASK so all 4 edges fade 100% to transparent.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.25) 60%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.25) 60%, transparent 80%)',
        }}
      >
        <video
          className="w-full h-auto min-h-full min-w-full object-cover opacity-55 pointer-events-none select-none"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/videos/skills-bg.webm"
        />
      </div>

      {/* Controlled Purple Spatial Atmosphere Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[70vh] max-h-[700px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(112, 66, 248, 0.14) 0%, rgba(147, 51, 234, 0.04) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      {/* Header Typography */}
      <SkillText />

      {/* 
        3D INTERACTIVE MECHANICAL KEYBOARD SKILLS SHOWCASE
        Inspired by Naresh-Khatri 3D developer portfolio.
        Every keycap is a skill with official brand logos, tactile sound synthesis,
        and real-time cybernetic OLED telemetry readout!
      */}
      <div className="w-full z-10">
        <SkillsKeyboard
          onSelectSkill={(skill) => setSelectedSkill(skill)}
          onSelectProject={onSelectProject}
        />
      </div>

      {/* Deep-Dive Expandable Blueprint Inspector Modal */}
      <SkillDetailDrawer
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};
