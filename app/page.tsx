// app/page.tsx
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}