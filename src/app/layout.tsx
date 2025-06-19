import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LeftNavigation from "@/app/components/left-navigation"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Data Catalog Management Portal",
  description: "Manage PII configurations, data sources, and catalog information",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-50">
          <LeftNavigation />
          <main className="flex-1 ml-64 min-h-screen">
            <div className="p-6">{children}</div>
          </main>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
