// components/NewProductForm.tsx
'use client';
import { useState } from 'react';

export default function NewProductForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'nuevo',
    type: 'precio_fijo',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    });
    const data = await res.json();
    alert('Producto publicado exitosamente');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input type="text" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="border p-2 w-full" />
      <textarea placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border p-2 w-full" />
      <input type="number" placeholder="Precio" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required className="border p-2 w-full" />
      <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} className="border p-2 w-full">
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
      </select>
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="border p-2 w-full">
        <option value="precio_fijo">Precio fijo</option>
        <option value="subasta">Subasta</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Publicar repuesto</button>
    </form>
  );
}