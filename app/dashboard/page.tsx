'use client'

import StatsPanel from '@/components/dashboard/StatsPanel'
import FeedbackList from '@/components/feedback/FeedbackList'

export default function DashboardPage() {
  const userId = 'user123' // Reemplazar por ID real de sesión o JWT

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🎛️ Panel de Usuario</h1>
      <StatsPanel userId={userId} />
      <FeedbackList userId={userId} />
    </div>
  )
}