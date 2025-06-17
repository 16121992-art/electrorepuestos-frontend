'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchFromAPI } from '@/lib/api'
import { User, Product } from '@/types'
import ProductCard from '@/components/ProductCard'

export default function UserProfilePage() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!id) return
    fetchFromAPI<User>(`/users/${id}`).then(setUser)
    fetchFromAPI<Product[]>(`/products/user/${id}`).then(setProducts)
  }, [id])

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <h2 className="text-xl font-semibold mb-2">Productos publicados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  )
}