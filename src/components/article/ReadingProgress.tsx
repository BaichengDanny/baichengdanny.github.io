'use client';

import { useEffect, useState } from 'react';

/** Thin bar at the top of the viewport showing how far the reader is through `targetId`. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = target.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const value = scrollable > 0 ? -top / scrollable : top < 0 ? 1 : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 pointer-events-none">
      <div
        className="h-full origin-left bg-red-600 dark:bg-red-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
