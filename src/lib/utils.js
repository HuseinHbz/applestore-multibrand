import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price, currency = "تومان") {
  return new Intl.NumberFormat("fa-IR").format(price) + " " + currency
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function toEnglishNumbers(str) {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  let result = str
  for (let i = 0; i < 10; i++) {
    result = result.replace(persianNumbers[i], englishNumbers[i])
  }
  return result
}
