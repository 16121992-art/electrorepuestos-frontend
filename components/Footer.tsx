export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm p-4 mt-10">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} ElectroRepuestos. Todos los derechos reservados.
      </div>
    </footer>
  )
}