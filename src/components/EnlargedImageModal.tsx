'use client';

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface EnlargedImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  variant?: "default" | "compact" | "fit";
  showHint?: boolean;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 4;

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

export function EnlargedImageModal({
  src,
  alt,
  onClose,
  variant = "default",
  showHint = true,
}: EnlargedImageModalProps) {
  const isCompact = variant === "compact";
  const isFit = variant === "fit";
  const isInteractive = variant === "default" || variant === "fit";
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isInteractive) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.12 : 0.12;
      setScale((current) => clampScale(current + delta));
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [src, isInteractive]);

  useEffect(() => {
    const stopDragging = () => {
      dragging.current = false;
    };

    window.addEventListener("mouseup", stopDragging);
    return () => window.removeEventListener("mouseup", stopDragging);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragging.current = true;
      dragStart.current = {
        x: event.clientX,
        y: event.clientY,
        posX: position.x,
        posY: position.y,
      };
    },
    [position.x, position.y]
  );

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!dragging.current) return;
    setPosition({
      x: dragStart.current.posX + (event.clientX - dragStart.current.x),
      y: dragStart.current.posY + (event.clientY - dragStart.current.y),
    });
  }, []);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged publication figure"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close enlarged figure"
        onClick={onClose}
      />

      <div
        className={`relative z-10 ${
          isFit
            ? "flex w-fit max-w-[min(96vw,1400px)] flex-col"
            : `flex max-h-[96vh] flex-col ${
                isCompact ? "w-full max-w-[min(92vw,360px)]" : "w-full max-w-[min(98vw,1400px)]"
              }`
        }`}
      >
        <div className={`mb-2 flex items-center gap-3 ${showHint ? "justify-between" : "justify-end"}`}>
          {showHint && (
            <p className="text-xs text-white/75 sm:text-sm">
              {isCompact ? "Scan to add on WeChat" : "Scroll to zoom · Drag to pan · Double-click to reset"}
            </p>
          )}
          <div className="flex items-center gap-1">
            {isInteractive && (
              <>
                <button
                  type="button"
                  onClick={() => setScale((current) => clampScale(current - 0.25))}
                  className="rounded-md bg-white/90 px-2.5 py-1 text-sm font-medium text-gray-800 shadow hover:bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  className="rounded-md bg-white/90 px-2.5 py-1 text-sm text-gray-800 shadow hover:bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setScale((current) => clampScale(current + 0.25))}
                  className="rounded-md bg-white/90 px-2.5 py-1 text-sm font-medium text-gray-800 shadow hover:bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 rounded-full bg-white p-1.5 text-gray-700 shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className={
            isFit
              ? "relative overflow-hidden"
              : "flex min-h-0 flex-1 items-center justify-center overflow-hidden"
          }
          onMouseDown={isInteractive ? handleMouseDown : undefined}
          onMouseMove={isInteractive ? handleMouseMove : undefined}
          onMouseUp={
            isInteractive
              ? () => {
                  dragging.current = false;
                }
              : undefined
          }
          onDoubleClick={isInteractive ? resetView : undefined}
        >
          <Image
            src={src}
            alt={alt}
            width={isCompact ? 360 : isFit ? 1400 : 2000}
            height={isCompact ? 480 : isFit ? 1050 : 2000}
            draggable={false}
            className={`block w-auto h-auto max-w-full object-contain ${
              isCompact
                ? "max-h-[min(70vh,480px)]"
                : isFit
                  ? `max-h-[88vh] max-w-[min(96vw,1400px)] ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`
                  : `max-h-[88vh] max-w-[min(98vw,1400px)] ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`
            }`}
            style={
              isInteractive
                ? {
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
