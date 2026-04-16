# Pruebas manuales — PetLog

---

## Metodología

Se realizaron pruebas manuales de todas las funcionalidades de la aplicación, comprobando los tres estados de red (carga, éxito y error), el diseño responsive y la ausencia de errores en consola.

---

## Pruebas de autenticación

| Prueba | Resultado |
|---|---|
| Iniciar sesión sin rellenar campos | Muestra "El email es obligatorio" y "La contraseña es obligatoria" en rojo ✅ |
| Introducir email con formato incorrecto | Muestra "El email no es válido" ✅ |
| Registrarse con un email ya existente | Muestra "El email ya está registrado" ✅ |
| Login con credenciales correctas | Redirige al dashboard con el nombre del usuario ✅ |
| Cerrar sesión | Redirige al login y limpia el token ✅ |
| Acceder a /dashboard sin sesión | Redirige automáticamente al login ✅ |

---

## Pruebas de mascotas

| Prueba | Resultado |
|---|---|
| Crear una mascota nueva | Aparece en el dashboard con contador actualizado ✅ |
| Ver perfil de una mascota | Muestra nombre, especie, raza y fecha de nacimiento ✅ |
| Navegar entre pestañas (vacunas, visitas, recordatorios) | Cambia el contenido correctamente ✅ |
| Volver al dashboard desde el perfil | Navega correctamente con el botón "← Volver" ✅ |

---

## Pruebas de diseño responsive

| Dispositivo | Resultado |
|---|---|
| Escritorio (1920px) | Layout correcto, todos los elementos visibles ✅ |
| Tablet (768px) | Contenido adaptado correctamente ✅ |
| Móvil (400px) | Navbar, formularios y tarjetas adaptados ✅ |

---

## Revisión de consola

No se encontraron errores en la consola del navegador. Solo aparecen mensajes informativos de React DevTools que no afectan al funcionamiento de la aplicación.

---

## Bugs encontrados y corregidos

| Bug | Solución |
|---|---|
| Emoji en URL de imagen causaba error de TypeScript | Se eliminó el emoji de la URL por defecto |
| `setLoading` dentro de `useEffect` generaba advertencia de ESLint | Se movió el estado inicial de loading a `useState(true)` |
| `ValidationErrors` importado sin `import type` | Se cambió a `import type` en todos los ficheros afectados |
| `AuthContext` exportado dos veces en el mismo fichero | Se eliminó la declaración duplicada |
| `req.params.id` tipado como `string o string[]` en Express | Se añadió `String()` para forzar el tipo string |

## Pruebas de formularios en pestañas

| Prueba | Resultado |
|---|---|
| Abrir modal de vacuna desde pestaña vacunas | Modal aparece con campos nombre, fecha y próxima dosis ✅ |
| Añadir vacuna correctamente | Aparece en la lista de vacunas ✅ |
| Abrir modal de visita desde pestaña visitas | Modal aparece con campos fecha, diagnóstico, medicación y notas ✅ |
| Añadir visita correctamente | Aparece en la lista de visitas ✅ |
| Abrir modal de recordatorio desde pestaña recordatorios | Modal aparece con campos título, fecha y tipo ✅ |
| Añadir recordatorio correctamente | Aparece en la lista de recordatorios ✅ |
| Botón cambia según pestaña activa | "Añadir vacuna", "Añadir visita", "Añadir recordatorio" ✅ |

## Pruebas de diseño y colores

| Prueba | Resultado |
|---|---|
| Paleta ámbar aplicada en login | Fondo amber-50, botón amber-700 ✅ |
| Paleta ámbar aplicada en navbar | Fondo amber-900, texto amber-100 ✅ |
| Paleta ámbar aplicada en dashboard | Fondo amber-50, textos amber-900 ✅ |
| Paleta ámbar aplicada en perfil de mascota | Pestañas y botones en amber ✅ |
| Footer visible en dashboard y perfil | PetLog © en amber-900 ✅ |
