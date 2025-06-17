'use client';

import { useState } from 'react';

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    condition: 'Nuevo',
    auction: false,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  const isCheckbox = e.target instanceof HTMLInputElement && e.target.type === 'checkbox';
  const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

  setFormData(prev => ({
    ...prev,
    [name]: isCheckbox ? checked : value,
  }));
};

  const validateForm = () => {
    const newErrors = [];

    if (!formData.title.trim()) {
      newErrors.push('El título es obligatorio');
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.push('El precio debe ser un número mayor que 0');
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
    const payload = {
      ...formData,
      price: Number(formData.price), // ✅ Convertir aquí
    };

    const res = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('✅ Producto creado exitosamente');
      setFormData({ title: '', price: '', condition: 'Nuevo', auction: false });
    } else {
      alert('❌ Error al crear el producto');
    }
  } catch (err) {
    console.error('Error en el envío:', err);
    alert('❌ Ocurrió un error al enviar el formulario');
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded bg-white shadow"
    >
      <h2 className="text-xl font-bold text-gray-700">Crear nuevo producto</h2>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-600 p-2 rounded">
          {errors.map((err, idx) => (
            <p key={idx}>• {err}</p>
          ))}
        </div>
      )}

      <input
        type="text"
        name="title"
        placeholder="Título del producto"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        min="1"
        step="any"
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Nuevo">Nuevo</option>
        <option value="Usado">Usado</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="auction"
          checked={formData.auction}
          onChange={handleChange}
        />
        ¿Es subasta?
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Crear producto
      </button>
    </form>
  );
}