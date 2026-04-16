# Capa de red y cliente de API — PetLog

---

## Estructura de la capa de red

La capa de red vive en `src/api/` y tiene tres ficheros:

- `client.ts` — instancia Axios con interceptores JWT
- `auth.api.ts` — funciones tipadas para autenticación
- `pets.api.ts` — funciones tipadas para mascotas

---

## client.ts — instancia de Axios

Configura la conexión con el backend y gestiona el token JWT automáticamente.

Base URL: `http://localhost:4000/api`

El interceptor de petición añade el token JWT en la cabecera de cada llamada al backend con el formato `Authorization: Bearer <token>`.

El interceptor de respuesta convierte los errores del servidor en mensajes legibles para mostrar en la UI.

La función `setToken` es llamada desde AuthContext al hacer login o logout para actualizar el token que usa Axios.

---

## auth.api.ts — endpoints de autenticación

| Función | Método | Ruta | Devuelve |
|---|---|---|---|
| `register(name, email, password)` | POST | `/auth/register` | `AuthResponse` |
| `login(email, password)` | POST | `/auth/login` | `AuthResponse` |

AuthResponse contiene el token JWT y los datos del usuario: id, nombre y email.

---

## pets.api.ts — endpoints de mascotas

| Función | Método | Ruta | Devuelve |
|---|---|---|---|
| `getAll()` | GET | `/pets` | `Pet[]` |
| `getById(id)` | GET | `/pets/:id` | `Pet` |
| `create(data)` | POST | `/pets` | `Pet` |
| `update(id, data)` | PUT | `/pets/:id` | `Pet` |
| `remove(id)` | DELETE | `/pets/:id` | `void` |
| `getVaccines(petId)` | GET | `/pets/:id/vaccines` | `Vaccine[]` |
| `addVaccine(petId, data)` | POST | `/pets/:id/vaccines` | `Vaccine` |
| `getVisits(petId)` | GET | `/pets/:id/visits` | `Visit[]` |
| `addVisit(petId, data)` | POST | `/pets/:id/visits` | `Visit` |
| `getReminders(petId)` | GET | `/pets/:id/reminders` | `Reminder[]` |
| `addReminder(petId, data)` | POST | `/pets/:id/reminders` | `Reminder` |

---

## Gestión de los tres estados de red

En los custom hooks `usePets` y `usePetDetail` se gestionan los tres estados:

| Estado | Variable | Descripción |
|---|---|---|
| Carga | `loading: boolean` | true mientras espera respuesta del servidor |
| Éxito | `pets / vaccines / visits...` | datos recibidos del backend |
| Error | `error: string` | mensaje de error si la petición falla |

El patrón usado es try/catch/finally — en el try se llama a la API y se guardan los datos, en el catch se guarda el mensaje de error, y en el finally se desactiva el loading independientemente del resultado.

---

## Fuente de verdad

Los datos de mascotas, vacunas, visitas y recordatorios viven en el backend. El frontend no guarda estos datos en LocalStorage — siempre los pide al servidor. Esto garantiza que los datos son consistentes y están actualizados.
