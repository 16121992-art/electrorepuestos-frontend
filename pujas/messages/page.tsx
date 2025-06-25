'use client'

import { useSession } from 'next-auth/react'
import FeedbackForm from '@/components/FeedbackForm'
import { useParams } from 'next/navigation'

export default function FeedbackPage() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { productId } = useParams()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Deja tu opinión</h1>
      <FeedbackForm productId={productId as string} userId={userId} />
    </div>
  )
}