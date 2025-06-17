'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'comprador', // valor por defecto
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    if (res.ok) {
      alert('Registro exitoso')
    } else {
      alert(data.message || 'Error en el registro')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h1 className="text-xl font-bold">Registro de Usuario</h1>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      {/* 👇 Aquí va tu <select> */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="comprador">Comprador</option>
        <option value="vendedor">Vendedor</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Registrarse
      </button>
    </form>
  )
}