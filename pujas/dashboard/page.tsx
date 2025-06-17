'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken, isLoggedIn, removeToken } from '@/lib/auth'
import { fetchFromAPI } from '@/lib/api'
import { Product, User } from '@/types'
import ProductCard from '@/components/ProductCard'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    const token = getToken()

    const fetchUserData = async () => {
      try {
        const userData = await fetchFromAPI<User>('/auth/me', 'GET', undefined, token || '')
        const userProducts = await fetchFromAPI<Product[]>('/products/my', 'GET', undefined, token || '')
        setUser(userData)
        setProducts(userProducts)
      } catch (err) {
        console.error('Error cargando datos del dashboard:', err)
        removeToken()
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    removeToken()
    router.push('/login')
  }

  if (loading) return <p className="p-4">Cargando panel...</p>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
          <p className="text-sm text-gray-600">Rol: {user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Mis productos publicados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No has publicado ningún producto todavía.</p>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  )
}