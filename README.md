# 🐾 PetLog — Diario Digital de Mascotas

Aplicación web fullstack para el registro y seguimiento de mascotas. Desarrollada como proyecto del ciclo ASIR, permite a los usuarios gestionar el historial médico de sus animales — vacunas, visitas veterinarias y recordatorios — desde cualquier dispositivo, con autenticación segura.

**Frontend:** https://petlog-sepia.vercel.app
**API:** https://petlog-api-173h.onrender.com
**Swagger/Docs:** https://petlog-api-173h.onrender.com/api/docs

---

## El problema

Los dueños de mascotas no tienen una forma sencilla de centralizar la información de salud de sus animales. La información queda dispersa entre notas de papel, fotos del móvil y la memoria, lo que dificulta el seguimiento correcto de vacunas, medicaciones y citas veterinarias.

PetLog resuelve esto ofreciendo un registro digital organizado, accesible desde cualquier dispositivo y protegido por autenticación de usuario.

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| Autenticación | Registro y login con email y contraseña. JWT en memoria del cliente, bcrypt en el servidor. |
| Mascotas | Crear, editar y gestionar múltiples perfiles de mascota por usuario. |
| Vacunas | Registrar vacunas con fecha administrada y próxima dosis. Estado visual al día / pendiente. |
| Visitas veterinarias | Historial de visitas con diagnóstico, medicación y notas. |
| Recordatorios | Avisos de citas, medicación periódica y vacunas pendientes. |

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Routing | React Router v6 |
| Estado global | Context API + custom hooks |
| Cliente HTTP | Axios con interceptores JWT |
| Backend | Node.js + Express |
| Autenticación | JWT + bcrypt |
| Seguridad | Helmet.js + CORS |
| Persistencia | Datos en memoria (Repository Pattern) |
| Documentación API | Swagger / OpenAPI 3.0 |
| Despliegue frontend | Vercel |
| Despliegue backend | Render |

---

## Arquitectura

El proyecto es un monorepo con frontend y backend en el mismo repositorio, organizados en capas.

```
petlog/
├── src/                           # Frontend React
│   ├── api/                       # Cliente HTTP tipado con Axios
│   │   ├── client.ts              # Instancia Axios + interceptor JWT
│   │   ├── auth.api.ts            # Funciones tipadas de autenticación
│   │   └── pets.api.ts            # Funciones tipadas de mascotas
│   ├── components/                # Componentes reutilizables y por módulo
│   ├── context/                   # AuthContext — estado global de sesión
│   ├── hooks/                     # usePets, usePetDetail, useAuth, useForm
│   ├── pages/                     # LoginPage, DashboardPage, PetProfilePage
│   └── types/                     # Interfaces TypeScript compartidas
│
└── server/                        # Backend Express
    └── src/
        ├── routes/                # Capa de rutas
        ├── controllers/           # Capa de controladores
        ├── services/              # Capa de servicios — lógica de negocio
        ├── repositories/          # Capa de datos — Repository Pattern
        ├── middleware/            # authMiddleware — verificación JWT
        └── config/                # Configuración JWT + Swagger
```

### Flujo de una petición

```
Usuario → React Page → API Client (Axios + JWT)
        → Express Router → authMiddleware
        → Controller → Service → Repository
        → Respuesta JSON → useState → re-render
```

---

## Seguridad

- Contraseñas cifradas con bcrypt — nunca se almacenan en texto plano.
- Autenticación mediante JWT firmado con clave secreta en el servidor.
- Token guardado en memoria del cliente (AuthContext), no en LocalStorage, para evitar ataques XSS.
- authMiddleware protege todas las rutas privadas — devuelve 401 si el token es inválido o ha expirado.
- Helmet.js para cabeceras HTTP seguras.
- CORS configurado para aceptar solo peticiones del frontend en producción.

---

## API REST

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | /api/auth/register | No | Registrar usuario |
| POST | /api/auth/login | No | Iniciar sesión |
| GET | /api/pets | JWT | Listar mascotas |
| POST | /api/pets | JWT | Crear mascota |
| GET | /api/pets/:id | JWT | Obtener mascota |
| PUT | /api/pets/:id | JWT | Actualizar mascota |
| DELETE | /api/pets/:id | JWT | Eliminar mascota |
| GET | /api/pets/:id/vaccines | JWT | Historial de vacunas |
| POST | /api/pets/:id/vaccines | JWT | Añadir vacuna |
| GET | /api/pets/:id/visits | JWT | Historial de visitas |
| POST | /api/pets/:id/visits | JWT | Registrar visita |
| GET | /api/pets/:id/reminders | JWT | Listar recordatorios |
| POST | /api/pets/:id/reminders | JWT | Crear recordatorio |

Documentación interactiva disponible en https://petlog-api-173h.onrender.com/api/docs

---

## Bonus implementados

| Funcionalidad | Descripción |
|---|---|
| Lazy loading | Páginas cargadas bajo demanda con React.lazy y Suspense |
| Segundo custom hook | useForm — gestión genérica de formularios con validación |
| Animaciones | Transiciones en modales y hover en tarjetas de mascotas |
| Drag & drop | Reordenar mascotas en el dashboard arrastrando las tarjetas |
| Swagger/OpenAPI | Documentación interactiva de la API en /api/docs |

---

## Instalación local

### Requisitos
- Node.js 18+
- npm

### Frontend

```bash
git clone https://github.com/Madeleine-git/petlog.git
cd petlog
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Variables de entorno

Crea un fichero .env en la raíz del proyecto:

```
VITE_API_URL=http://localhost:4000/api
```

Crea un fichero .env en server/:

```
JWT_SECRET=tu_clave_secreta
NODE_ENV=development
```

---

## Documentación

| Documento | Descripción |
|---|---|
| docs/design.md | Arquitectura y decisiones técnicas |
| docs/api.md | Endpoints REST con ejemplos |
| docs/api-client.md | Capa de red y tipos TypeScript |
| docs/components.md | Componentes React documentados |
| docs/hooks.md | Custom hooks |
| docs/context.md | Context API |
| docs/routing.md | Rutas y navegación |
| docs/forms.md | Formularios y validación |
| docs/testing.md | Pruebas manuales |
| docs/deployment.md | Proceso de despliegue |
| docs/retrospective.md | Reflexión final |

---

## Gestión del proyecto

- Tablero Trello: https://trello.com/b/AmrTLslC/petlog
- Documentación de gestión: docs/project-management.md

---

## Mejoras futuras

- Base de datos real (PostgreSQL o MongoDB) — el Repository Pattern permite la migración sin tocar la capa de servicios.
- Notificaciones push mediante Service Workers.
- App móvil con React Native reutilizando la lógica de negocio tipada.
- Exportar historial médico en PDF.
- Login con Google (OAuth).
- Tests automáticos con React Testing Library.

---

## Licencia

MIT © 2026