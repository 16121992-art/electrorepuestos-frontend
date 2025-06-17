// app/layout.tsx
import '../styles/globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ElectroRepuestos',
  description: 'Marketplace de repuestos para vehículos eléctricos',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}