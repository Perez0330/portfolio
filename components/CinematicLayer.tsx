'use client';

import { useEffect, useRef, RefObject } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';
import { useVideoStore } from '../app/videoStore';

interface CinematicLayerProps {
  videoRef: RefObject<HTMLVideoElement>;
}

export default function CinematicLayer({ videoRef }: CinematicLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const analyserRef = useRef<THREE.AudioAnalyser | null>(null);
  const audioListenerRef = useRef<THREE.AudioListener | null>(null);
  const { isMuted } = useVideoStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2200);
    camera.position.set(0, 0, 520);
    cameraRef.current = camera;

    // Audio Analysis Setup
    if (videoRef.current) {
      const audioListener = new THREE.AudioListener();
      camera.add(audioListener);
      audioListenerRef.current = audioListener;

      const audio = new THREE.Audio(audioListener);
      audio.setMediaElementSource(videoRef.current);

      // The second argument is the FFT size. Must be a power of 2.
      const analyser = new THREE.AudioAnalyser(audio, 32);
      analyserRef.current = analyser;
    }

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    // Lower pixel ratio on mobile for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Fewer particles on mobile
    const particleCount = isMobile ? 120 : 260;
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const offsets = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 700;
      offsets[i * 3] = (Math.random() - 0.5) * 420;
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 280;
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 200;
      scales[i] = 18 + Math.random() * 50;
      speeds[i] = 0.5 + Math.random() * 1.2;
      const base = new THREE.Color(0xffffff);
      const warm = new THREE.Color(0xffc08f);
      base.lerp(warm, Math.random() * 0.6);
      colors[i * 3] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uAudioFrequency: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aOffset;
        attribute float aScale;
        attribute vec3 aColor;
        attribute float aSpeed;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uAudioFrequency;

        void main() {
          vColor = aColor;
          float time = uTime * aSpeed * 0.18;
          float audioAmp = uAudioFrequency * 2.5;
          vec3 animated = position;
          animated.x += sin((position.y + aOffset.y) * 0.004 + time * 0.9) * (42.0 + audioAmp * 15.0);
          animated.y += cos((position.x + aOffset.x) * 0.003 + time * 0.7) * 24.0;
          animated.z += sin((position.x + position.y) * 0.002 + time * 0.6) * 18.0;
          vec4 mvPosition = modelViewMatrix * vec4(animated + aOffset, 1.0);
          gl_PointSize = aScale * (350.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(0.0, 1.0, 1.0 - (length(animated.xy) / 900.0));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;

        void main() {
          // Gently shift color over time between the original warm color and a soft blue
          vec3 softBlue = vec3(0.5, 0.7, 1.0);
          float colorMix = (sin(uTime * 0.1) + 1.0) / 2.0; // Oscillates between 0.0 and 1.0
          vec3 finalColor = mix(vColor, softBlue, colorMix * 0.25); // Mix in a small amount of blue

          // Create a soft, blurred particle shape
          float dist = length(gl_PointCoord - vec2(0.5));
          float core = smoothstep(0.55, 0.22, dist);
          float glow = smoothstep(0.9, 0.4, dist) * 0.28;
          float alpha = core * 0.22 + glow * 0.12;
          alpha *= vAlpha;
          gl_FragColor = vec4(finalColor * 1.05, alpha);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    const resize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (!cameraRef.current || !rendererRef.current || !material || !particlesRef.current) return;

      if (analyserRef.current && !isMuted) {
        const frequency = analyserRef.current.getAverageFrequency();
        material.uniforms.uAudioFrequency.value = frequency / 256; // Normalize
      }

      material.uniforms.uTime.value = elapsed;
      const px = mouse.current.x * 40; // Increased from 22
      const py = mouse.current.y * 25; // Increased from 14
      cameraRef.current.position.x += (px - cameraRef.current.position.x) * 0.06;
      cameraRef.current.position.y += (py - cameraRef.current.position.y) * 0.06;
      cameraRef.current.lookAt(0, 0, 0);

      rendererRef.current.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        if (Array.isArray(particlesRef.current.material)) {
          particlesRef.current.material.forEach((item) => item.dispose());
        } else {
          particlesRef.current.material.dispose();
        }
        scene.remove(particlesRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isMuted, videoRef]); // isMuted is now from the store

  return <canvas ref={canvasRef} className={styles.canvasOverlay} />;
}
