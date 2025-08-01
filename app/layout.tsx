import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { OnboardingProvider } from "@/contexts/OnboardingContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "sonner"
import PageTransition from "@/components/PageTransition"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ꭾuyok - NFT Marketplace Indonesia",
  description: "Platform NFT marketplace terdepan di Indonesia dengan sistem escrow yang aman dan transaksi P2P yang mudah",
  generator: "v0.dev",
  keywords: ["NFT", "marketplace", "Indonesia", "crypto", "blockchain", "digital art"],
  authors: [{ name: "PUYOK Team" }],
  openGraph: {
    title: "Ꭾuyok - NFT Marketplace Indonesia",
    description: "Platform NFT marketplace terdepan di Indonesia dengan sistem escrow yang aman",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ꭾuyok - NFT Marketplace Indonesia",
    description: "Platform NFT marketplace terdepan di Indonesia dengan sistem escrow yang aman",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <OnboardingProvider>
              <PageTransition>
                {children}
              </PageTransition>
              <Toaster 
                richColors 
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'rgb(30 41 59)',
                    border: '1px solid rgb(51 65 85)',
                    color: 'white'
                  }
                }}
              />
            </OnboardingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
