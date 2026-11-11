import { create } from 'zustand';

/** Small UI-only state shared across storefront components */
export const useUiStore = create((set) => ({
  offersOpen: false,
  openOffers: () => set({ offersOpen: true }),
  closeOffers: () => set({ offersOpen: false }),
}));
