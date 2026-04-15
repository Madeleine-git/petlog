# Formularios e interacción — PetLog

---

## ¿Qué es un formulario controlado?

En React un formulario controlado es aquel donde cada input está vinculado a un estado con `useState`. Cada vez que el usuario escribe, el estado se actualiza y React redibuja el componente con el nuevo valor.

```tsx
const [email, setEmail] = useState('')

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Formularios implementados

### 1. Formulario de login

**Fichero:** `src/pages/LoginPage.tsx`

**Campos:**
| Campo | Tipo | Validación |
|---|---|---|
| Email | email | Obligatorio, formato válido |
| Contraseña | password | Obligatorio, mínimo 6 caracteres |

**Estados:**
- `email` — valor del campo email
- `password` — valor del campo contraseña
- `errors` — objeto con mensajes de error por campo
- `loading` — true mientras procesa el login
- `success` — mensaje de confirmación tras login exitoso

---

### 2. Formulario de registro

**Fichero:** `src/pages/LoginPage.tsx` (mismo componente, toggle con `isRegister`)

**Campos:**
| Campo | Tipo | Validación |
|---|---|---|
| Nombre | text | Obligatorio, mínimo 2 caracteres |
| Email | email | Obligatorio, formato válido |
| Contraseña | password | Obligatorio, mínimo 6 caracteres |

---

### 3. Formulario de mascota

**Fichero:** `src/pages/DashboardPage.tsx`

**Campos:**
| Campo | Tipo | Validación |
|---|---|---|
| Nombre | text | Obligatorio, mínimo 2 caracteres |
| Especie | text | Obligatorio |
| Raza | text | Opcional |
| Fecha de nacimiento | date | Opcional |
| URL de foto | text | Opcional |

**Estados:**
- `form` — objeto `CreatePetDto` con todos los campos
- `showModal` — controla si el modal está abierto o cerrado

---

## Validación — `src/utils/validators.ts`

Todas las validaciones están centralizadas en un fichero separado. Cada función recibe los valores del formulario y devuelve un objeto con los errores encontrados.

```ts
export function validateLogin(email: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {}
  if (!email) errors.email = 'El email es obligatorio'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'El email no es válido'
  if (!password) errors.password = 'La contraseña es obligatoria'
  else if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres'
  return errors
}
```

Si el objeto devuelto tiene claves, hay errores y no se envía el formulario.

---

## Mensajes de error y confirmación

**Errores** — se muestran en rojo bajo cada campo usando la prop `error` del componente `Input`:

```tsx
<Input
  label="Email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

**Confirmación** — se muestra un banner verde tras una acción exitosa:

```tsx
{success && (
  <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2">
    {success}
  </div>
)}
```