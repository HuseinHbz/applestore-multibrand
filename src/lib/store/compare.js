"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCompare: (productId) =>
        set((state) => {
          if (state.items.includes(productId)) return state
          if (state.items.length >= 4) return state // Max 4 items
          return { items: [...state.items, productId] }
        }),

      removeFromCompare: (productId) =>
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        })),

      toggleCompare: (productId) => {
        const { items, addToCompare, removeFromCompare } = get()
        if (items.includes(productId)) {
          removeFromCompare(productId)
        } else {
          addToCompare(productId)
        }
      },

      isInCompare: (productId) => {
        return get().items.includes(productId)
      },

      clearCompare: () => set({ items: [] }),
    }),
    {
      name: "compare-store",
    }
  )
)
