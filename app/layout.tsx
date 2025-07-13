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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black" style={{ backgroundColor: '#000000' }}>
      <body className="bg-black text-white" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
