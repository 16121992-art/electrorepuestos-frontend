'use client'

import { useParams } from 'next/navigation'
import FeedbackForm from '@/components/FeedbackForm'

export default function FeedbackPage() {
  const { productId } = useParams()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Deja tu opinión</h1>
      <FeedbackForm productId={productId as string} userId="user123" />
    </div>
  )
}