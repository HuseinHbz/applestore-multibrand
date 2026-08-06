"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (productId) =>
        set((state) => {
          if (state.items.includes(productId)) return state
          return { items: [...state.items, productId] }
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        })),

      toggleWishlist: (productId) => {
        const { items, addToWishlist, removeFromWishlist } = get()
        if (items.includes(productId)) {
          removeFromWishlist(productId)
        } else {
          addToWishlist(productId)
        }
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-store",
    }
  )
)
