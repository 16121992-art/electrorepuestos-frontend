import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="border rounded p-4 hover:shadow cursor-pointer">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p>${product.price}</p>
        <p className="text-sm text-gray-500">{product.condition}</p>
      </div>
    </Link>
  );
}
