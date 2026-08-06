"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,

      fetchOrders: async (userId = null) => {
        set({ loading: true, error: null })
        try {
          const params = userId ? `?userId=${userId}` : ""
          const res = await fetch(`${API_BASE}/orders${params}`)
          const json = await res.json()

          if (json.success) {
            set({ orders: json.data, loading: false })
          } else {
            set({ error: json.error, loading: false })
          }
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },

      createOrder: async (orderData) => {
        try {
          const res = await fetch(`${API_BASE}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          })
          const json = await res.json()

          if (json.success) {
            set((state) => ({ orders: [json.data, ...state.orders] }))
            return json.data
          }
        } catch (err) {
          console.error("createOrder error:", err)
        }
        return null
      },

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),

      getOrdersByUser: (userId) => {
        return get().orders.filter((o) => o.userId === userId)
      },

      getRecentOrders: (limit = 10) => {
        return get().orders.slice(0, limit)
      },
    }),
    {
      name: "orders-store",
    }
  )
)
