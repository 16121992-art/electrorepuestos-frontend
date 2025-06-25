// app/page.tsx

import Algo from '@/components/Algo';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">🚗 Bienvenido a ElectroRepuestos</h1>
      <Algo />
    </main>
  );
}