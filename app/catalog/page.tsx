// app/catalog/page.tsx

import Algo from '@/components/Algo';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">📚 Catálogo de Productos</h1>
      <Algo />
    </main>
  );
}
