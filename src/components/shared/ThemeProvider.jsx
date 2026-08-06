"use client"

import { createContext, useContext, useState, useEffect } from "react"

// مقدار اولیه امن جهت جلوگیری از کرش در زمان Server-Side Rendering
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Provider همیشه باید children را رندر کند تا Context در Server Prerendering حذف نشود
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return { theme: "light", toggleTheme: () => {} }
  }
  return context
}