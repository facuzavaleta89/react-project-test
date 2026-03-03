import Navbar from "@/components/layout/NavBar"
import Footer from "@/components/layout/Footer"
import { CartProvider } from "@/context/CartContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { ToastProvider } from "@/context/ToastContext"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "E-Commerce",
  description: "Proyecto de práctica",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950 text-black dark:text-zinc-50 transition-colors duration-200`}>
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <div className="pt-20">
                {children}
              </div>
              <Footer />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}