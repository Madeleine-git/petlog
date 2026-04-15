# Rutas y navegación — PetLog

---

## Librería utilizada

React Router v6 — gestiona la navegación entre páginas sin recargar el navegador.

---

## Estructura de rutas

| Ruta | Componente | Protegida | Descripción |
|---|---|---|---|
| `/` | `LoginPage` | No | Formulario de login y registro |
| `/dashboard` | `DashboardPage` | Sí | Lista de mascotas del usuario |
| `/pets/:id` | `PetProfilePage` | Sí | Perfil completo de una mascota |
| `*` | `NotFoundPage` | No | Página 404 para rutas inexistentes |

---

## Configuración en App.tsx

Se configuran las rutas en el componente principal usando BrowserRouter como contenedor, AuthProvider para el contexto global y Routes para definir cada ruta:

- Ruta `/` → LoginPage (pública)
- Ruta `/dashboard` → DashboardPage (protegida con ProtectedRoute)
- Ruta `/pets/:id` → PetProfilePage (protegida con ProtectedRoute)
- Ruta `*` → NotFoundPage (cualquier URL no encontrada)

---

## Rutas protegidas

ProtectedRoute es un componente que envuelve las rutas privadas. Comprueba si hay token en AuthContext — si no hay sesión redirige automáticamente al login sin mostrar la página protegida.

---

## Navegación entre páginas

| Desde | Hacia | Cómo |
|---|---|---|
| `LoginPage` | `DashboardPage` | `useNavigate` tras login exitoso |
| `DashboardPage` | `PetProfilePage` | `useNavigate` al hacer clic en `PetCard` |
| `PetProfilePage` | `DashboardPage` | `useNavigate` con botón "← Volver" |
| Cualquier página | `LoginPage` | `useNavigate` al hacer logout en `Navbar` |

---

## Página 404

Cualquier URL que no coincida con las rutas definidas muestra NotFoundPage gracias al comodín `path="*"`. Muestra un mensaje de error y un botón para volver al inicio.