"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useInvoicesStore = create(
  persist(
    (set, get) => ({
      salesInvoices: [],
      purchaseInvoices: [],

      createSalesInvoice: (invoice) => {
        const newInvoice = {
          ...invoice,
          id: `si${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          salesInvoices: [...state.salesInvoices, newInvoice],
        }))
        return newInvoice
      },

      createPurchaseInvoice: (invoice) => {
        const newInvoice = {
          ...invoice,
          id: `pi${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          purchaseInvoices: [...state.purchaseInvoices, newInvoice],
        }))
        return newInvoice
      },

      getSalesInvoices: () => get().salesInvoices,
      getPurchaseInvoices: () => get().purchaseInvoices,
    }),
    {
      name: "invoices-store",
    }
  )
)
