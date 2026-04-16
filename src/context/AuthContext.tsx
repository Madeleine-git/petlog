// eslint-disable-next-line react-refresh/only-export-components
import { createContext, useContext, useState, useCallback } from 'react'
import type { User } from '../types/pet.types'
import { setToken } from '../api/client'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setTokenState] = useState<string | null>(null)

  const login = useCallback((user: User, token: string) => {
    setUser(user)
    setTokenState(token)
    setToken(token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setTokenState(null)
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: token !== null,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }
  return context
}