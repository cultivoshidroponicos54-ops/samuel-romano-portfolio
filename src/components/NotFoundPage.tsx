import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Página no encontrada</h1>
      <p className="mb-6">La página que buscas no está disponible.</p>
      <Link to="/" className="underline">
        Volver al portafolio
      </Link>
    </div>
  )
}
