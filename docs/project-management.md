# Gestión del proyecto — PetLog

## Herramientas utilizadas

- **GitHub:** https://github.com/Madeleine-git/petlog
- **Trello:** https://trello.com/b/AmrTLslC/petlog

## Organización del trabajo

El desarrollo del proyecto se organiza mediante un tablero Trello con 5 columnas:

| Columna | Uso |
|---|---|
| Backlog | Todas las tareas pendientes del proyecto |
| Todo | Tareas seleccionadas para trabajar próximamente |
| In Progress | Tarea en la que se está trabajando actualmente |
| Review | Tareas terminadas pendientes de revisión |
| Done | Tareas completadas y verificadas |

## Tarjetas del proyecto

1. **Configuración del monorepo** — Crear repo en GitHub, npm workspaces y estructura de carpetas.
2. **Setup React + TS + Tailwind** — Configuración del frontend con Vite, React, TypeScript y Tailwind CSS.
3. **Setup Express por capas** — Configuración del backend con arquitectura routes/services/repositories.
4. **Autenticación — registro y login** — JWT, bcrypt y middleware de autenticación.
5. **Pantalla login / registro** — Formularios y AuthContext en el frontend.
6. **API de mascotas** — Endpoints CRUD para gestionar mascotas.
7. **Dashboard y perfil de mascota** — Interfaz para gestionar múltiples mascotas.
8. **Vacunas, visitas y recordatorios** — Endpoints y servicios para el historial médico.

## Flujo de trabajo

1. Las tareas nuevas entran en **Backlog**.
2. Cuando empiezo a trabajar en una tarea la muevo a **In Progress**.
3. Al terminarla la muevo a **Review** para revisarla.
4. Si funciona correctamente la muevo a **Done**.

## Convención de commits

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de errores |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de estilos |
| `refactor:` | Refactorización de código |