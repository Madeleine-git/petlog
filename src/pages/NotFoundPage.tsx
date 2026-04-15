import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <span className="text-6xl">🐾</span>
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500">Esta página no existe.</p>
      <Button
        label="Volver al inicio"
        onClick={() => navigate('/')}
        variant="primary"
      />
    </div>
  )
}