import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,
      deliveryPincode: "110001",
      deliveryCity: "New Delhi",

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      setPincode: (pincode, city = "Bengaluru") =>
        set({ deliveryPincode: pincode, deliveryCity: city }),

      addItem: (product, selectedVariant = {}) => {
        set((state) => {
          const size = selectedVariant.size || product.variants?.sizes?.[0] || 'Standard';
          const color = selectedVariant.color?.name || product.variants?.colors?.[0]?.name || 'Default';
          const itemKey = `${product.id}-${product.vendorId}-${size}-${color}`;

          const existingIndex = state.items.findIndex((item) => item.itemKey === itemKey);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += 1;
            return { items: updatedItems, isDrawerOpen: true };
          }

          const newItem = {
            itemKey,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            mrp: product.mrp,
            image: product.primaryImage || product.images?.[0],
            vendorName: product.vendorName,
            vendorId: product.vendorId,
            vendorSlug: product.vendorSlug,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
            deliveryEstimate: product.deliveryEstimate,
          };

          return { items: [newItem, ...state.items], isDrawerOpen: true };
        });
      },

      removeItem: (itemKey) => {
        set((state) => ({
          items: state.items.filter((item) => item.itemKey !== itemKey),
        }));
      },

      updateQuantity: (itemKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemKey);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.itemKey === itemKey ? { ...item, quantity } : item
          ),
        }));
      },

      applyCoupon: (code) => {
        const cleanCode = code.toUpperCase().trim();
        if (cleanCode === 'MAFTH10') {
          set({ appliedCoupon: { code: 'MAFTH10', discountPercent: 10, label: '10% Welcome Discount' } });
          return { success: true, message: 'Coupon MAFTH10 applied: 10% off!' };
        } else if (cleanCode === 'FESTIVE500') {
          set({ appliedCoupon: { code: 'FESTIVE500', discountAmount: 500, label: '₹500 Festive Savings' } });
          return { success: true, message: 'Coupon FESTIVE500 applied: ₹500 off!' };
        }
        return { success: false, message: 'Invalid coupon code. Try MAFTH10 or FESTIVE500' };
      },

      removeCoupon: () => set({ appliedCoupon: null }),
      clearCart: () => set({ items: [], appliedCoupon: null }),

      // Computed selectors
      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalMrp: () => {
        return get().items.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        if (coupon.discountPercent) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        if (coupon.discountAmount) {
          return Math.min(coupon.discountAmount, subtotal);
        }
        return 0;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount);
      },
    }),
    {
      name: 'mafth-cart-storage',
      // never restore the drawer as open after a reload
      partialize: ({ isDrawerOpen, ...rest }) => rest,
    }
  )
);

