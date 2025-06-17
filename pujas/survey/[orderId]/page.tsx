'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function SurveyPage() {
  const { orderId } = useParams()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes enviar los datos al backend
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Encuesta de satisfacción</h1>
      {submitted ? (
        <p>¡Gracias por tu opinión!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <label className="block">
            ¿Cómo calificarías la experiencia de compra?
            <select className="mt-1 w-full border p-2 rounded" required>
              <option value="">Seleccionar</option>
              <option value="excelente">Excelente</option>
              <option value="buena">Buena</option>
              <option value="regular">Regular</option>
              <option value="mala">Mala</option>
            </select>
          </label>

          <label className="block">
            Comentarios adicionales
            <textarea className="mt-1 w-full border p-2 rounded" rows={4} />
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Enviar
          </button>
        </form>
      )}
    </div>
  )
}