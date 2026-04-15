import { useState, useCallback } from 'react'
import type { User } from '../types/pet.types'

interface AuthState {
  user: User | null
  token: string | null
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
  })

  const login = useCallback((user: User, token: string) => {
    setAuth({ user, token })
  }, [])

  const logout = useCallback(() => {
    setAuth({ user: null, token: null })
  }, [])

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.token !== null,
    login,
    logout,
  }
}