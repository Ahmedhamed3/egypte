import { create } from 'zustand';
import type { Lang } from '@/lib/types';

type ExplorerStore = {
  language: Lang;
  selectedPlaceId: string | null;
  layer: number;
  progress: number;
  earnedBadges: string[];
  chatLog: string[];
  setLanguage: (lang: Lang) => void;
  selectPlace: (placeId: string) => void;
  setLayer: (layer: number) => void;
  addProgress: (points: number) => void;
  earnBadge: (badgeId: string) => void;
  pushChat: (message: string) => void;
};

export const useExplorerStore = create<ExplorerStore>((set) => ({
  language: 'en',
  selectedPlaceId: 'giza',
  layer: 1,
  progress: 10,
  earnedBadges: [],
  chatLog: [],
  setLanguage: (language) => set({ language }),
  selectPlace: (selectedPlaceId) => set({ selectedPlaceId, layer: 1 }),
  setLayer: (layer) => set({ layer }),
  addProgress: (points) => set((s) => ({ progress: Math.min(100, s.progress + points) })),
  earnBadge: (badgeId) =>
    set((s) => ({
      earnedBadges: s.earnedBadges.includes(badgeId) ? s.earnedBadges : [...s.earnedBadges, badgeId]
    })),
  pushChat: (message) => set((s) => ({ chatLog: [message, ...s.chatLog].slice(0, 6) }))
}));
