'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'

const mockProducts = [
  {
    id: '1',
    name: 'Controlador 36V',
    price: 120000,
    imageUrl: '/images/sample-controller.jpg',
    category: 'controlador',
    brand: 'OEM',
    location: 'Bogotá',
    condition: 'Nuevo',
  },
  {
    id: '2',
    name: 'Motor para bici eléctrica 500W',
    price: 250000,
    imageUrl: '/images/sample-motor.jpg',
    category: 'motor',
    brand: 'Genérico',
    location: 'Medellín',
    condition: 'Usado',
  },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const filtered = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Buscar productos</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-600">No se encontraron productos.</p>
        )}
      </div>
    </section>
  )
}