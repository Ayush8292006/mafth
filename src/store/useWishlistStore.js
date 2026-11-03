import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return { items: state.items.filter((item) => item.id !== product.id) };
          }
          return { items: [product, ...state.items] };
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      getCount: () => get().items.length,
    }),
    {
      name: 'mafth-wishlist-storage',
    }
  )
);

