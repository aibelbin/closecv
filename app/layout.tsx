import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aibel portfolio',
  description: 'Aibel portfolio website',
  generator: 'luca',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* 'dark' class activates Tailwind dark color tokens so text-card-foreground becomes light; previously it was near-black on a black card making titles invisible */}
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
