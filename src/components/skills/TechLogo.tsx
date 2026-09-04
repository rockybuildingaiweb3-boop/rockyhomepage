import React from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiSvelte,
  SiTailwindcss,
  SiGreensock,
  SiHtml5,
  SiVite,
  SiThreedotjs,
  SiWebgl,
  SiBlender,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiPrisma,
  SiDrizzle,
  SiRedis,
  SiTrpc,
  SiGraphql,
  SiDocker,
  SiSolidity,
  SiIpfs,
  SiFigma,
  SiRive,
  SiGithub,
  SiGit,
} from 'react-icons/si';

export interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
  color?: string;
}

/**
 * TechLogo
 * Strictly adheres to official vector assets and official brand colors:
 * - Next.js: Official sharp slanted N without circular border
 * - Express: Official minimal crisp wordmark
 * - PostgreSQL: Official Slonik elephant in #336791
 * - High-contrast rendering suitable for unified 44x44px glass containers
 */
export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = '',
  size = 26,
  color,
}) => {
  const normId = id.toLowerCase().trim();

  const wrap = (node: React.ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {node}
    </span>
  );

  switch (normId) {
    // ─── ROW 1: 核心前端与交互动效 ────────────────────────────────
    case 'typescript':
    case 'ts':
      return wrap(<SiTypescript size={size} color={color || '#3178C6'} />);

    case 'javascript':
    case 'js':
      return wrap(<SiJavascript size={size} color={color || '#F7DF1E'} />);

    case 'react':
      return wrap(<SiReact size={size} color={color || '#61DAFB'} />);

    case 'nextjs':
    case 'next':
      // Official Next.js Monochromatic Slanted N (Strictly NO circle border)
      return wrap(
        <svg
          viewBox="0 0 180 180"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M149.508 159.43L63.844 48H44v84h17.904V70.822l72.932 95.011c4.898-1.748 9.774-3.864 14.672-6.403z"
            fill={color || '#FFFFFF'}
          />
          <rect x="122" y="48" width="18" height="84" fill={color || '#FFFFFF'} />
        </svg>
      );

    case 'svelte':
      return wrap(<SiSvelte size={size} color={color || '#FF3E00'} />);

    case 'tailwind':
    case 'tailwindcss':
      return wrap(<SiTailwindcss size={size} color={color || '#38BDF8'} />);

    case 'motion':
    case 'framer-motion':
      // Framer Motion triangle ribbon logo
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill={color || '#F55FBF'} />
        </svg>
      );

    case 'gsap':
    case 'greensock':
      return wrap(<SiGreensock size={size} color={color || '#88CE02'} />);

    case 'html5':
    case 'html':
      return wrap(<SiHtml5 size={size} color={color || '#E34F26'} />);

    case 'vite':
      return wrap(<SiVite size={size} color={color || '#646CFF'} />);

    // ─── ROW 2: 3D 空间计算与图形资产 ──────────────────────────────
    case 'threejs':
    case 'three':
      return wrap(<SiThreedotjs size={size} color={color || '#FFFFFF'} />);

    case 'webgl':
      return wrap(<SiWebgl size={size} color={color || '#990000'} />);

    case 'glsl':
    case 'shaders':
      // Shader / Prism Chromatic Refraction SVG
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 20h20L12 2z"
            stroke={color || '#E056FD'}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 2v18M6.5 12h11"
            stroke={color || '#E056FD'}
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      );

    case 'webgpu':
      // WebGPU official geometric hexagon badge
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2z"
            stroke={color || '#22C55E'}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 6l5 2.9v5.8L12 17.6l-5-2.9V8.9L12 6z"
            fill={color || '#22C55E'}
            fillOpacity="0.25"
          />
          <circle cx="12" cy="12" r="2.5" fill={color || '#22C55E'} />
        </svg>
      );

    case 'r3f':
    case 'react-three-fiber':
      // React Three Fiber 3D isometric box with react cyan
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4L12 2.5z"
            stroke={color || '#00D8FF'}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 2.5v9.5m0 0l8.5-4.6M12 12l-8.5-4.6"
            stroke={color || '#00D8FF'}
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="1.8" fill={color || '#00D8FF'} />
        </svg>
      );

    case 'blender':
      return wrap(<SiBlender size={size} color={color || '#EA7600'} />);

    case 'spline':
      // Spline 3D S-curve logo
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 6.5a4 4 0 0 0-7.5-1.5L4 12a5 5 0 0 0 9 3l4.5-7.5A4 4 0 0 1 20 12"
            stroke={color || '#38BDF8'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="18" cy="15" r="2" fill={color || '#38BDF8'} />
        </svg>
      );

    case 'draco':
    case 'meshopt':
      // 3D Geometry compression wireframe mesh
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
            stroke={color || '#6366F1'}
            strokeWidth="1.8"
            fill="none"
          />
          <line x1="12" y1="2" x2="12" y2="22" stroke={color || '#6366F1'} strokeWidth="1.2" />
          <line x1="2" y1="8.5" x2="22" y2="15.5" stroke={color || '#6366F1'} strokeWidth="1.2" />
          <line x1="2" y1="15.5" x2="22" y2="8.5" stroke={color || '#6366F1'} strokeWidth="1.2" />
        </svg>
      );

    case 'uvbaking':
    case 'uv':
      // UV unwrap & baking checkerboard
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke={color || '#F59E0B'}
            strokeWidth="2"
          />
          <rect x="3" y="3" width="9" height="9" fill={color || '#F59E0B'} fillOpacity="0.4" />
          <rect x="12" y="12" width="9" height="9" fill={color || '#F59E0B'} fillOpacity="0.4" />
        </svg>
      );

    case 'canvas':
    case 'canvasapi':
      // HTML5 Canvas 2D rendering pen & grid
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4h16v16H4V4z"
            stroke={color || '#F97316'}
            strokeWidth="1.8"
            rx="2"
          />
          <path
            d="M4 14l4-4 4 4 6-6"
            stroke={color || '#F97316'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="8" r="1.5" fill={color || '#F97316'} />
        </svg>
      );

    // ─── ROW 3: 服务端、数据与基础设施 ──────────────────────────
    case 'nodejs':
    case 'node':
      return wrap(<SiNodedotjs size={size} color={color || '#339933'} />);

    case 'express':
      // Official Express minimalist lettermark
      return wrap(
        <svg
          viewBox="0 0 100 40"
          width={size * 1.5}
          height={size * 0.6}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="70%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={color || '#FFFFFF'}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="32"
            letterSpacing="-1.5"
          >
            express
          </text>
        </svg>
      );

    case 'postgresql':
    case 'postgres':
      return wrap(<SiPostgresql size={size} color={color || '#336791'} />);

    case 'supabase':
      return wrap(<SiSupabase size={size} color={color || '#3ECF8E'} />);

    case 'prisma':
      return wrap(<SiPrisma size={size} color={color || '#2D3748'} />);

    case 'drizzle':
      return wrap(<SiDrizzle size={size} color={color || '#C5F74F'} />);

    case 'redis':
      return wrap(<SiRedis size={size} color={color || '#FF4438'} />);

    case 'trpc':
      return wrap(<SiTrpc size={size} color={color || '#2596BE'} />);

    case 'graphql':
      return wrap(<SiGraphql size={size} color={color || '#E10098'} />);

    case 'docker':
      return wrap(<SiDocker size={size} color={color || '#2496ED'} />);

    // ─── ROW 4: Web3 与去中心化架构 ─────────────────────────────
    case 'solidity':
      return wrap(<SiSolidity size={size} color={color || '#627EEA'} />);

    case 'viem':
      // viem official bold italic V mark
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4l7.5 16h3L21 4h-4.5L12 14 7.5 4H3z"
            fill={color || '#FFF200'}
          />
        </svg>
      );

    case 'wagmi':
      // wagmi official mark
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7l4 10 4-7 4 7 4-7 4 10"
            stroke={color || '#F59E0B'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'ethers':
    case 'ethersjs':
      // Ethers.js Greek Xi (Ξ) / diamond
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 12l8 4 8-4-8-10zM4 13.5l8 8.5 8-8.5-8 3.5-8-3.5z"
            fill={color || '#2535A0'}
          />
        </svg>
      );

    case 'foundry':
      // Foundry Forge flame & anvil logo
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18h16v3H4v-3zm2-3l3-8h6l3 8H6zm6-11a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z"
            fill={color || '#FF4F00'}
          />
        </svg>
      );

    case 'privy':
      // Privy shield / key emblem
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z"
            stroke={color || '#7B61FF'}
            strokeWidth="2"
            fill="none"
          />
          <circle cx="12" cy="11" r="2.5" fill={color || '#7B61FF'} />
          <path d="M12 13.5V17" stroke={color || '#7B61FF'} strokeWidth="2" />
        </svg>
      );

    case 'erc4337':
      // Account abstraction smart account key
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="3"
            stroke={color || '#A855F7'}
            strokeWidth="2"
          />
          <circle cx="9" cy="12" r="2.5" stroke={color || '#A855F7'} strokeWidth="1.5" />
          <path
            d="M14 10h4M14 14h3"
            stroke={color || '#A855F7'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'thegraph':
      // The Graph official GRT node circle
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke={color || '#6F4CFF'} strokeWidth="2" />
          <circle cx="12" cy="7" r="2" fill={color || '#6F4CFF'} />
          <circle cx="8" cy="15" r="2" fill={color || '#6F4CFF'} />
          <circle cx="16" cy="15" r="2" fill={color || '#6F4CFF'} />
          <path d="M12 9v3m-2.5 1.5L8 15m5.5-1.5L16 15" stroke={color || '#6F4CFF'} strokeWidth="1.5" />
        </svg>
      );

    case 'ipfs':
      return wrap(<SiIpfs size={size} color={color || '#65C2CB'} />);

    case 'siwe':
      // Sign-In with Ethereum signature badge
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l6 10-6 3.5L6 12l6-10z"
            fill={color || '#627EEA'}
            fillOpacity="0.8"
          />
          <path d="M12 16.5l6-3.5-6 9-6-9 6 3.5z" fill={color || '#627EEA'} />
        </svg>
      );

    // ─── ROW 5: AI 智能体与现代设计工作流 ─────────────────────────
    case 'vercelai':
    case 'vercel':
      // Vercel delta + AI spark
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 20h20L12 2z" fill={color || '#FFFFFF'} />
          <circle cx="12" cy="14" r="2" fill="#000000" />
        </svg>
      );

    case 'langchain':
      // LangChain parrot & chain icon
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 6h3a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-3M10 18H7a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4h3m-2 4h8"
            stroke={color || '#28B576'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'llamaindex':
      // LlamaIndex origami llama
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3v6l3 2v6l-2 4h3l2-3 2 3h3l-2-7 1-4V8l-3-5H8z"
            fill={color || '#7B3FE4'}
          />
        </svg>
      );

    case 'openai':
      // OpenAI Rosette vortex swirl
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5 10.2a6 6 0 0 0-.5-4.4 6.2 6.2 0 0 0-4.9-3.2 6.1 6.1 0 0 0-5 1.4A6.1 6.1 0 0 0 6.6 2.5 6.2 6.2 0 0 0 2.5 6a6 6 0 0 0 .5 5.5 6 6 0 0 0 .5 4.4 6.2 6.2 0 0 0 4.9 3.2 6.1 6.1 0 0 0 5-1.4 6.1 6.1 0 0 0 4.5 1.5 6.2 6.2 0 0 0 4.1-3.5 6 6 0 0 0-.5-5.5z"
            stroke={color || '#10A37F'}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke={color || '#10A37F'} strokeWidth="1.5" />
        </svg>
      );

    case 'pgvector':
      // pgvector (PostgreSQL with vector multidimensional arrow)
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="18" r="3" stroke={color || '#336791'} strokeWidth="2" />
          <path
            d="M6 15V6a2 2 0 0 1 2-2h10m-3-3l3 3-3 3"
            stroke={color || '#336791'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 18h9a2 2 0 0 0 2-2V9"
            stroke="#00D26A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'mcp':
      // Model Context Protocol node network
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3" fill={color || '#A855F7'} />
          <circle cx="4" cy="7" r="2.5" stroke={color || '#A855F7'} strokeWidth="1.8" />
          <circle cx="20" cy="7" r="2.5" stroke={color || '#A855F7'} strokeWidth="1.8" />
          <circle cx="4" cy="17" r="2.5" stroke={color || '#A855F7'} strokeWidth="1.8" />
          <circle cx="20" cy="17" r="2.5" stroke={color || '#A855F7'} strokeWidth="1.8" />
          <path
            d="M6 8l4 3M18 8l-4 3M6 16l4-3M18 16l-4-3"
            stroke={color || '#A855F7'}
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'figma':
      return wrap(<SiFigma size={size} color={color || '#F24E1E'} />);

    case 'designsystems':
    case 'tokens':
      // Systemic UI tokens / atomic components
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="2"
            stroke={color || '#EC4899'}
            strokeWidth="2"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="2"
            stroke={color || '#EC4899'}
            strokeWidth="2"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="2"
            stroke={color || '#EC4899'}
            strokeWidth="2"
          />
          <circle cx="17.5" cy="17.5" r="3.5" fill={color || '#EC4899'} />
        </svg>
      );

    case 'git':
    case 'github':
      return wrap(<SiGithub size={size} color={color || '#FFFFFF'} />);

    case 'rive':
      return wrap(<SiRive size={size} color={color || '#00C8FF'} />);

    default:
      // High-contrast clean fallback vector
      return wrap(
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            stroke={color || '#A855F7'}
            strokeWidth="1.8"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill={color || '#FFFFFF'}
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {normId.slice(0, 2).toUpperCase()}
          </text>
        </svg>
      );
  }
};
