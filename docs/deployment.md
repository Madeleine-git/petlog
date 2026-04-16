# Despliegue — PetLog

---

## URLs de producción

| Servicio | URL |
|---|---|
| Frontend | https://petlog-sepia.vercel.app |
| Backend API | https://petlog-api-173h.onrender.com |
| Health check | https://petlog-api-173h.onrender.com/api/health |

---

## Backend — Render

### Servicio
- Plataforma: Render (plan gratuito)
- Tipo: Web Service
- Runtime: Node.js 22
- Repositorio: https://github.com/Madeleine-git/petlog
- Root Directory: server
- Rama: main

### Comandos
- Build: npm install && npm run build
- Start: node dist/index.js

### Variables de entorno

| Variable | Descripción |
|---|---|
| JWT_SECRET | Clave secreta para firmar tokens JWT |
| NODE_ENV | production |

### Notas importantes
- El plan gratuito de Render suspende el servicio tras 15 minutos de inactividad. La primera petición puede tardar hasta 30 segundos en responder mientras el servidor se reactiva.
- Los datos se guardan en memoria y se pierden cada vez que el servidor se reinicia o redesplega.

---

## Frontend — Vercel

### Servicio
- Plataforma: Vercel (plan gratuito)
- Framework: Vite + React
- Repositorio: https://github.com/Madeleine-git/petlog
- Rama: main

### Variables de entorno

| Variable | Valor |
|---|---|
| VITE_API_URL | https://petlog-api-173h.onrender.com/api |

### Despliegue automático
Vercel redesplega automáticamente el frontend cada vez que se hace push a la rama main.

---

## Variables de entorno locales

Para desarrollo local crea un fichero .env en la raíz del proyecto con:

VITE_API_URL=http://localhost:4000/api

---

## Proceso de despliegue

1. Hacer push a main activa el despliegue automático en Vercel y Render.
2. Render compila el TypeScript con tsc y arranca el servidor con node dist/index.js.
3. Vercel compila el frontend con vite build y lo sirve desde la CDN global.
4. El frontend usa VITE_API_URL para conectar con el backend correcto según el entorno.