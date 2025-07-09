import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aibel portfolio',
  description: 'Aibel portfolio website',
  generator: 'luca',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
