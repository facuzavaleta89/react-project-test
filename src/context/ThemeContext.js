"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        // Revisa si hay guardado algo o las pref del sistema
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            setTheme(storedTheme)
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
    }, [])

    useEffect(() => {
        // Aplica la clase "dark" al root
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
