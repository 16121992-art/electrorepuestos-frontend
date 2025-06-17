import ProductCard from '@/components/ProductCard';

export default async function ProductosPage() {
  const res = await fetch('http://localhost:4000/api/products');
  const products = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}