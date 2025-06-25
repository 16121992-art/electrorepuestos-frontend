'use client'

import { useState } from 'react'

interface FeedbackFormProps {
  productId: string
  userId?: string
}

export default function FeedbackForm({ productId, userId }: FeedbackFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!userId) {
    alert('Debes iniciar sesión para dejar un comentario.')
    return
  }

  const feedback = {
    productId,
    userId,
    rating,
    comment,
  }

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    })

    if (res.ok) {
      alert('¡Gracias por tu feedback!')
      setComment('')
      setRating(5)
    } else {
      alert('Error al enviar feedback')
    }
  } catch (err) {
    console.error('Error al enviar feedback', err)
  }
}
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded space-y-4">
      <h2 className="text-lg font-bold">Califica tu compra</h2>

      <select
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        className="w-full border p-2 rounded"
      >
        <option value={5}>⭐⭐⭐⭐⭐ Excelente</option>
        <option value={4}>⭐⭐⭐⭐ Bueno</option>
        <option value={3}>⭐⭐⭐ Regular</option>
        <option value={2}>⭐⭐ Malo</option>
        <option value={1}>⭐ Muy malo</option>
      </select>

      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="¿Qué tal fue tu experiencia?"
        className="w-full border p-2 rounded"
        rows={4}
        required
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Enviar Feedback
      </button>
    </form>
  )
}