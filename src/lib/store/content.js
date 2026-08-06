"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useContentStore = create(
  persist(
    (set, get) => ({
      contents: [],
      loading: false,

      fetchContents: async (type = null) => {
        try {
          const params = type ? `?type=${type}` : ""
          const res = await fetch(`${API_BASE}/contents${params}`)
          const json = await res.json()
          if (json.success) set({ contents: json.data })
        } catch (err) {
          console.error("fetchContents error:", err)
        }
      },

      getContentBySlug: (slug) => {
        return get().contents.find((c) => c.slug === slug)
      },

      getContentsByType: (type) => {
        return get().contents.filter((c) => c.type === type)
      },

      addContent: async (content) => {
        try {
          const res = await fetch(`${API_BASE}/contents`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
          })
          const json = await res.json()
          if (json.success) {
            set((state) => ({ contents: [...state.contents, json.data] }))
          }
        } catch (err) {
          console.error("addContent error:", err)
        }
      },

      updateContent: (id, updates) =>
        set((state) => ({
          contents: state.contents.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      removeContent: (id) =>
        set((state) => ({
          contents: state.contents.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "content-store",
    }
  )
)
