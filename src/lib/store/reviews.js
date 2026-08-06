"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useReviewsStore = create(
  persist(
    (set, get) => ({
      reviews: [],
      loading: false,

      fetchReviews: async (productId = null) => {
        try {
          const params = productId ? `?productId=${productId}` : ""
          const res = await fetch(`${API_BASE}/reviews${params}`)
          const json = await res.json()
          if (json.success) set({ reviews: json.data })
        } catch (err) {
          console.error("fetchReviews error:", err)
        }
      },

      addReview: async (review) => {
        try {
          const res = await fetch(`${API_BASE}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
          })
          const json = await res.json()
          if (json.success) {
            set((state) => ({ reviews: [json.data, ...state.reviews] }))
            return json.data
          }
        } catch (err) {
          console.error("addReview error:", err)
        }
        return null
      },

      getReviewsByProduct: (productId) => {
        return get().reviews.filter((r) => r.productId === productId)
      },

      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter((r) => r.productId === productId)
        if (productReviews.length === 0) return 0
        return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      },
    }),
    {
      name: "reviews-store",
    }
  )
)
