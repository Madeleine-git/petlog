# Retrospectiva del proyecto — PetLog

---

## Qué aprendí durante el proyecto

Antes de este proyecto tenía una pequeña experiencia con React, pero TypeScript era prácticamente nuevo para mí. Durante el desarrollo aprendí a definir interfaces y tipos para los datos, a tipar las props de los componentes, a usar `import type` correctamente y a entender por qué TypeScript ayuda a detectar errores antes de ejecutar el código.

También aprendí a organizar un proyecto fullstack desde cero: cómo estructurar el frontend con React, cómo crear un backend con Express organizado en capas, y cómo conectarlos a través de una API REST tipada con Axios.

Conceptos que no conocía antes del proyecto y que ahora entiendo:

- Arquitectura por capas en el backend (rutas, controladores, servicios, repositorios)
- Autenticación con JWT y cifrado de contraseñas con bcrypt
- Context API de React para gestionar estado global
- Custom hooks para encapsular lógica reutilizable
- Variables de entorno para separar configuración local y producción
- Despliegue de frontend en Vercel y backend en Render

---

## Cómo conecté frontend, backend y API

El frontend React se comunica con el backend Express a través de un cliente HTTP tipado construido con Axios. Cada vez que el usuario realiza una acción — registrarse, iniciar sesión, crear una mascota — el frontend llama a una función en `src/api/` que hace la petición HTTP al backend.

El backend recibe la petición, la pasa por el middleware de autenticación que verifica el token JWT, luego la enruta al controlador correspondiente, que llama al servicio con la lógica de negocio, y finalmente el repositorio accede a los datos en memoria y devuelve la respuesta.

El token JWT se genera en el backend al hacer login y se guarda en memoria del cliente mediante AuthContext, evitando guardarlo en LocalStorage para mayor seguridad. Axios lo añade automáticamente en cada petición mediante un interceptor.

---

## Principales problemas encontrados

El despliegue en Vercel fue la parte más difícil del proyecto. Los principales problemas fueron:

- `@tailwindcss/vite` no estaba registrado en el `package.json` y Vercel no podía instalarlo durante el build. Se solucionó añadiéndolo explícitamente a `dependencies`.
- El backend tenía CORS configurado solo para `localhost`, lo que bloqueaba las peticiones desde la URL de Vercel en producción. Se solucionó añadiendo un patrón que acepta cualquier subdominio de `vercel.app`.
- Los tipos de Express como `@types/express` estaban en `devDependencies` y Render no los instalaba en producción, causando errores de compilación. Se solucionó moviéndolos a `dependencies`.

Durante el desarrollo también aparecieron errores de TypeScript relacionados con la importación de tipos — en algunos ficheros había que usar `import type` en lugar de `import` normal cuando se importaban solo interfaces o tipos.

---

## Cómo utilicé la IA durante el desarrollo

Utilicé la IA como guía durante todo el proyecto, siguiendo este proceso en cada punto:

1. Preguntaba qué íbamos a hacer y por qué — para entender el concepto antes de escribir código.
2. Pedía que me explicara los conceptos nuevos en términos sencillos con analogías del mundo real.
3. La IA generaba el código y yo lo revisaba antes de pegarlo en VS Code.
4. Si aparecían errores en VS Code o en el navegador, informaba exactamente dónde estaba el error y la IA ayudaba a identificar la causa y la solución.

Este proceso me permitió aprender mientras avanzaba, entendiendo cada decisión técnica en vez de copiar código sin comprenderlo.

---

## Reflexión final

El proyecto fue extenso — más de lo que esperaba al principio. Cubrir frontend, backend, autenticación, despliegue y documentación completa en un solo proyecto requirió mucho trabajo y constancia.

Sin embargo, al final del proyecto tengo una aplicación fullstack real funcionando en producción, con autenticación segura, arquitectura por capas, tipos TypeScript en todo el código y documentación completa. Eso es algo que al principio del ciclo no hubiera imaginado ser capaz de hacer.

Lo que más me llevaré de este proyecto es entender cómo todas las piezas de una aplicación web moderna encajan: el frontend que muestra los datos, el backend que los gestiona, la API que los conecta, y el despliegue que lo pone a disposición de cualquier usuario en internet.