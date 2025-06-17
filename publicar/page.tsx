import NewProductForm from '@/components/NewProductForm';

export default function PublicarPage() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Publicar Repuesto</h1>
      <NewProductForm />
    </div>
  );
}