import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-amber-50">
      <span className="text-6xl">🐾</span>
      <h1 className="text-4xl font-bold text-amber-900">404</h1>
      <p className="text-amber-700">Esta página no existe.</p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  )
}