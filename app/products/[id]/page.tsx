'use client'

import { useEffect, useState } from 'react'
import ChatBox from '@/components/ChatBox'
import FeedbackForm from '@/components/FeedbackForm'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const userId = 'usuario123' // ⚠️ Simulación, reemplazar por el ID real del usuario logueado

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${params.id}`)
        if (!res.ok) {
          throw new Error('No se pudo obtener el producto')
        }
        const data = await res.json()
        setProduct(data)
      } catch (err: any) {
        setError(err.message || 'Error inesperado al cargar el producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) return <div className="p-4">🔄 Cargando producto...</div>

  if (error)
    return (
      <div className="bg-red-100 text-red-800 p-3 rounded border border-red-400">
        ❌ Error: {error}
      </div>
    )

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white shadow p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg">💰 Precio: ${product.price}</p>
        <p className="text-sm">📦 Condición: {product.condition}</p>
        <p>{product.auction ? '🕑 Producto en subasta' : '✔️ Precio fijo'}</p>
      </div>

      {product?.sellerId && (
        <ChatBox userId={userId} otherUserId={product.sellerId} />
      )}

      <FeedbackForm productId={product._id} userId={userId} />
    </div>
  )
}