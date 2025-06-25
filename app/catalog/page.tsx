'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError('No se pudo cargar el catálogo')
      }
    }
    fetchProducts()
  }, [])

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
