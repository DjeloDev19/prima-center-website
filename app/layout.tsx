import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LoadingBar } from "@/components/loading-bar"

const neueMontrealFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-neue-montreal",
})

export const metadata: Metadata = {
  title: "PRIMA CENTER - Centre Commercial de Référence à Abidjan",
  description:
    "PRIMA CENTER, le centre commercial moderne et lumineux à Abidjan. Boutiques, restaurants, loisirs ouverts 7j/7.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans ${neueMontrealFont.variable} antialiased`}>
        <LoadingBar />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
