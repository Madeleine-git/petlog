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
    <nav className="bg-amber-900 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <span className="font-semibold text-amber-100 text-lg">PetLog</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-amber-200">
          Hola, <span className="font-medium text-white">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-amber-300 hover:text-white font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}