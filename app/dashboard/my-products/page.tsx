// app/dashboard/my-products/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface Product {
  _id: string
  title: string
  price: number
  condition: string
  auction: boolean
}

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null

  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!userId) {
        setError('Usuario no autenticado')
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`http://localhost:4000/api/products/user/${userId}`)
        if (!res.ok) throw new Error('No se pudieron obtener los productos')

        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message || 'Error inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchMyProducts()
  }, [userId])

  if (loading) return <div className="p-4">🔄 Cargando tus productos...</div>

  if (error)
    return (
      <div className="p-4 text-red-600 bg-red-100 border border-red-300 rounded">
        ❌ {error}
      </div>
    )

  if (products.length === 0)
    return (
      <div className="p-4 text-gray-700">
        🛒 No has publicado productos aún.
      </div>
    )

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 Mis Productos Publicados</h2>
      <ul className="grid gap-4">
        {products.map(product => (
          <li
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>💰 ${product.price}</p>
            <p>🧾 Condición: {product.condition}</p>
            <p>{product.auction ? '🕑 En subasta' : '✔️ Precio fijo'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}