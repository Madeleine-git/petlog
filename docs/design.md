# Decisiones de diseño — PetLog

---

## 1. Estructura de componentes principales

### Páginas
Cada página corresponde a una ruta de React Router. Solo `LoginPage` es pública.

| Página | Ruta | Descripción |
|---|---|---|
| `LoginPage` | `/` | Formulario de login y registro. Si hay token activo redirige al dashboard. |
| `DashboardPage` | `/dashboard` | Lista de mascotas del usuario. Punto de entrada tras el login. |
| `PetProfilePage` | `/pets/:id` | Perfil completo: datos, vacunas, visitas y recordatorios. |
| `NotFoundPage` | `*` | Página 404 para rutas inexistentes. |

---

## 2. Componentes reutilizables

Viven en `src/components/shared/` y no dependen de ningún módulo concreto.

| Componente | Descripción |
|---|---|
| `Button` | Variantes primary, secondary y danger. Prop `loading` para estados de espera. |
| `Input` | Campo de texto con label y mensaje de error. |
| `Card` | Contenedor base reutilizado por PetCard, VaccineCard y VisitCard. |
| `Modal` | Ventana modal genérica para formularios de creación y edición. |
| `Navbar` | Barra de navegación con nombre de usuario y logout. Solo en rutas protegidas. |
| `ProtectedRoute` | Redirige a `/` si no hay token en AuthContext. |

---

## 3. Gestión del estado

| Tipo | Herramienta | Qué gestiona |
|---|---|---|
| Global | `AuthContext` | Token JWT y datos del usuario autenticado |
| Local | `usePets` hook | Lista de mascotas del usuario |
| Local | `usePetDetail` hook | Perfil completo de una mascota concreta |
| HTTP | Axios + interceptor | Añade JWT automáticamente en cada petición |

**Decisión:** se usa Context solo para la autenticación. El resto del estado es local en cada página mediante custom hooks. Esto simplifica el código y evita complejidad innecesaria.

---

## 4. API REST — recursos y contratos

### Base URL
```
http://localhost:4000/api
```

### Autenticación

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | `{ token, user }` |

### Mascotas

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| GET | `/pets` | — | `Pet[]` |
| POST | `/pets` | `{ name, species, breed, birthDate, photoUrl }` | `Pet` |
| GET | `/pets/:id` | — | `Pet` |
| PUT | `/pets/:id` | `{ name, species, breed, birthDate, photoUrl }` | `Pet` |
| DELETE | `/pets/:id` | — | `{ ok: true }` |

### Vacunas

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| GET | `/pets/:id/vaccines` | — | `Vaccine[]` |
| POST | `/pets/:id/vaccines` | `{ name, date, nextDate }` | `Vaccine` |

### Visitas veterinarias

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| GET | `/pets/:id/visits` | — | `Visit[]` |
| POST | `/pets/:id/visits` | `{ date, diagnosis, medication, notes }` | `Visit` |

### Recordatorios

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| GET | `/pets/:id/reminders` | — | `Reminder[]` |
| POST | `/pets/:id/reminders` | `{ title, date, type }` | `Reminder` |

### Tipos de respuesta

```ts
type Pet = {
  id: string
  userId: string
  name: string
  species: string
  breed: string
  birthDate: string
  photoUrl?: string
}

type Vaccine = {
  id: string
  petId: string
  name: string
  date: string
  nextDate?: string
}

type Visit = {
  id: string
  petId: string
  date: string
  diagnosis: string
  medication?: string
  notes?: string
}

type Reminder = {
  id: string
  petId: string
  title: string
  date: string
  type: 'appointment' | 'medication' | 'vaccine'
}
```

---

## 5. Qué datos se persisten dónde

| Dato | Dónde se guarda | Por qué |
|---|---|---|
| Usuarios (email + contraseña cifrada) | Memoria del servidor | Necesita bcrypt y JWT — solo el servidor lo gestiona |
| Mascotas, vacunas, visitas, recordatorios | Memoria del servidor | Son datos compartidos entre sesiones |
| Token JWT | Memoria del cliente (AuthContext) | Más seguro que LocalStorage — evita ataques XSS |
| Preferencias de UI (última mascota seleccionada) | LocalStorage del navegador | Solo afecta al cliente, no necesita servidor |

**Decisión:** no se usa base de datos. Los datos del servidor viven en un array en memoria — se pierden al reiniciar el servidor. Es suficiente para el proyecto académico y permite centrarse en la arquitectura sin configurar una BD.

---

## 6. Flujo de datos

```
Usuario
  │
  ▼
Página React (LoginPage / DashboardPage / PetProfilePage)
  │
  ▼
Custom Hook (usePets / usePetDetail)
  │
  ▼
API Client — api/pets.api.ts (función tipada con TypeScript)
  │
  ▼
Axios — añade cabecera Authorization: Bearer <token> (interceptor)
  │
  ▼
Express Router — recibe la petición HTTP
  │
  ▼
authMiddleware — verifica el JWT, extrae userId
  │
  ▼
Service — lógica de negocio (PetService, VaccineService…)
  │
  ▼
Repository — acceso a los datos en memoria
  │
  ▼
Respuesta JSON → de vuelta al hook → actualiza useState → re-render
```

---

## 7. Decisiones de arquitectura

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| Datos en memoria en el servidor | Base de datos PostgreSQL | Simplifica el setup sin sacrificar la arquitectura por capas |
| JWT en memoria del cliente | JWT en LocalStorage | LocalStorage es vulnerable a XSS; la memoria de React no |
| Custom hooks para estado local | Redux o Zustand | El estado no se comparte entre páginas — no justifica una librería global |
| Repository Pattern en el backend | Acceso directo al array desde el servicio | Permite sustituir por una BD real en el futuro sin tocar los servicios |
| Monorepo (client/ + server/) | Repos separados | Más sencillo para un proyecto académico individual |