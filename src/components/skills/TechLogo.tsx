import React from 'react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiSvelte,
  SiRemix,
  SiNuxt,
  SiAstro,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiPython,
  SiGraphql,
  SiTrpc,
  SiSocketdotio,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
  SiSupabase,
  SiFirebase,
  SiRedis,
  SiDocker,
  SiThreedotjs,
  SiWebgl,
  SiOpengl,
  SiBlender,
  SiFigma,
  SiRive,
  SiVercel,
  SiCloudflare,
  SiD3,
  SiEthereum,
} from 'react-icons/si';

interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
  isConceptual?: boolean;
}

/**
 * TechLogo
 * Renders 100% official brand vector marks using Simple Icons (react-icons/si)
 * and the official AWS Lambda vector architecture asset.
 * Zero hand-drawn approximations or generic shapes.
 */
export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = '',
  size = 56,
}) => {
  const pixelSize = `${size}px`;

  const renderBrand = (iconNode: React.ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {iconNode}
    </span>
  );

  switch (id) {
    // -----------------------------------------------------------------------
    // Core Web & Frameworks
    // -----------------------------------------------------------------------
    case 'html5':
      return renderBrand(<SiHtml5 size={size} color="#E34F26" />);

    case 'css3':
    case 'css':
      return renderBrand(<SiCss size={size} color="#1572B6" />);

    case 'javascript':
    case 'js':
      return renderBrand(<SiJavascript size={size} color="#F7DF1E" />);

    case 'typescript':
    case 'ts':
      return renderBrand(<SiTypescript size={size} color="#3178C6" />);

    case 'react':
      return renderBrand(<SiReact size={size} color="#61DAFB" />);

    case 'nextjs':
    case 'next':
      return renderBrand(<SiNextdotjs size={size} color="#FFFFFF" />);

    // -----------------------------------------------------------------------
    // Motion & Modern UI
    // -----------------------------------------------------------------------
    case 'tailwind':
    case 'tailwindcss':
      return renderBrand(<SiTailwindcss size={size} color="#38BDF8" />);

    case 'motion':
    case 'framer-motion':
      return renderBrand(<SiFramer size={size} color="#F550FA" />);

    case 'framer':
      return renderBrand(<SiFramer size={size} color="#0055FF" />);

    case 'gsap':
      return renderBrand(<SiGreensock size={size} color="#88CE02" />);

    case 'svelte':
      return renderBrand(<SiSvelte size={size} color="#FF3E00" />);

    case 'astro':
      return renderBrand(<SiAstro size={size} color="#FF5D01" />);

    case 'vite':
      return renderBrand(<SiVite size={size} color="#646CFF" />);

    case 'remix':
      return renderBrand(<SiRemix size={size} color="#E879F9" />);

    case 'nuxt':
      return renderBrand(<SiNuxt size={size} color="#00DC82" />);

    // -----------------------------------------------------------------------
    // Creative 3D & Graphics
    // -----------------------------------------------------------------------
    case 'threejs':
    case 'three':
      return renderBrand(<SiThreedotjs size={size} color="#FFFFFF" />);

    case 'webgl':
      return renderBrand(<SiWebgl size={size} color="#990000" />);

    case 'glsl':
      return renderBrand(<SiOpengl size={size} color="#5586A4" />);

    case 'blender':
      return renderBrand(<SiBlender size={size} color="#E87D0D" />);

    case 'figma':
      return renderBrand(<SiFigma size={size} color="#F24E1E" />);

    case 'd3':
      return renderBrand(<SiD3 size={size} color="#F9A03F" />);

    case 'rive':
      return renderBrand(<SiRive size={size} color="#FF5D01" />);

    // -----------------------------------------------------------------------
    // Backend & Systems
    // -----------------------------------------------------------------------
    case 'nodejs':
    case 'node':
      return renderBrand(<SiNodedotjs size={size} color="#5FA04E" />);

    case 'express':
      return renderBrand(<SiExpress size={size} color="#FFFFFF" />);

    case 'graphql':
      return renderBrand(<SiGraphql size={size} color="#E10098" />);

    case 'trpc':
      return renderBrand(<SiTrpc size={size} color="#2563EB" />);

    case 'socketio':
      return renderBrand(<SiSocketdotio size={size} color="#FFFFFF" />);

    case 'python':
      return renderBrand(<SiPython size={size} color="#3776AB" />);

    case 'php':
      return renderBrand(<SiPhp size={size} color="#777BB4" />);

    // -----------------------------------------------------------------------
    // Data & Cloud Infrastructure
    // -----------------------------------------------------------------------
    case 'postgresql':
    case 'postgres':
      return renderBrand(<SiPostgresql size={size} color="#4169E1" />);

    case 'mysql':
      return renderBrand(<SiMysql size={size} color="#4479A1" />);

    case 'supabase':
      return renderBrand(<SiSupabase size={size} color="#3ECF8E" />);

    case 'firebase':
      return renderBrand(<SiFirebase size={size} color="#FFCA28" />);

    case 'mongodb':
      return renderBrand(<SiMongodb size={size} color="#47A248" />);

    case 'redis':
      return renderBrand(<SiRedis size={size} color="#DC382D" />);

    case 'prisma':
      return renderBrand(<SiPrisma size={size} color="#5A67D8" />);

    case 'drizzle':
      return renderBrand(<SiDrizzle size={size} color="#C5F74F" />);

    case 'docker':
      return renderBrand(<SiDocker size={size} color="#2496ED" />);

    case 'aws-lambda':
    case 'lambda':
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 p-1 ${className}`}
          style={{ width: pixelSize, height: pixelSize }}
        >
          <img
            src="/assets/imgs/svg-icons/aws-lambda.svg"
            alt="AWS Lambda"
            width={size}
            height={size}
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,153,0,0.3)]"
          />
        </span>
      );

    case 'cloudflare':
      return renderBrand(<SiCloudflare size={size} color="#F38020" />);

    case 'vercel':
      return renderBrand(<SiVercel size={size} color="#FFFFFF" />);

    case 'ethereum':
      return renderBrand(<SiEthereum size={size} color="#627EEA" />);

    // Fallback
    default:
      return renderBrand(
        <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
          {id.slice(0, 3)}
        </span>
      );
  }
};
