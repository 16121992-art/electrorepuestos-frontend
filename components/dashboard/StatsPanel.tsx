'use client'

import { useEffect, useState } from 'react'

export default function StatsPanel({ userId }: { userId: string }) {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`/api/users/${userId}/stats`)
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [userId])

  if (!stats) return <div>🔄 Cargando estadísticas...</div>

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <h2 className="text-xl font-bold">📊 Tus estadísticas</h2>
      <p>🛒 Productos publicados: {stats.totalProducts}</p>
      <p>📦 Ventas completadas: {stats.completedSales}</p>
      <p>⭐ Promedio de calificaciones: {stats.averageRating?.toFixed(2) || 'Sin feedback'}</p>
    </div>
  )
}