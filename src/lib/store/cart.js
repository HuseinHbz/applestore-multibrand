"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,
      discountAmount: 0,

      addItem: (variantId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantId === variantId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { variantId, quantity }] }
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.variantId !== variantId)
            : state.items.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i
              ),
        })),

      clearCart: () => set({ items: [], discountCode: null, discountAmount: 0 }),

      applyDiscount: (code, amount) =>
        set({ discountCode: code, discountAmount: amount }),

      getTotalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      getSubtotal: () => {
        // This needs variant prices from catalog store
        // Will be computed in component level
        return 0
      },
    }),
    {
      name: "cart-store",
    }
  )
)
