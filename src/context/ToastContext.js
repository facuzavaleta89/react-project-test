"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react"

const ToastContext = createContext(null)

// ── Individual toast item ──────────────────────────────────────────────────
function ToastItem({ toast, onRemove }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Trigger enter animation
        const enterTimer = setTimeout(() => setVisible(true), 10)
        // Trigger exit animation just before removal
        const exitTimer = setTimeout(() => setVisible(false), toast.duration - 300)
        return () => {
            clearTimeout(enterTimer)
            clearTimeout(exitTimer)
        }
    }, [toast.duration])

    const icons = {
        success: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        error: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        ),
        info: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
        warning: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    }

    const styles = {
        success: "bg-zinc-900 border-emerald-500/50 text-white [--icon-color:theme(colors.emerald.400)]",
        error: "bg-zinc-900 border-red-500/50   text-white [--icon-color:theme(colors.red.400)]",
        info: "bg-zinc-900 border-blue-500/50   text-white [--icon-color:theme(colors.blue.400)]",
        warning: "bg-zinc-900 border-amber-500/50  text-white [--icon-color:theme(colors.amber.400)]",
    }

    const iconColors = {
        success: "text-emerald-400",
        error: "text-red-400",
        info: "text-blue-400",
        warning: "text-amber-400",
    }

    return (
        <div
            style={{
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(110%)",
            }}
            className={`
        flex items-start gap-3 px-4 py-3 rounded-xl
        border shadow-2xl shadow-black/40
        max-w-sm w-full text-sm font-medium
        backdrop-blur-sm
        ${styles[toast.type] || styles.info}
      `}
        >
            {/* Icon */}
            <span className={`flex-shrink-0 mt-0.5 ${iconColors[toast.type] || iconColors.info}`}>
                {icons[toast.type] || icons.info}
            </span>

            {/* Message */}
            <p className="flex-1 leading-snug">{toast.message}</p>

            {/* Close button */}
            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 mt-0.5 text-zinc-400 hover:text-white transition-colors"
                aria-label="Cerrar notificación"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    )
}

// ── Provider ──────────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const counterRef = useRef(0)

    const showToast = useCallback((message, type = "info", duration = 3500) => {
        const id = ++counterRef.current
        setToasts((prev) => [...prev, { id, message, type, duration }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast portal */}
            <div
                aria-live="polite"
                className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end"
            >
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error("useToast must be used within a ToastProvider")
    return ctx
}
