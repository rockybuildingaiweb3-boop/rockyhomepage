import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  scrollY?: number;
}

/**
 * Generates uniform points within a 3D sphere of given radius.
 * Directly matches the mathematical distribution used by Space-Portfolio (maath.random.inSphere).
 */
function generateSpherePoints(count: number, radius = 1.25): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Runtime scroll ref so animation loop reads high-frequency updates without recreating Three.js scene
  const scrollYRef = useRef(scrollY);
  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  // Subtle mouse tracking for delicate spatial parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number | null = null;
    let isCleanedUp = false;

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    // Space-Portfolio reference scale: ~5000 points
    const starCount = isMobile ? 1800 : isTablet ? 3200 : 5000;
    const positions = generateSpherePoints(starCount, 1.25);

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let starGroup: THREE.Group | null = null;
    let starPoints: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;

    let useWebGL = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (gl) {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.pointerEvents = 'none';
        renderer.domElement.className = 'particle-canvas';
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 1.0;

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Space-Portfolio standard star particle material:
        // Pure white, small point size (0.002), size attenuation, depthWrite disabled
        material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: isMobile ? 0.0022 : 0.0019,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.82,
          depthWrite: false,
        });

        starPoints = new THREE.Points(geometry, material);

        // Initial rotation tilt matching Space-Portfolio (Math.PI / 4 on z)
        starGroup = new THREE.Group();
        starGroup.rotation.z = Math.PI / 4;
        starGroup.add(starPoints);
        scene.add(starGroup);

        useWebGL = true;
      }
    } catch {
      useWebGL = false;
    }

    // 2D Canvas Fallback Setup
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    if (!useWebGL && canvas) {
      ctx = canvas.getContext('2d', { alpha: true });
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }

    let rotX = 0;
    let rotY = 0;
    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      if (isCleanedUp) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Slow continuous rotation matching Space-Portfolio (delta / 10 on X, delta / 15 on Y)
      if (!prefersReducedMotion) {
        rotX -= delta / 10;
        rotY -= delta / 15;
      }

      const currentScrollY = scrollYRef.current;
      const scrollTilt = (currentScrollY * 0.0001) % (Math.PI * 2);

      if (useWebGL && renderer && scene && camera && starGroup) {
        starGroup.rotation.x = rotX - scrollTilt;
        starGroup.rotation.y = rotY;

        // Subtle camera/group spatial parallax (max ~2-3px equivalent)
        if (!prefersReducedMotion) {
          starGroup.position.x = mouseRef.current.x * 0.012;
          starGroup.position.y = -mouseRef.current.y * 0.012;
        }

        renderer.render(scene, camera);
      } else if (canvas && ctx) {
        // High-performance 2D Canvas Fallback projection
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const focalLength = height * 0.85;

        const currentRotX = rotX - scrollTilt + mouseRef.current.y * 0.02;
        const currentRotY = rotY + mouseRef.current.x * 0.02;
        const rotZ = Math.PI / 4;

        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);

        for (let i = 0; i < starCount; i++) {
          const px = positions[i * 3];
          const py = positions[i * 3 + 1];
          const pz = positions[i * 3 + 2];

          // 1. Rotate Y
          const x1 = px * cosY + pz * sinY;
          const y1 = py;
          const z1 = -px * sinY + pz * cosY;

          // 2. Rotate X
          const x2 = x1;
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;

          // 3. Tilt Z
          const x3 = x2 * cosZ - y2 * sinZ;
          const y3 = x2 * sinZ + y2 * cosZ;
          const z3 = z2 + 1.4;

          if (z3 > 0.1) {
            const scale = focalLength / z3;
            const screenX = cx + x3 * scale;
            const screenY = cy + y3 * scale;

            if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
              const radius = Math.max(0.6, Math.min(1.4, (1.8 - z3) * 0.9));
              ctx.beginPath();
              ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (useWebGL && renderer && camera) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      } else if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCleanedUp = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="particle-background fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 2D Canvas element for WebGL fallback */}
      <canvas
        ref={canvasRef}
        className="particle-canvas absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric depth vignette (dark, cinematic space background) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(3, 0, 20, 0.7) 100%)',
        }}
      />
    </div>
  );
};
