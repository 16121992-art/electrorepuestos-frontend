'use client';

import { useEffect, useState } from 'react';
import { fetchFromAPI } from '@/lib/api';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  title: string;
  price: number;
  condition: string;
  auction?: boolean;
  image?: string;
}

export default function Algo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchFromAPI<Product[]>('/api/products');
        setProducts(data.slice(0, 6)); // Solo los primeros 6
      } catch (err: any) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className="p-4">🔄 Cargando productos...</div>;
  if (error)
    return (
      <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded">
        ❌ {error}
      </div>
    );

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">⚡ Repuestos destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}