'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          ElectroRepuestos
        </Link>
        <nav className="space-x-4">
          <Link href="/search">Buscar</Link>
          <Link href="/products/new">Publicar</Link>
          <Link href="/login">Ingresar</Link>
        </nav>
      </div>
    </header>
  )
}