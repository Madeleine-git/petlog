# Hooks — PetLog

---

## Hooks de React utilizados

### useState
Guarda un dato en memoria y cuando cambia React redibuja el componente automáticamente.

**Ejemplo en usePets:**
```ts
const [pets, setPets] = useState<Pet[]>([])
```
`pets` empieza vacío. Cuando llegan los datos de la API se llama a `setPets` y la pantalla se actualiza.

---

### useEffect
Ejecuta código cuando el componente se monta o cuando cambia algún dato. Se usa para llamar a la API al cargar la página.

**Ejemplo en usePets:**
```ts
useEffect(() => {
  const timer = setTimeout(() => {
    setPets(MOCK_PETS)
    setLoading(false)
  }, 500)
  return () => clearTimeout(timer)
}, [])
```
El array vacío `[]` significa que solo se ejecuta una vez al montar el componente. El `return` limpia el timer si el componente se desmonta antes de que termine.

---

### useMemo
Evita recalcular un valor si los datos no han cambiado. Útil para cálculos que dependen de listas grandes.

**Ejemplo en usePets:**
```ts
const totalPets = useMemo(() => pets.length, [pets])
```
Solo recalcula `totalPets` cuando cambia el array `pets`.

**Ejemplo en usePetDetail:**
```ts
const pendingReminders = useMemo(
  () => reminders.filter(r => new Date(r.date) > new Date()),
  [reminders]
)
```
Solo filtra los recordatorios pendientes cuando cambia el array `reminders`.

---

### useCallback
Evita recrear una función en cada render. Útil cuando la función se pasa como prop a un componente hijo.

**Ejemplo en usePets:**
```ts
const createPet = useCallback((data: CreatePetDto) => {
  const newPet: Pet = { id: Date.now().toString(), userId: '1', ...data }
  setPets((prev) => [...prev, newPet])
}, [])
```
`createPet` solo se crea una vez gracias al array vacío `[]`.

---

## Custom hooks

### useAuth — `src/hooks/useAuth.ts`
Gestiona el estado de autenticación del usuario. Guarda el token JWT en memoria de React.

**Devuelve:**
| Valor | Tipo | Descripción |
|---|---|---|
| `user` | `User \| null` | Usuario autenticado o null |
| `token` | `string \| null` | Token JWT en memoria |
| `isAuthenticated` | `boolean` | true si hay token activo |
| `login` | `(user, token) => void` | Guarda usuario y token |
| `logout` | `() => void` | Limpia usuario y token |

**Uso:**
```ts
const { user, isAuthenticated, login, logout } = useAuth()
```

---

### usePets — `src/hooks/usePets.ts`
Gestiona la lista de mascotas del usuario. Simula una llamada a la API con datos de ejemplo.

**Devuelve:**
| Valor | Tipo | Descripción |
|---|---|---|
| `pets` | `Pet[]` | Lista de mascotas |
| `loading` | `boolean` | true mientras carga |
| `totalPets` | `number` | Total de mascotas (useMemo) |
| `createPet` | `(data) => void` | Añade una mascota |
| `deletePet` | `(id) => void` | Elimina una mascota |

**Uso:**
```ts
const { pets, loading, totalPets, createPet } = usePets()
```

---

### usePetDetail — `src/hooks/usePetDetail.ts`
Carga el detalle completo de una mascota: vacunas, visitas y recordatorios.

**Parámetros:**
| Parámetro | Tipo | Descripción |
|---|---|---|
| `petId` | `string` | ID de la mascota a cargar |

**Devuelve:**
| Valor | Tipo | Descripción |
|---|---|---|
| `vaccines` | `Vaccine[]` | Historial de vacunas |
| `visits` | `Visit[]` | Historial de visitas |
| `reminders` | `Reminder[]` | Lista de recordatorios |
| `pendingReminders` | `Reminder[]` | Recordatorios futuros (useMemo) |
| `loading` | `boolean` | true mientras carga |
| `addVaccine` | `(v) => void` | Añade una vacuna |
| `addVisit` | `(v) => void` | Añade una visita |
| `addReminder` | `(r) => void` | Añade un recordatorio |

**Uso:**
```ts
const { vaccines, visits, reminders, pendingReminders } = usePetDetail(petId)
```

---

### useForm — `src/hooks/useForm.ts`

Custom hook genérico para gestionar cualquier formulario de la app. Centraliza los valores, los errores y el estado de envío.

**Parámetros:**
| Parámetro | Tipo | Descripción |
|---|---|---|
| `initialValues` | `T extends Record<string, string>` | Valores iniciales del formulario |
| `validate` | `(values: T) => FormErrors` | Función de validación opcional |

**Devuelve:**
| Valor | Tipo | Descripción |
|---|---|---|
| `values` | `T` | Valores actuales del formulario |
| `errors` | `FormErrors` | Errores de validación por campo |
| `isSubmitting` | `boolean` | true mientras se procesa el envío |
| `handleChange` | `(e) => void` | Manejador de cambios en inputs y selects |
| `handleSubmit` | `(onSubmit) => Promise<void>` | Valida y ejecuta el envío |
| `reset` | `() => void` | Resetea valores y errores |

**Uso:**
```ts
const { values, errors, isSubmitting, handleChange, handleSubmit, reset } = useForm(
  { name: '', email: '', password: '' },
  (values) => validateRegister(values.name, values.email, values.password)
)
```