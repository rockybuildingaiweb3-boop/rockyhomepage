import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { SKILLS_DATA, SkillItem, PROJECT_NAMES } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface KeyConfig {
  keyChar: string;
  displayLabel: string;
  skillId?: string;
  name?: string;
  brandColor?: string;
  widthClass?: string;
  isModifier?: boolean;
}

interface SkillsKeyboardProps {
  onSelectSkill: (skill: SkillItem) => void;
  onSelectProject?: (projectId: string) => void;
}

const SKILL_MAP = new Map<string, SkillItem>(
  SKILLS_DATA.map((item) => [item.id, item])
);

/**
 * 5-Row Mechanical Keyboard Layout Definition
 * With authentic mechanical spacing, stabilizers, and official brand mappings
 */
const KEYBOARD_ROWS: KeyConfig[][] = [
  // ROW 1: Function / Number Row (Core Web & Modern Frameworks)
  [
    { keyChar: 'Escape', displayLabel: 'ESC', isModifier: true, widthClass: 'w-10 sm:w-12 md:w-14' },
    { keyChar: '1', displayLabel: '1', skillId: 'react', name: 'React', brandColor: '#61DAFB' },
    { keyChar: '2', displayLabel: '2', skillId: 'nextjs', name: 'Next.js', brandColor: '#FFFFFF' },
    { keyChar: '3', displayLabel: '3', skillId: 'typescript', name: 'TypeScript', brandColor: '#3178C6' },
    { keyChar: '4', displayLabel: '4', skillId: 'javascript', name: 'JavaScript', brandColor: '#F7DF1E' },
    { keyChar: '5', displayLabel: '5', skillId: 'html5', name: 'HTML5', brandColor: '#E34F26' },
    { keyChar: '6', displayLabel: '6', skillId: 'css3', name: 'CSS3', brandColor: '#1572B6' },
    { keyChar: '7', displayLabel: '7', skillId: 'vite', name: 'Vite', brandColor: '#646CFF' },
    { keyChar: '8', displayLabel: '8', skillId: 'astro', name: 'Astro', brandColor: '#BC52EE' },
    { keyChar: '9', displayLabel: '9', skillId: 'remix', name: 'Remix', brandColor: '#E8ECF2' },
    { keyChar: '0', displayLabel: '0', skillId: 'nuxt', name: 'Nuxt', brandColor: '#00DC82' },
    { keyChar: '-', displayLabel: '-', skillId: 'svelte', name: 'Svelte', brandColor: '#FF3E00' },
    { keyChar: 'Backspace', displayLabel: 'DEL', isModifier: true, widthClass: 'w-12 sm:w-14 md:w-16' },
  ],
  // ROW 2: QWERTY Row (Graphics, Motion, 3D & Design Systems)
  [
    { keyChar: 'Tab', displayLabel: 'TAB', isModifier: true, widthClass: 'w-11 sm:w-13 md:w-15' },
    { keyChar: 'q', displayLabel: 'Q', skillId: 'tailwind', name: 'Tailwind', brandColor: '#38BDF8' },
    { keyChar: 'w', displayLabel: 'W', skillId: 'motion', name: 'Motion', brandColor: '#EA4C89' },
    { keyChar: 'e', displayLabel: 'E', skillId: 'gsap', name: 'GSAP', brandColor: '#88CE02' },
    { keyChar: 'r', displayLabel: 'R', skillId: 'threejs', name: 'Three.js', brandColor: '#FFFFFF' },
    { keyChar: 't', displayLabel: 'T', skillId: 'webgl', name: 'WebGL', brandColor: '#990000' },
    { keyChar: 'y', displayLabel: 'Y', skillId: 'glsl', name: 'GLSL', brandColor: '#5586A4' },
    { keyChar: 'u', displayLabel: 'U', skillId: 'blender', name: 'Blender', brandColor: '#F5792A' },
    { keyChar: 'i', displayLabel: 'I', skillId: 'figma', name: 'Figma', brandColor: '#F24E1E' },
    { keyChar: 'o', displayLabel: 'O', skillId: 'd3', name: 'D3.js', brandColor: '#F9A03C' },
    { keyChar: 'p', displayLabel: 'P', skillId: 'rive', name: 'Rive', brandColor: '#FC5247' },
    { keyChar: '[', displayLabel: '[', skillId: 'canvas', name: 'Canvas', brandColor: '#FF6B6B' },
    { keyChar: ']', displayLabel: ']', skillId: 'shader', name: 'Shaders', brandColor: '#A855F7' },
  ],
  // ROW 3: ASDF / Home Row (Backend, Runtimes & Distributed APIs)
  [
    { keyChar: 'CapsLock', displayLabel: 'CAPS', isModifier: true, widthClass: 'w-12 sm:w-15 md:w-18' },
    { keyChar: 'a', displayLabel: 'A', skillId: 'nodejs', name: 'Node.js', brandColor: '#5FA04E' },
    { keyChar: 's', displayLabel: 'S', skillId: 'express', name: 'Express', brandColor: '#FFFFFF' },
    { keyChar: 'd', displayLabel: 'D', skillId: 'python', name: 'Python', brandColor: '#3776AB' },
    { keyChar: 'f', displayLabel: 'F', skillId: 'php', name: 'PHP', brandColor: '#777BB4' },
    { keyChar: 'g', displayLabel: 'G', skillId: 'graphql', name: 'GraphQL', brandColor: '#E10098' },
    { keyChar: 'h', displayLabel: 'H', skillId: 'trpc', name: 'tRPC', brandColor: '#2596BE' },
    { keyChar: 'j', displayLabel: 'J', skillId: 'socketio', name: 'Socket.IO', brandColor: '#FFFFFF' },
    { keyChar: 'k', displayLabel: 'K', skillId: 'docker', name: 'Docker', brandColor: '#2496ED' },
    { keyChar: 'l', displayLabel: 'L', skillId: 'fastapi', name: 'FastAPI', brandColor: '#009688' },
    { keyChar: ';', displayLabel: ';', skillId: 'ethereum', name: 'Web3', brandColor: '#627EEA' },
    { keyChar: 'Enter', displayLabel: 'ENTER ↵', isModifier: true, widthClass: 'w-14 sm:w-18 md:w-22' },
  ],
  // ROW 4: ZXCV Row (Databases, Cloud & Infrastructure)
  [
    { keyChar: 'Shift', displayLabel: 'SHIFT', isModifier: true, widthClass: 'w-14 sm:w-18 md:w-22' },
    { keyChar: 'z', displayLabel: 'Z', skillId: 'postgresql', name: 'PostgreSQL', brandColor: '#4169E1' },
    { keyChar: 'x', displayLabel: 'X', skillId: 'mysql', name: 'MySQL', brandColor: '#4479A1' },
    { keyChar: 'c', displayLabel: 'C', skillId: 'supabase', name: 'Supabase', brandColor: '#3ECF8E' },
    { keyChar: 'v', displayLabel: 'V', skillId: 'firebase', name: 'Firebase', brandColor: '#FFCA28' },
    { keyChar: 'b', displayLabel: 'B', skillId: 'mongodb', name: 'MongoDB', brandColor: '#47A248' },
    { keyChar: 'n', displayLabel: 'N', skillId: 'redis', name: 'Redis', brandColor: '#DC382D' },
    { keyChar: 'm', displayLabel: 'M', skillId: 'prisma', name: 'Prisma', brandColor: '#2D3748' },
    { keyChar: ',', displayLabel: ',', skillId: 'drizzle', name: 'Drizzle', brandColor: '#C5F74F' },
    { keyChar: '.', displayLabel: '.', skillId: 'aws', name: 'AWS Lambda', brandColor: '#FF9900' },
    { keyChar: '/', displayLabel: '/', skillId: 'vercel', name: 'Vercel', brandColor: '#FFFFFF' },
    { keyChar: 'ShiftRight', displayLabel: 'SHIFT', isModifier: true, widthClass: 'w-14 sm:w-18 md:w-20' },
  ],
  // ROW 5: Spacebar & Custom Modifiers Row
  [
    { keyChar: 'Control', displayLabel: 'CTRL', isModifier: true, widthClass: 'w-11 sm:w-13 md:w-15' },
    { keyChar: 'Alt', displayLabel: 'ALT', isModifier: true, widthClass: 'w-11 sm:w-13 md:w-15' },
    {
      keyChar: ' ',
      displayLabel: 'SPACE // ROCKY BABCOCK • FULL-STACK ARCHITECTURE',
      skillId: 'react',
      name: 'Full-Stack Architecture',
      brandColor: '#7042F8',
      widthClass: 'flex-1 min-w-[150px]',
    },
    { keyChar: 'cloudflare', displayLabel: 'CF', skillId: 'cloudflare', name: 'Cloudflare', brandColor: '#F38020', widthClass: 'w-11 sm:w-13 md:w-15' },
    { keyChar: 'Meta', displayLabel: 'CMD', isModifier: true, widthClass: 'w-11 sm:w-13 md:w-15' },
  ],
];

/**
 * Mechanical Keyboard Switch Sound Synthesizer (Web Audio API)
 * Simulates high-precision mechanical linear/tactile switch actuation
 */
function playSwitchSound(pitch = 1) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // High click click frequency
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1300 * pitch, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.035);
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.04);

    // Deep housing clack
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(200 * pitch, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    osc2.stop(ctx.currentTime + 0.055);
  } catch {
    // AudioContext suspended or restricted
  }
}

export const SkillsKeyboard: React.FC<SkillsKeyboardProps> = ({
  onSelectSkill,
  onSelectProject,
}) => {
  // Current active/hovered skill
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(() => {
    return SKILL_MAP.get('react') || SKILLS_DATA[0] || null;
  });

  // Set of actively pressed physical/virtual keys
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Interactive toggles
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [is3DMode, setIs3DMode] = useState(true);

  // Parallax tilt angles
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  // Trigger key actuation
  const handleKeyActuation = useCallback(
    (keyConfig: KeyConfig) => {
      if (soundEnabled) {
        playSwitchSound(0.92 + Math.random() * 0.16);
      }

      if (keyConfig.skillId) {
        const found = SKILL_MAP.get(keyConfig.skillId);
        if (found) {
          setActiveSkill(found);
        }
      }

      // Add to pressed state for realistic tactile depression
      const k = keyConfig.keyChar.toLowerCase();
      setPressedKeys((prev) => new Set(prev).add(k));
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(k);
          return next;
        });
      }, 160);
    },
    [soundEnabled]
  );

  // Real physical keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const lower = e.key.toLowerCase();
      let match: KeyConfig | null = null;

      for (const row of KEYBOARD_ROWS) {
        for (const k of row) {
          if (
            k.keyChar.toLowerCase() === lower ||
            (k.keyChar === ' ' && e.code === 'Space') ||
            (k.keyChar === 'Escape' && e.key === 'Escape')
          ) {
            match = k;
            break;
          }
        }
        if (match) break;
      }

      if (match) {
        handleKeyActuation(match);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyActuation]);

  // Dynamic 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DMode || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: normX * 12, y: -normY * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[1140px] mx-auto flex flex-col items-center select-none"
    >
      {/* ----------------------------------------------------------------- */}
      {/* TRANSLUCENT FLOATING HUD TELEMETRY BANNER                          */}
      {/* Ultra-light glass island allowing the nebula video to shine through */}
      {/* ----------------------------------------------------------------- */}
      <div className="w-full max-w-2xl px-3 mb-6 sm:mb-8">
        <div className="relative w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3.5 sm:p-4.5 shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

          <div className="flex items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1"
                >
                  {/* Glowing Logo Icon */}
                  <div
                    className="relative shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center p-2 border border-white/15 bg-white/[0.04]"
                    style={{
                      boxShadow: `0 0 25px ${activeSkill.brandColor || '#a855f7'}33`,
                    }}
                  >
                    <TechLogo id={activeSkill.id} size={32} />
                  </div>

                  {/* Text & Role */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base sm:text-lg font-light text-white tracking-tight truncate">
                        {activeSkill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 truncate">
                        {activeSkill.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-light truncate">
                      {activeSkill.positioning || activeSkill.role}
                    </p>
                  </div>

                  {/* Action: Open Inspector */}
                  <button
                    type="button"
                    onClick={() => onSelectSkill(activeSkill)}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-purple-400/50 bg-white/5 hover:bg-purple-500/20 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>HOVER OR PRESS ANY KEYCAP TO ACTUATE</span>
                </div>
              )}
            </AnimatePresence>

            {/* Quick Controls: 3D Toggle & Sound Toggle */}
            <div className="flex items-center gap-1.5 shrink-0 border-l border-white/10 pl-3">
              <button
                type="button"
                onClick={() => setIs3DMode(!is3DMode)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  is3DMode
                    ? 'border-purple-500/40 bg-purple-500/15 text-purple-200'
                    : 'border-white/10 bg-white/5 text-neutral-400'
                }`}
                title="Toggle 3D Perspective"
              >
                <Compass className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : 'border-white/10 bg-white/5 text-neutral-500'
                }`}
                title="Toggle Switch Sound"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TRANSLUCENT 3D GLASS MECHANICAL KEYBOARD CHASSIS                  */}
      {/* Allows the swirling purple nebula video to flow freely behind it!  */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="w-full flex justify-center overflow-x-auto pb-8 px-2 custom-scrollbar"
        style={{ perspective: is3DMode ? '1300px' : 'none' }}
      >
        <div
          className="relative rounded-3xl p-3 sm:p-4 md:p-5 transition-transform duration-200 ease-out shrink-0"
          style={{
            // Translucent smoked glass chassis with subtle frosted refraction
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(112, 66, 248, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            transform: is3DMode
              ? `rotateX(${20 + tilt.y}deg) rotateY(${tilt.x}deg)`
              : 'none',
            transformStyle: 'preserve-3d',
            minWidth: '780px',
          }}
        >
          {/* Subtle Switch Plate Inner Rim */}
          <div className="absolute inset-1.5 rounded-2xl border border-white/[0.05] pointer-events-none -z-10" />

          {/* 5 Rows of Mechanical Keycaps */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center gap-1.5 sm:gap-2">
                {row.map((keyConfig, kIdx) => {
                  const isPressed = pressedKeys.has(keyConfig.keyChar.toLowerCase());
                  const isActive = activeSkill?.id === keyConfig.skillId;
                  const brandColor = keyConfig.brandColor || '#7042F8';

                  return (
                    <button
                      key={kIdx}
                      type="button"
                      onClick={() => {
                        handleKeyActuation(keyConfig);
                        if (keyConfig.skillId) {
                          const found = SKILL_MAP.get(keyConfig.skillId);
                          if (found) onSelectSkill(found);
                        }
                      }}
                      onMouseEnter={() => {
                        if (keyConfig.skillId) {
                          const found = SKILL_MAP.get(keyConfig.skillId);
                          if (found) setActiveSkill(found);
                        }
                      }}
                      className={`
                        group relative flex flex-col items-center justify-between
                        h-12 sm:h-14 md:h-16
                        rounded-xl transition-all duration-100 ease-out cursor-pointer
                        ${keyConfig.widthClass || 'flex-1 min-w-[44px] sm:min-w-[50px] md:min-w-[56px]'}
                        ${
                          isPressed
                            ? 'translate-y-[4px] shadow-[0_1px_0_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6)]'
                            : 'shadow-[0_4px_0_rgba(0,0,0,0.65),0_6px_14px_rgba(0,0,0,0.5)]'
                        }
                        ${
                          isActive
                            ? 'border-purple-400/90'
                            : 'border-white/10 hover:border-white/30'
                        }
                      `}
                      style={{
                        // Frosted translucent keycap glass
                        background: isActive
                          ? `radial-gradient(circle at 50% 50%, ${brandColor}22 0%, rgba(255,255,255,0.06) 100%)`
                          : keyConfig.isModifier
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(255, 255, 255, 0.045)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        borderWidth: '1px',
                        boxShadow: isActive
                          ? `0 0 25px ${brandColor}88, inset 0 0 12px ${brandColor}44, 0 4px 0 rgba(0,0,0,0.8), 0 6px 14px rgba(0,0,0,0.6)`
                          : undefined,
                      }}
                      aria-label={keyConfig.name || keyConfig.displayLabel}
                    >
                      {/* Top Keycap Face Inset Highlight */}
                      <div className="absolute inset-[2px] rounded-lg border border-white/[0.08] pointer-events-none" />

                      {/* Top Row inside Keycap: Printed Letter/Legend */}
                      <div className="w-full px-2 pt-1.5 flex items-center justify-between pointer-events-none">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-tighter ${
                            isActive
                              ? 'text-white'
                              : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          {keyConfig.displayLabel}
                        </span>

                        {/* Translucent LED underglow dot */}
                        {keyConfig.skillId && (
                          <span
                            className="w-1.5 h-1.5 rounded-full transition-opacity duration-150"
                            style={{
                              backgroundColor: isActive ? brandColor : 'rgba(255,255,255,0.2)',
                              boxShadow: isActive ? `0 0 8px ${brandColor}` : 'none',
                              opacity: isActive ? 1 : 0.4,
                            }}
                          />
                        )}
                      </div>

                      {/* Center of Keycap: Official Tech Vector Logo */}
                      <div className="flex-1 flex items-center justify-center p-0.5 pointer-events-none">
                        {keyConfig.skillId ? (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center transition-transform group-hover:scale-110">
                            <TechLogo
                              id={keyConfig.skillId}
                              size={24}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] sm:text-xs font-mono text-neutral-400">
                            {keyConfig.displayLabel.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      {/* Bottom Legend: Tech Name snippet */}
                      <div className="w-full px-1.5 pb-1 text-center pointer-events-none">
                        {keyConfig.name && (
                          <span className="block text-[8px] sm:text-[9px] font-mono text-neutral-400 group-hover:text-neutral-200 truncate leading-none">
                            {keyConfig.name}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom Chassis Legend */}
          <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="tracking-widest">
              TRANSLUCENT ACRYLIC CHASSIS • SMOKED GLASS KEYCAPS
            </span>
            <span className="text-purple-400/90">
              CLICK KEYCAP OR HIT PHYSICAL KEYBOARD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
