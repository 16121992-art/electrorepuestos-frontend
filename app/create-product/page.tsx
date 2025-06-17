import CreateProductForm from '@/components/CreateProductForm';

export default function CreateProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo producto</h1>
      <CreateProductForm />
    </div>
  );
}