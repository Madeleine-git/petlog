# Context API — PetLog

---

## ¿Qué es Context API?

Context API es una herramienta de React que permite compartir datos entre componentes sin necesidad de pasar props de componente en componente. Es útil cuando varios componentes necesitan acceder al mismo dato.

---

## ¿Cuándo es útil usar Context?

| Situación | ¿Usar Context? |
|---|---|
| Dato que usan muchos componentes (usuario, tema, idioma) | Sí |
| Dato que solo usa un componente | No — mejor useState local |
| Lista de mascotas que solo usa DashboardPage | No — mejor custom hook |
| Token JWT que necesitan Navbar, ProtectedRoute y Axios | Sí |

**Regla general:** si tienes que pasar una prop por más de 2 niveles de componentes, es momento de usar Context.

---

## Implementación — AuthContext

### Fichero: `src/context/AuthContext.tsx`

El AuthContext gestiona el estado global de autenticación. Cualquier componente de la app puede saber si hay un usuario autenticado y acceder a su token JWT.

### Partes del contexto

**1. Interfaz del contexto** — define qué datos y funciones expone:
```ts
interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}
```

**2. Creación del contexto:**
```ts
const AuthContext = createContext<AuthContextType | null>(null)
```

**3. Provider** — envuelve la app y comparte el estado:
```tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  ...
  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**4. Hook personalizado** — para consumir el contexto fácilmente:
```ts
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  return context
}
```

---

## Cómo se usa en la app

### 1. Envolver la app con el Provider en `main.tsx`
```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### 2. Consumir el contexto en cualquier componente
```tsx
const { user, isAuthenticated, logout } = useAuthContext()
```

### 3. Ejemplos de uso en distintos componentes

**Navbar** — muestra el nombre del usuario y el botón logout:
```tsx
const { user, logout } = useAuthContext()
```

**ProtectedRoute** — redirige si no hay sesión:
```tsx
const { isAuthenticated } = useAuthContext()
if (!isAuthenticated) return <Navigate to="/" />
```

**Axios interceptor** — añade el token en cada petición:
```tsx
const { token } = useAuthContext()
config.headers.Authorization = `Bearer ${token}`
```