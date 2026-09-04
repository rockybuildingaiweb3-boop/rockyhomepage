import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const SkillText: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center mb-8 sm:mb-10 md:mb-12 z-10 px-4">
      {/* Small futuristic glowing pill / eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-[#030014]/70 backdrop-blur-md shadow-[0_0_25px_rgba(112,66,248,0.25)] mb-4"
      >
        <Sparkles className="text-purple-300 w-4 h-4 animate-pulse" />
        <span className="text-[12px] sm:text-[13px] font-mono tracking-wider uppercase text-purple-200">
          Interactive Mechanical Skills Keyboard
        </span>
      </motion.div>

      {/* Main Title: Skills & Technologies */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white"
      >
        Skills & Technologies
      </motion.h2>

      {/* Elegant secondary statement */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        className="text-sm sm:text-base md:text-lg text-neutral-300 font-light mt-3 max-w-xl"
      >
        Every keycap represents a production technology. Click, hover, or press keys on your physical keyboard to inspect live architecture telemetry.
      </motion.p>
    </div>
  );
};
