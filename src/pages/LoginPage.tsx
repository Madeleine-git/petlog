import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Input from '../components/shared/Input'
import { validateLogin, validateRegister } from '../utils/validators'
import type { ValidationErrors } from '../utils/validators'
import { authApi } from '../api/auth.api'

export default function LoginPage() {
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [apiError, setApiError] = useState('')

  const handleSubmit = async () => {
    const validationErrors = isRegister
      ? validateRegister(name, email, password)
      : validateLogin(email, password)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setApiError('')
    setLoading(true)

    try {
      const result = isRegister
        ? await authApi.register(name, email, password)
        : await authApi.login(email, password)

      setSuccess(isRegister ? '¡Cuenta creada correctamente!' : '¡Bienvenido de nuevo!')
      login(result.user, result.token)
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (err) {
      setApiError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2">🐾</span>
          <h1 className="text-2xl font-bold text-amber-900">PetLog</h1>
          <p className="text-sm text-amber-700 mt-1">
            {isRegister ? 'Crea tu cuenta' : 'Inicia sesión'}
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2 mb-4 text-center">
            {success}
          </div>
        )}

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4 text-center">
            {apiError}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {isRegister && (
            <Input
              label="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              error={errors.name}
            />
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            error={errors.email}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            className="text-amber-700 font-medium hover:underline"
            onClick={() => {
              setIsRegister(!isRegister)
              setErrors({})
              setSuccess('')
              setApiError('')
            }}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}