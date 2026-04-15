# 🐾 PetLog — Diario Digital de Mascotas

> Microapp fullstack, permite a los dueños de mascotas llevar un registro digital organizado de sus animales: vacunas, visitas al veterinario y recordatorios, todo desde una sola aplicación web con autenticación segura.

---

## 🧩 Problema que resuelve

Los dueños de mascotas tienen dificultades para llevar un registro organizado de la salud y el cuidado de sus animales. La información queda dispersa en notas de papel, fotos del móvil o simplemente en la memoria.

**PetLog** centraliza toda esa información en una sola aplicación web, accesible desde cualquier dispositivo, con autenticación segura por usuario.

---

## 👤 Usuario objetivo

Dueños de mascotas domésticas (perros, gatos, conejos…) que quieren tener un historial digital organizado y accesible. También puede ser útil para cuidadores que gestionan varios animales a la vez.

---

## ✅ Funcionalidades principales

🔐 Autenticación segura: Registro y login con email/contraseña. Contraseñas cifradas con bcrypt. Token JWT para identificación segura en cada petición. 
🐶 Perfil de mascota: Nombre, especie, raza, fecha de nacimiento y foto (URL). Soporte para múltiples mascotas por usuario con dashboard para cambiar entre perfiles. 
💉 Historial de vacunas: Registro de vacunas administradas con fecha, próximas dosis pendientes y alertas visuales. 
🏥 Visitas veterinarias : Registro de cada visita con diagnóstico, medicación recetada y notas de seguimiento.
🔔 Recordatorios: Avisos de próximas citas veterinarias, medicación periódica y vacunas pendientes.

---

## ⭐ Funcionalidades opcionales

- **Múltiples mascotas por usuario** — dashboard principal para cambiar entre los perfiles de diferentes animales.

---

## 🚀 Mejoras futuras

- **Base de datos real** — migrar de datos en memoria a PostgreSQL o MongoDB sin cambiar la capa de servicios, gracias al Repository Pattern.
- **Notificaciones push** — recordatorios en tiempo real mediante Service Workers.
- **App móvil** — React Native reutilizando la lógica de negocio ya tipada.
- **Exportar historial en PDF** — informe médico completo para llevar al veterinario.
- **OAuth social** — login con Google.

---

## 🏗️ Arquitectura

El proyecto es un monorepo con frontend y backend separados, organizados en capas.

```
petlog/
├── client/                        # Frontend
│   └── src/
│       ├── pages/                 # Vistas: Login, Dashboard, PetProfile
│       ├── components/            # Componentes reutilizables
│       ├── hooks/                 # Custom hooks (usePets, useAuth)
│       ├── api/                   # Cliente HTTP tipado con Axios
│       │   ├── client.ts          # Instancia Axios con token JWT
│       │   ├── auth.api.ts        # Endpoints de autenticación
│       │   └── pets.api.ts        # Endpoints de mascotas
│       ├── context/               # AuthContext — estado global del usuario
│       └── types/                 # Tipos TypeScript compartidos (Pet, Vaccine…)
│
└── server/                        # Backend
    └── src/
        ├── routes/                # Capa de rutas — recibe las peticiones HTTP
        │   ├── auth.routes.ts
        │   └── pets.routes.ts
        ├── middleware/            # authMiddleware — verifica el JWT en cada ruta
        ├── services/              # Capa de servicios — lógica de negocio
        │   ├── auth.service.ts
        │   └── pet.service.ts
        └── repositories/          # Capa de datos — acceso a los datos
            └── memory.repository.ts   # Datos en memoria + datos de ejemplo
```

### Flujo de una petición

```
Usuario → Página React → api/pets.ts (Axios + JWT)
        → Express Router → authMiddleware (verifica token)
        → Service (lógica) → Repository (datos en memoria)
```

---

## 🔐 Seguridad

### Autenticación
- Contraseñas cifradas con **bcrypt** (nunca se guarda la contraseña en texto plano).
- Al hacer login, el servidor genera un **JWT** firmado con una clave secreta (`JWT_SECRET`) que incluye el `userId` en el payload.

### Identificación segura en cada petición
- El token JWT se guarda en **memoria del cliente** (variable de React en `AuthContext`), no en LocalStorage ni en cookies, para reducir el riesgo de ataques XSS.
- En cada petición al backend, Axios añade automáticamente la cabecera `Authorization: Bearer <token>`.
- El `authMiddleware` de Express verifica la firma del token en cada ruta protegida. Si el token es inválido o ha expirado, devuelve `401 Unauthorized`.

### Otras medidas
- **Helmet.js** para cabeceras HTTP seguras.
- **CORS** configurado para aceptar solo peticiones del frontend.

---

## 📡 Endpoints de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión, devuelve JWT | No |
| GET | `/api/pets` | Listar mascotas del usuario | JWT |
| POST | `/api/pets` | Crear nueva mascota | JWT |
| GET | `/api/pets/:id` | Obtener mascota por ID | JWT |
| PUT | `/api/pets/:id` | Actualizar datos de la mascota | JWT |
| DELETE | `/api/pets/:id` | Eliminar mascota | JWT |
| GET | `/api/pets/:id/vaccines` | Historial de vacunas | JWT |
| POST | `/api/pets/:id/vaccines` | Añadir vacuna | JWT |
| GET | `/api/pets/:id/visits` | Historial de visitas veterinarias | JWT |
| POST | `/api/pets/:id/visits` | Registrar visita veterinaria | JWT |
| GET | `/api/pets/:id/reminders` | Listar recordatorios | JWT |
| POST | `/api/pets/:id/reminders` | Crear recordatorio | JWT |

---

## 🛠️ Stack tecnológico

| Parte | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Cliente HTTP | Axios (tipado con TypeScript) |
| Backend | Express.js (Node.js) |
| Autenticación | JWT + bcrypt |
| Persistencia | Datos en memoria (servidor) + LocalStorage (cliente) |
| Monorepo | npm workspaces |

---

## 🐙 Crear el repositorio en GitHub

### 1. Crear el repositorio desde la web

1. Inicia sesión en [github.com](https://github.com).
2. Haz clic en **"New repository"** (botón verde, arriba a la derecha).
3. Rellena los campos:
   - **Repository name:** `petlog`
   - **Description:** `Diario digital de mascotas`
   - **Visibility:** Public
   - Marca **"Add a README file"**
   - Marca **"Add .gitignore"** y selecciona `Node`
   - Marca **"Choose a license"** y selecciona `MIT`
4. Haz clic en **"Create repository"**.

### 2. Clonar el repositorio en tu equipo

```bash
git clone https://github.com/Madeleine-git/petlog.git
cd petlog
```
### 3. Estructura de ramas recomendada

| Rama | Uso |
|---|---|
| `main` | Código estable, listo para entregar |
| `feature/auth` | Implementación del login y JWT |
| `feature/pets` | Módulo de mascotas |

---