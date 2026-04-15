import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'

export default function LoginPage() {
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      login(
        { id: '1', name: name || 'Usuario', email },
        'mock-jwt-token'
      )
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2">🐾</span>
          <h1 className="text-2xl font-bold text-teal-700">PetLog</h1>
          <p className="text-sm text-gray-400 mt-1">
            {isRegister ? 'Crea tu cuenta' : 'Inicia sesión'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {isRegister && (
            <Input
              label="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button
            label={isRegister ? 'Registrarse' : 'Iniciar sesión'}
            type="submit"
            variant="primary"
            loading={loading}
            onClick={handleSubmit}
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            className="text-teal-600 font-medium hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}