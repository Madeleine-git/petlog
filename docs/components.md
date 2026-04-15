# Documentación de componentes — PetLog

---

## Componentes compartidos — `src/components/shared/`

### Button

Botón reutilizable con tres variantes visuales.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `label` | `string` | Sí | Texto del botón |
| `onClick` | `() => void` | No | Función al hacer clic |
| `type` | `'button' \| 'submit'` | No | Tipo HTML (default: `'button'`) |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | No | Estilo visual (default: `'primary'`) |
| `loading` | `boolean` | No | Muestra "Cargando..." y desactiva el botón |
| `disabled` | `boolean` | No | Desactiva el botón |

**Uso:**
```tsx
<Button label="Guardar" type="submit" variant="primary" loading={isLoading} />
<Button label="Cancelar" onClick={handleClose} variant="secondary" />
<Button label="Eliminar" onClick={handleDelete} variant="danger" />
```

---

### Input

Campo de texto con label y mensaje de error.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `label` | `string` | Sí | Etiqueta visible sobre el campo |
| `name` | `string` | Sí | Atributo name e id del input |
| `type` | `string` | No | Tipo HTML (default: `'text'`) |
| `value` | `string` | Sí | Valor controlado |
| `onChange` | `(e) => void` | Sí | Manejador del cambio |
| `error` | `string` | No | Mensaje de error en rojo bajo el input |
| `placeholder` | `string` | No | Texto de placeholder |

**Uso:**
```tsx
<Input
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

---

### Card

Contenedor base con fondo blanco, borde y sombra suave. Usado como base para PetCard, VaccineList y VisitList.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `children` | `React.ReactNode` | Sí | Contenido interior |
| `className` | `string` | No | Clases Tailwind adicionales |

**Uso:**
```tsx
<Card className="hover:border-teal-400">
  <p>Contenido</p>
</Card>
```

---

### Modal

Ventana modal genérica con overlay oscuro. Usado para formularios de creación y edición.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `string` | Sí | Título de la ventana modal |
| `onClose` | `() => void` | Sí | Función para cerrar el modal |
| `children` | `React.ReactNode` | Sí | Contenido del modal |

**Uso:**
```tsx
{showModal && (
  <Modal title="Añadir mascota" onClose={() => setShowModal(false)}>
    <PetForm onSubmit={handleCreate} />
  </Modal>
)}
```

---

### ProtectedRoute

Wrapper de React Router que redirige a `/` si no hay usuario autenticado en AuthContext.

**Uso:**
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

---

### Navbar

Barra de navegación superior con el nombre del usuario y botón de logout. Se renderiza en todas las rutas protegidas.

---

## Componentes de mascotas — `src/components/pets/`

### PetCard

Tarjeta que muestra la foto, nombre, especie y raza de una mascota. Al hacer clic navega a `/pets/:id`.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `pet` | `Pet` | Sí | Objeto mascota tipado |

**Composición:** usa `Card` internamente.

**Uso:**
```tsx
{pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
```

---

## Componentes de vacunas — `src/components/vaccines/`

### VaccineList

Lista de vacunas con estado visual (al día / pendiente) basado en la fecha de próxima dosis.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `vaccines` | `Vaccine[]` | Sí | Array de vacunas tipado |

**Composición:** usa `Card` para cada elemento de la lista.

**Uso:**
```tsx
<VaccineList vaccines={vaccines} />
```

---

## Componentes de visitas — `src/components/visits/`

### VisitList

Lista de visitas veterinarias con diagnóstico, medicación y notas.

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `visits` | `Visit[]` | Sí | Array de visitas tipado |

**Uso:**
```tsx
<VisitList visits={visits} />
```

---

## Componentes de recordatorios — `src/components/reminders/`

### ReminderList

Lista de recordatorios con tipo visual (cita, medicación, vacuna).

**Props:**
| Prop | Tipo | Requerido | Descripción |
|---|---|---|---|
| `reminders` | `Reminder[]` | Sí | Array de recordatorios tipado |

**Uso:**
```tsx
<ReminderList reminders={reminders} />
```