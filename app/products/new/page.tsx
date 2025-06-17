'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simular POST
    console.log('Producto enviado:', form)
    router.push('/dashboard')
  }

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Publicar nuevo producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre del producto"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Precio (COP)"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="category"
          placeholder="Categoría (ej: batería)"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Publicar
        </button>
      </form>
    </section>
  )
}