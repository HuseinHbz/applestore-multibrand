"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
          const json = await res.json()

          if (json.success) {
            set({ user: json.data, isAuthenticated: true, loading: false, error: null })
            return true
          } else {
            set({ error: json.error, loading: false })
            return false
          }
        } catch (err) {
          set({ error: err.message, loading: false })
          return false
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null })
        try {
          const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          })
          const json = await res.json()

          if (json.success) {
            set({ user: json.data, isAuthenticated: true, loading: false, error: null })
            return true
          } else {
            set({ error: json.error, loading: false })
            return false
          }
        } catch (err) {
          set({ error: err.message, loading: false })
          return false
        }
      },

      logout: () => set({ user: null, isAuthenticated: false, error: null }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      hasRole: (role) => {
        const user = get().user
        if (!user) return false
        const roles = { admin: 4, manager: 3, staff: 2, customer: 1 }
        return roles[user.role] >= roles[role]
      },

      fetchUsers: async () => {
        try {
          const res = await fetch(`${API_BASE}/users`)
          const json = await res.json()
          if (json.success) set({ users: json.data })
        } catch (err) {
          console.error("fetchUsers error:", err)
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
)
