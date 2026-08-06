"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_BASE = "/api"

export const useCatalogStore = create(
  persist(
    (set, get) => ({
      products: [],
      variants: [],
      categories: ["mobile", "laptop", "tablet", "accessory"],
      loading: false,
      error: null,

      // Fetch all products from API
      fetchProducts: async (filters = {}) => {
        set({ loading: true, error: null })
        try {
          const params = new URLSearchParams()
          if (filters.category) params.append("category", filters.category)
          if (filters.search) params.append("search", filters.search)
          if (filters.featured) params.append("featured", "true")

          const res = await fetch(`${API_BASE}/products?${params}`)
          const json = await res.json()

          if (json.success) {
            const products = json.data
            // Extract all variants from products
            const allVariants = products.flatMap((p) => p.variants || [])
            set({ products, variants: allVariants, loading: false })
          } else {
            set({ error: json.error, loading: false })
          }
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },

      // Fetch single product
      fetchProduct: async (slug) => {
        set({ loading: true, error: null })
        try {
          const res = await fetch(`${API_BASE}/products/${slug}`)
          const json = await res.json()
          set({ loading: false })
          return json.success ? json.data : null
        } catch (err) {
          set({ error: err.message, loading: false })
          return null
        }
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug)
      },

      getVariantsByProduct: (productId) => {
        return get().variants.filter((v) => v.productId === productId)
      },

      getFeaturedProducts: () => {
        return get().products.filter((p) => p.featured)
      },

      // Admin: Add product via API
      addProduct: async (product) => {
        try {
          const res = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          })
          const json = await res.json()
          if (json.success) {
            set((state) => ({ products: [...state.products, json.data] }))
            return json.data
          }
        } catch (err) {
          console.error("addProduct error:", err)
        }
      },

      updateProduct: async (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }))
      },

      removeProduct: async (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },
    }),
    {
      name: "catalog-store",
    }
  )
)
