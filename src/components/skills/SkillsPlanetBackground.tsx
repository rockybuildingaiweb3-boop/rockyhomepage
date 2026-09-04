import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { SkillItem } from '../../data/skills';

interface SkillsPlanetBackgroundProps {
  activeSkill: SkillItem;
}

/**
 * SkillsPlanetBackground
 * 
 * Inspired by sanidhyy/space-portfolio:
 * Incorporates the cosmic planetary vortex video (/videos/skills-bg.webm)
 * with enhanced color saturation, multi-layered coronal nebula glows,
 * celestial orbital rings, and dynamic chromatic resonance matching the active skill.
 */
export const SkillsPlanetBackground: React.FC<SkillsPlanetBackgroundProps> = ({ activeSkill }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left - rect.width / 2;
      const clientY = e.clientY - rect.top - rect.height / 2;
      // Gentle parallax
      setMouseOffset({
        x: (clientX / rect.width) * 20,
        y: (clientY / rect.height) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const brandColor = activeSkill.brandColor || '#7042F8';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        LAYER 1: Deep Cosmic Space Ambient Nebula (Ultraviolet & Royal Indigo)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1200px] h-[650px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(112, 66, 248, 0.14) 0%, rgba(79, 70, 229, 0.08) 35%, rgba(6, 182, 212, 0.03) 60%, transparent 75%)',
          filter: 'blur(75px)',
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.4}px), calc(-50% + ${mouseOffset.y * 0.4}px))`,
          transition: 'transform 0.25s ease-out',
        }}
      />

      {/* 
        LAYER 2: Dynamic Chromatic Core Aura (Resonates with selected Skill)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[450px] pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${brandColor}24 0%, ${brandColor}10 35%, transparent 68%)`,
          filter: 'blur(60px)',
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.6}px), calc(-50% + ${mouseOffset.y * 0.6}px))`,
        }}
      />

      {/* 
        LAYER 3: Cosmic Accretion Halo / Orbital Rings
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px] rounded-full pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.5}px), calc(-50% + ${mouseOffset.y * 0.5}px)) rotate(-18deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Outer subtle orbital boundary ring */}
        <div className="absolute inset-0 rounded-full border border-purple-500/10 shadow-[0_0_30px_rgba(112,66,248,0.15)] animate-[spin_120s_linear_infinite]" />
        {/* Inner high-energy glowing ring */}
        <div
          className="absolute inset-[12%] rounded-full border border-cyan-400/15 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-[spin_90s_linear_infinite_reverse]"
          style={{
            borderColor: `${brandColor}25`,
            boxShadow: `0 0 25px ${brandColor}20`,
          }}
        />
      </div>

      {/* 
        LAYER 4: The Core Planetary Vortex (Gentle cosmic opacity so particles stay crisp)
      */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 75% 62% at 50% 50%, rgba(0, 0, 0, 0.85) 25%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.2) 75%, transparent 92%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 62% at 50% 50%, rgba(0, 0, 0, 0.85) 25%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.2) 75%, transparent 92%)',
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <video
          className="w-full h-auto min-h-full min-w-full object-cover opacity-45 sm:opacity-50 pointer-events-none select-none mix-blend-screen filter saturate-[1.25] contrast-[1.15] brightness-[0.92]"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/videos/skills-bg.webm"
        />
      </motion.div>

      {/* 
        LAYER 5: Stellar Core Corona Glints (Subtle cosmic specular sparkles)
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white blur-[2px] opacity-40 animate-pulse pointer-events-none"
        style={{
          transform: 'translate(-140px, -90px)',
          boxShadow: '0 0 20px 6px rgba(168, 85, 247, 0.5), 0 0 35px 12px rgba(6, 182, 212, 0.3)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-200 blur-[2px] opacity-35 animate-pulse pointer-events-none"
        style={{
          transform: 'translate(180px, 80px)',
          animationDelay: '1.2s',
          boxShadow: '0 0 15px 5px rgba(6, 182, 212, 0.4)',
        }}
      />
    </div>
  );
};
