import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <span className="font-semibold text-teal-700 text-lg">PetLog</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Hola, <span className="font-medium">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}