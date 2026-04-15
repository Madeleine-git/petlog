# Documentación de la API — PetLog

---

## Base URL

```
http://localhost:4000/api
```

---

## Códigos HTTP utilizados

| Código | Significado |
|---|---|
| 200 | OK — petición correcta |
| 201 | Created — recurso creado correctamente |
| 400 | Bad Request — datos incorrectos o faltantes |
| 401 | Unauthorized — token no proporcionado o inválido |
| 404 | Not Found — recurso no encontrado |
| 500 | Internal Server Error — error del servidor |

---

## Autenticación

Las rutas protegidas requieren un token JWT en la cabecera:

```
Authorization: Bearer <token>
```

---

## Endpoints de autenticación

### POST /api/auth/register

Registra un nuevo usuario.

**Body:**
```json
{
  "name": "María",
  "email": "maria@email.com",
  "password": "123456"
}
```

**Respuesta 201:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "1718000000000",
    "name": "María",
    "email": "maria@email.com"
  }
}
```

**Respuesta 400:**
```json
{ "error": "El email ya está registrado" }
```

---

### POST /api/auth/login

Inicia sesión con un usuario existente.

**Body:**
```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

**Respuesta 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "1718000000000",
    "name": "María",
    "email": "maria@email.com"
  }
}
```

**Respuesta 400:**
```json
{ "error": "Email o contraseña incorrectos" }
```

---

## Endpoints de mascotas

Todas las rutas requieren token JWT.

### GET /api/pets

Devuelve todas las mascotas del usuario autenticado.

**Respuesta 200:**
```json
[
  {
    "id": "1",
    "userId": "1718000000000",
    "name": "Luna",
    "species": "Perro",
    "breed": "Labrador",
    "birthDate": "2020-03-15",
    "photoUrl": ""
  }
]
```

---

### POST /api/pets

Crea una nueva mascota.

**Body:**
```json
{
  "name": "Luna",
  "species": "Perro",
  "breed": "Labrador",
  "birthDate": "2020-03-15",
  "photoUrl": ""
}
```

**Respuesta 201:**
```json
{
  "id": "1718000000001",
  "userId": "1718000000000",
  "name": "Luna",
  "species": "Perro",
  "breed": "Labrador",
  "birthDate": "2020-03-15",
  "photoUrl": ""
}
```

---

### GET /api/pets/:id

Devuelve una mascota por ID.

**Respuesta 200:**
```json
{
  "id": "1",
  "userId": "1718000000000",
  "name": "coco",
  "species": "Perro",
  "breed": "Perro de Agua",
  "birthDate": "2023-09-14"
}
```

**Respuesta 404:**
```json
{ "error": "Mascota no encontrada" }
```

---

### PUT /api/pets/:id

Actualiza los datos de una mascota.

**Body:**
```json
{
  "name": "Luna",
  "breed": "Golden Retriever"
}
```

**Respuesta 200:**
```json
{
  "id": "1",
  "userId": "1718000000000",
  "name": "Luna",
  "species": "Perro",
  "breed": "Golden Retriever",
  "birthDate": "2020-03-15"
}
```

---

### DELETE /api/pets/:id

Elimina una mascota.

**Respuesta 200:**
```json
{ "ok": true }
```

---

## Endpoints de vacunas

### GET /api/pets/:id/vaccines

Devuelve el historial de vacunas de una mascota.

**Respuesta 200:**
```json
[
  {
    "id": "1",
    "petId": "1",
    "name": "Rabia",
    "date": "2025-01-10",
    "nextDate": "2026-01-10"
  }
]
```

---

### POST /api/pets/:id/vaccines

Añade una vacuna a una mascota.

**Body:**
```json
{
  "name": "Rabia",
  "date": "2025-01-10",
  "nextDate": "2026-01-10"
}
```

**Respuesta 201:**
```json
{
  "id": "1718000000002",
  "petId": "1",
  "name": "Rabia",
  "date": "2025-01-10",
  "nextDate": "2026-01-10"
}
```

---

## Endpoints de visitas veterinarias

### GET /api/pets/:id/visits

Devuelve el historial de visitas de una mascota.

**Respuesta 200:**
```json
[
  {
    "id": "1",
    "petId": "1",
    "date": "2025-02-20",
    "diagnosis": "Revisión anual",
    "medication": "Antiparasitario",
    "notes": "Todo en orden"
  }
]
```

---

### POST /api/pets/:id/visits

Registra una visita veterinaria.

**Body:**
```json
{
  "date": "2025-02-20",
  "diagnosis": "Revisión anual",
  "medication": "Antiparasitario",
  "notes": "Todo en orden"
}
```

**Respuesta 201:**
```json
{
  "id": "1718000000003",
  "petId": "1",
  "date": "2025-02-20",
  "diagnosis": "Revisión anual",
  "medication": "Antiparasitario",
  "notes": "Todo en orden"
}
```

---

## Endpoints de recordatorios

### GET /api/pets/:id/reminders

Devuelve los recordatorios de una mascota.

**Respuesta 200:**
```json
[
  {
    "id": "1",
    "petId": "1",
    "title": "Vacuna anual",
    "date": "2026-01-10",
    "type": "vaccine"
  }
]
```

---

### POST /api/pets/:id/reminders

Crea un recordatorio.

**Body:**
```json
{
  "title": "Vacuna anual",
  "date": "2026-01-10",
  "type": "vaccine"
}
```

**Respuesta 201:**
```json
{
  "id": "1718000000004",
  "petId": "1",
  "title": "Vacuna anual",
  "date": "2026-01-10",
  "type": "vaccine"
}
```

---

## Health check

### GET /api/health

Comprueba que el servidor está funcionando.

**Respuesta 200:**
```json
{ "status": "ok", "message": "PetLog API funcionando" }
```