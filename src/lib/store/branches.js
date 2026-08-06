"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useBranchesStore = create(
  persist(
    (set, get) => ({
      branches: [],
      selectedBranch: null,
      loading: false,

      fetchBranches: async () => {
        try {
          const res = await fetch(`${API_BASE}/branches`)
          const json = await res.json()
          if (json.success) set({ branches: json.data })
        } catch (err) {
          console.error("fetchBranches error:", err)
        }
      },

      setSelectedBranch: (branchId) =>
        set({ selectedBranch: branchId }),

      getBranchById: (id) => {
        return get().branches.find((b) => b.id === id)
      },

      addBranch: async (branch) => {
        try {
          const res = await fetch(`${API_BASE}/branches`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(branch),
          })
          const json = await res.json()
          if (json.success) {
            set((state) => ({ branches: [...state.branches, json.data] }))
          }
        } catch (err) {
          console.error("addBranch error:", err)
        }
      },

      updateBranch: (id, updates) =>
        set((state) => ({
          branches: state.branches.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      removeBranch: (id) =>
        set((state) => ({
          branches: state.branches.filter((b) => b.id !== id),
        })),
    }),
    {
      name: "branches-store",
    }
  )
)
