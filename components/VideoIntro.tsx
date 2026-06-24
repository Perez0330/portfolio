'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';
import { useVideoStore } from '../app/videoStore';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = '/Use_the_uploaded_image_as_the.mp4';

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isMuted, isPlaying, isLoading, actions } = useVideoStore((state) => state);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || isLoading) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {
      actions.setIsPlaying(false);
    });

    // Entrance animation timeline
    const entranceTl = gsap.timeline({
      onComplete: () => {
        // Auto-hide sound hint after a few seconds
        gsap.to(`.${styles.soundBadge}`, { autoAlpha: 0, delay: 2.5 });
      },
    });

    entranceTl.fromTo(
      container,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );
    entranceTl.fromTo(
      '[data-hero]',
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power3.out', stagger: 0.12 },
      0.15
    );

    // Scroll-based zoom-out animation
    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    zoomTl.to(`.${styles.videoFrame}`, {
      scale: 0.9,
    });

    // Fade out scroll cue on scroll
    gsap.to(`.${styles.scrollCue}`, {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: container,
        start: 'top top-=-100px', // Start fading when user scrolls 100px
        end: 'top top-=-150px',
        scrub: true,
      },
    });

    // Animate content sections on scroll
    const sections = gsap.utils.toArray<HTMLElement>('section:not([class*="heroSection"])');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('[class*="Intro"], [class*="Grid"], [class*="Content"], [class*="Buttons"], [class*="Meta"]'),
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      entranceTl.kill();
      zoomTl.kill();
      ScrollTrigger.killAll();
    };
  }, [isLoading, actions]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      actions.setIsPlaying(false);
    } else {
      await video.play().catch(() => {
        actions.setIsPlaying(false);
      });
      actions.setIsPlaying(true);
    }
  };

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    actions.setIsMuted(video.muted);
  }, [actions, videoRef]);

  // Effect for keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleMute]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('next-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoReady = () => {
    // Add a small delay for a smoother transition out of the loading state
    setTimeout(() => {
      actions.setIsLoading(false);
    }, 300);
  };

  return (
    <>
      {/* Loading Screen Overlay */}
      <div className={`${styles.loadingOverlay} ${!isLoading ? styles.loadingFinished : ''}`}>
        <div className={styles.loadingSpinner} />
      </div>

      <section className={styles.heroSection} ref={containerRef} style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className={styles.videoFrame}>
          <div className={styles.backgroundLayer} aria-hidden="true">
            <video
              className={styles.blurVideo}
              src={VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <div className={styles.ambientGradient} />
          </div>

          <div className={styles.videoLayer}>
            <video // The `isMuted` prop is now controlled by the Zustand store
              ref={videoRef}
              className={styles.mainVideo}
              src={VIDEO_SRC}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onCanPlay={handleVideoReady} // Trigger when video is ready
            />
            <div className={styles.darkOverlay} />
            <div className={styles.warmLightOverlay} />
          </div>

          <CinematicLayer videoRef={videoRef} />

          <div className={styles.contentWrap}>
            <div className={styles.contentMeta}>
              <span className="heroContent" data-hero>
                AWS & DEVOPS ENGINEER
              </span>
              <h1 className="heroContent" data-hero>
                THANGA
                <span>PARESH T</span>
              </h1>
              <p className="heroContent" data-hero>
                MERN stack developer building cloud-native, production-ready experiences with emotional motion and robust infrastructure.
              </p>
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.glassButton} onClick={togglePlay} type="button" aria-pressed={isPlaying}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button className={styles.glassButton} onClick={toggleMute} type="button" aria-pressed={!isMuted}>
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <div className={styles.badgeWrap} aria-hidden="true">
                <span className={styles.soundBadge}>Tap for sound</span>
              </div>
            </div>

            <button className={styles.scrollCue} onClick={scrollToNext} type="button" aria-label="Scroll to next section">
              <span className={styles.scrollLabel}>Scroll</span>
              <span className={styles.scrollLine} />
            </button>

            <button className={styles.skipButton} onClick={scrollToNext} type="button" data-hero>
              Skip Intro
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
