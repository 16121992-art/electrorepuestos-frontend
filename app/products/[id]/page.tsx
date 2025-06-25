'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
        const res = await fetch(`${baseUrl}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Error al obtener el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div>🔄 Cargando producto...</div>;
  if (error) return <div>❌ {error}</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>${product.price}</p>
    </div>
  ); // ← ✅ AQUÍ ESTÁ CERRANDO EL return
}
