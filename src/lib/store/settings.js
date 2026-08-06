"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { defaultBrand } from "../brand/config"

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      brand: defaultBrand,
      theme: "light",

      updateBrand: (updates) =>
        set((state) => ({
          brand: { ...state.brand, ...updates },
        })),

      setTheme: (theme) => set({ theme }),

      applyBrandColors: () => {
        const brand = get().brand
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--brand-500", brand.primaryColor)
          // Generate shades
          document.documentElement.style.setProperty("--brand-600", brand.primaryColor)
        }
      },
    }),
    {
      name: "settings-store",
    }
  )
)
