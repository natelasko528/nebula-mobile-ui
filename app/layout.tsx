import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nebula AI Mobile',
  description: 'Access your AI agents from anywhere',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
