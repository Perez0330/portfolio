import { create } from 'zustand';

interface VideoState {
  isMuted: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  actions: {
    setIsMuted: (isMuted: boolean) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
  };
}

export const useVideoStore = create<VideoState>((set) => ({
  isMuted: true,
  isPlaying: true,
  isLoading: true,
  actions: {
    setIsMuted: (isMuted) => set({ isMuted }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsLoading: (isLoading) => set({ isLoading }),
  },
}));