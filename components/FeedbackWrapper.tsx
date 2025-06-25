'use client'

import { useSession } from 'next-auth/react'
import FeedbackForm from './FeedbackForm'

interface FeedbackWrapperProps {
  productId: string
}

export default function FeedbackWrapper({ productId }: FeedbackWrapperProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Cargando...</p>
  if (!session?.user?.id) return <p>Inicia sesión para dejar feedback</p>

  return (
    <FeedbackForm
      productId={productId}
      userId={session.user.id}
    />
  )
}