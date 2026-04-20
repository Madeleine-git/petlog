import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { useAuthContext } from './context/AuthContext'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const PetProfilePage = lazy(() => import('./pages/PetProfilePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl">🐾</span>
        <p className="text-amber-700 text-sm font-medium">Cargando...</p>
      </div>
    </div>
  )
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/pets/:id" element={
              <ProtectedRoute>
                <PetProfilePage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}