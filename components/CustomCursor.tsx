'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorOutlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0.2, ease: 'power3.out' });
      gsap.to(cursorOutline, { x: clientX, y: clientY, duration: 0.6, ease: 'power3.out' });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [class*="Button"], [class*="Link"], [class*="Cue"]')) {
        gsap.to(cursorOutline, {
          scale: 2.5,
          borderColor: '#ffbf68',
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [class*="Button"], [class*="Link"], [class*="Cue"]')) {
        gsap.to(cursorOutline, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className={styles.cursorDot} />
      <div ref={cursorOutlineRef} className={styles.cursorOutline} />
    </>
  );
}