import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getGPUTier } from 'detect-gpu';
import { WorkItem } from '../types';
import { lerp } from '../utils';
import { ImageRenderer } from '../effects/work-slider/renderer';

interface WorkSectionProps {
  workData: WorkItem[];
  onSelectDestination?: (destination: string, item: WorkItem) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  workData,
  onSelectDestination,
}) => {
  const [currentActive, setCurrentActive] = useState<number>(-1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rendererRef = useRef<ImageRenderer | null>(null);

  // Drag physics state
  const mouseState = useRef({
    startX: 0,
    initialX: 0,
    currentX: 0,
    targetX: 0,
    speed: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // If a project is currently open/expanded, disable dragging
    if (currentActive >= 0) return;
    // Don't drag if clicking buttons or links
    if (
      (e.target as HTMLElement).closest('.button') ||
      (e.target as HTMLElement).closest('.close-button') ||
      (e.target as HTMLElement).closest('a')
    ) {
      return;
    }
    setIsDragging(true);
    mouseState.current.startX = e.clientX;
    mouseState.current.initialX = mouseState.current.currentX;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const diff = e.clientX - mouseState.current.startX;
      const offsetSpeed = 2.2;
      mouseState.current.targetX = mouseState.current.initialX + diff * offsetSpeed;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch support for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (currentActive >= 0) return;
    if (
      (e.target as HTMLElement).closest('.button') ||
      (e.target as HTMLElement).closest('.close-button') ||
      (e.target as HTMLElement).closest('a')
    ) {
      return;
    }
    setIsDragging(true);
    mouseState.current.startX = e.touches[0].clientX;
    mouseState.current.initialX = mouseState.current.currentX;
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - mouseState.current.startX;
      mouseState.current.targetX = mouseState.current.initialX + diff * 1.8;
    },
    [isDragging]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  // Three.js ImageRenderer setup and GPU capability check
  useEffect(() => {
    let isCancelled = false;

    async function initImageRenderer() {
      if (!containerRef.current || workData.length === 0) return;

      try {
        const gpuTier = await getGPUTier();
        if (isCancelled) return;

        // Exactly matching Musab-Hassan's condition: tier >= 2, not mobile, fps >= 30
        const canRunThree =
          gpuTier.tier >= 2 && !gpuTier.isMobile && (gpuTier.fps ?? 60) >= 30;

        if (canRunThree && containerRef.current) {
          // Wait a moment for images to be mounted in DOM
          const validImages = imgRefs.current.filter(
            (img): img is HTMLImageElement => Boolean(img && img.src)
          );

          if (validImages.length > 0) {
            if (rendererRef.current) {
              rendererRef.current.destroy();
            }
            rendererRef.current = new ImageRenderer(
              containerRef.current,
              validImages,
              () => mouseState.current.speed
            );
          }
        }
      } catch (err) {
        console.warn('Three.js work image renderer fallback:', err);
      }
    }

    const timer = setTimeout(initImageRenderer, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, [workData]);

  // Main slider animation loop
  useEffect(() => {
    const loop = () => {
      if (listRef.current) {
        // Enforce boundary limits when no item is selected
        if (currentActive < 0) {
          const listWidth = listRef.current.scrollWidth;
          const viewWidth = window.innerWidth;
          const maxScroll = -(listWidth - viewWidth + 100);

          if (mouseState.current.targetX > 0) {
            mouseState.current.targetX = lerp(mouseState.current.targetX, 0, 0.15);
          } else if (mouseState.current.targetX < maxScroll && maxScroll < 0) {
            mouseState.current.targetX = lerp(mouseState.current.targetX, maxScroll, 0.15);
          }
        }

        mouseState.current.currentX = lerp(
          mouseState.current.currentX,
          mouseState.current.targetX,
          0.1
        );
        mouseState.current.speed =
          Math.round(
            (mouseState.current.currentX - mouseState.current.targetX) * 100
          ) / 100;

        listRef.current.style.transform = `translate3d(${mouseState.current.currentX.toFixed(
          2
        )}px, 0px, 0px)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentActive]);

  // Expand / collapse active work item
  const toggleActiveItem = (index: number) => {
    if (currentActive === index) {
      setCurrentActive(-1);
    } else {
      setCurrentActive(index);
      const targetItem = itemRefs.current[index];
      if (targetItem) {
        const offsetLeft = targetItem.offsetLeft;
        const targetPos = -(offsetLeft - window.innerWidth / 4 + window.innerWidth / 10);
        mouseState.current.targetX = targetPos;
      }
    }
  };

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative w-screen min-h-[90vh] mt-[20vh] mb-6 sm:mb-8 md:mb-10 overflow-hidden select-none"
    >
      {/* Main slider draggable area */}
      <div
        className={`relative z-10 w-full h-full flex flex-col ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${currentActive >= 0 ? 'cursor-default' : ''}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-full h-full overflow-hidden">
          <ul
            ref={listRef}
            className={`list-none flex flex-row items-center h-[75vh] min-w-min pl-[14vw] pr-[20vw] m-0 transition-opacity duration-500 will-change-transform ${
              isDragging ? 'is-dragging work-list-hold' : ''
            }`}
          >
            {workData.map((item, index) => {
              const isActive = currentActive === index;
              const isAmbient = currentActive >= 0 && !isActive;

              // Format 2-digit index (e.g., "01")
              const displayIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

              return (
                <li
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`inline-flex flex-col justify-end relative box-border mr-[6vw] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? 'w-[50vw] h-[60vh] mr-[16vw] ml-[5vw] z-20'
                      : isAmbient
                      ? 'w-[23vw] h-[45vh] opacity-30 pointer-events-none'
                      : isDragging
                      ? 'w-[23vw] h-[45vh] max-[1450px]:w-[25vw] max-[1110px]:w-[40vw] max-[650px]:w-[75vw] z-10'
                      : 'w-[23vw] h-[55vh] max-[1450px]:w-[25vw] max-[1110px]:w-[40vw] max-[650px]:w-[75vw] z-10'
                  }`}
                >
                  {/* Image container */}
                  <div
                    className="relative w-[85%] h-full mr-[15%] overflow-hidden rounded-[0.8vh] shadow-[3px_9px_18px_rgba(0,0,0,0.2)] bg-[#1a1a1c] transition-all duration-700"
                    style={{ width: isActive ? '100%' : '85%', marginRight: isActive ? '0%' : '15%' }}
                  >
                    <img
                      ref={(el) => (imgRefs.current[index] = el)}
                      src={item.image || `/assets/imgs/work-back/${item.id}/cover.jpg`}
                      alt={item.title}
                      draggable={false}
                      className="w-[110%] h-[110%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                      style={{ opacity: isActive ? 0.25 : 0.6 }}
                    />
                  </div>

                  {/* Non-active Card Overlay: Item Index & View Button */}
                  {!isActive && (
                    <>
                      <div
                        className={`absolute top-[6vh] right-0 z-10 text-right transition-opacity duration-300 ease-out ${
                          isDragging ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        <span className="font-[family-name:var(--body-font)] text-[1vw] max-[1110px]:text-[2vh] tracking-[0.1vw] uppercase text-white/80">
                          {displayIndex}
                        </span>
                      </div>

                      <div
                        className={`absolute bottom-[8vh] right-0 z-10 text-right flex flex-col justify-end max-[1110px]:w-[calc(55vw-10vh)] max-[650px]:w-[calc(70vw-10vh)] transition-opacity duration-300 ease-out ${
                          isDragging ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        <h2 className="font-[family-name:var(--title-font)] text-[2.5vw] max-[1110px]:text-[5vw] max-[650px]:text-[4vh] text-white lowercase tracking-[0.05vw] leading-[110%] font-normal">
                          {item.title}
                        </h2>
                        <div className="mt-[1.5vh]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleActiveItem(index);
                            }}
                            className="button item-link interactive border-none bg-transparent uppercase text-[1.2vw] max-[1110px]:text-[1.8vh] tracking-[0.1vw] clickable"
                          >
                            view project
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Active Project Details Modal Overlay */}
        {currentActive >= 0 && workData[currentActive] && (
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between px-[14vw] py-[6vh] box-border pointer-events-none z-30">
            {/* Top row: index + line + category summary */}
            <div className="pointer-events-auto flex flex-row items-center justify-start">
              <span className="font-[family-name:var(--body-font)] text-[2.1vh] text-white">
                {currentActive < 9 ? `0${currentActive + 1}` : currentActive + 1}
              </span>
              <span className="w-16 h-[1.5px] bg-white mx-6" />
              <h6 className="font-[family-name:var(--body-font)] uppercase font-normal text-[1.9vh] text-white tracking-widest">
                {workData[currentActive].details.summary}
              </h6>
            </div>

            {/* Mid row: Big title + Close button */}
            <div className="pointer-events-auto flex flex-row items-center justify-between my-auto max-[750px]:flex-col max-[750px]:items-start relative">
              <h1 className="title text-[7vw] font-normal leading-none max-[750px]:text-[13vw] lowercase text-white">
                {workData[currentActive].title}
              </h1>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleActiveItem(currentActive);
                }}
                className="close-button border-none bg-transparent text-white text-[4vw] max-[750px]:text-[6vh] cursor-pointer clickable p-2 hover:opacity-75 transition-opacity max-[750px]:absolute max-[750px]:top-0 max-[750px]:right-0"
                aria-label="Close Project Details"
              >
                &times;
              </button>
            </div>

            {/* Bottom row: Description, Roles, Action Links */}
            <div className="pointer-events-auto flex flex-row justify-between items-start gap-[5vh] max-[750px]:flex-col max-[750px]:gap-[2vh]">
              {/* Description */}
              <div className="flex-1">
                <p className="font-[family-name:var(--body-font)] text-[1.4vh] max-[750px]:text-[1.6vh] text-white/90 leading-relaxed max-w-[400px]">
                  {workData[currentActive].details.description}
                </p>
              </div>

              {/* Roles */}
              <div className="flex-1 flex flex-col items-start md:items-center">
                <div className="text-left">
                  <p className="font-[family-name:var(--body-font)] uppercase text-[1.3vh] tracking-[0.4vh] text-white/70 mb-2">
                    Role
                  </p>
                  <ul className="list-none m-0 p-0 flex flex-col gap-1">
                    {workData[currentActive].roles.map((role) => (
                      <li
                        key={role}
                        className="font-[family-name:var(--body-font)] uppercase text-[1.6vh] text-white leading-tight"
                      >
                        + {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Links and destination gateway */}
              <div className="flex-1 flex flex-col items-start md:items-end gap-[1.5vh]">
                {workData[currentActive].destination && (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectDestination?.(
                        workData[currentActive].destination!,
                        workData[currentActive]
                      )
                    }
                    className="button uppercase text-[1.1vw] max-[750px]:text-[1.8vh] tracking-[0.2vw] no-underline clickable text-white font-[family-name:var(--body-font)] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors"
                  >
                    Open {workData[currentActive].destination} &rarr;
                  </button>
                )}
                {workData[currentActive].links?.map((link) => (
                  <a
                    key={link.link}
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="button uppercase text-[1.1vw] max-[750px]:text-[1.8vh] tracking-[0.2vw] no-underline clickable text-white font-[family-name:var(--body-font)]"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
