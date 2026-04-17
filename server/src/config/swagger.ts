import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PetLog API',
      version: '1.0.0',
      description: 'API REST para el diario digital de mascotas PetLog. Permite gestionar mascotas, vacunas, visitas veterinarias y recordatorios.',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor local',
      },
      {
        url: 'https://petlog-api-173h.onrender.com/api',
        description: 'Servidor de producción',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Pet: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            name: { type: 'string' },
            species: { type: 'string' },
            breed: { type: 'string' },
            birthDate: { type: 'string' },
            photoUrl: { type: 'string' },
          },
        },
        Vaccine: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            petId: { type: 'string' },
            name: { type: 'string' },
            date: { type: 'string' },
            nextDate: { type: 'string' },
          },
        },
        Visit: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            petId: { type: 'string' },
            date: { type: 'string' },
            diagnosis: { type: 'string' },
            medication: { type: 'string' },
            notes: { type: 'string' },
          },
        },
        Reminder: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            petId: { type: 'string' },
            title: { type: 'string' },
            date: { type: 'string' },
            type: { type: 'string', enum: ['appointment', 'medication', 'vaccine'] },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/auth/register': {
        post: {
          tags: ['Autenticación'],
          summary: 'Registrar nuevo usuario',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string', example: 'María' },
                    email: { type: 'string', example: 'maria@email.com' },
                    password: { type: 'string', example: '123456' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Usuario registrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            400: { description: 'Email ya registrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Autenticación'],
          summary: 'Iniciar sesión',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'madeleine@email.com' },
                    password: { type: 'string', example: '123456' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login exitoso', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            400: { description: 'Credenciales incorrectas', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/pets': {
        get: {
          tags: ['Mascotas'],
          summary: 'Listar mascotas del usuario',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de mascotas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } } } } },
            401: { description: 'Token no proporcionado' },
          },
        },
        post: {
          tags: ['Mascotas'],
          summary: 'Crear nueva mascota',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'species'],
                  properties: {
                    name: { type: 'string', example: 'Coco' },
                    species: { type: 'string', example: 'Perro' },
                    breed: { type: 'string', example: 'Perro de Agua' },
                    birthDate: { type: 'string', example: '2023-09-14' },
                    photoUrl: { type: 'string', example: '' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Mascota creada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } } },
            401: { description: 'Token no proporcionado' },
          },
        },
      },
      '/pets/{id}': {
        get: {
          tags: ['Mascotas'],
          summary: 'Obtener mascota por ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Mascota encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } } },
            404: { description: 'Mascota no encontrada' },
          },
        },
        put: {
          tags: ['Mascotas'],
          summary: 'Actualizar mascota',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Pet' },
              },
            },
          },
          responses: {
            200: { description: 'Mascota actualizada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } } },
            404: { description: 'Mascota no encontrada' },
          },
        },
        delete: {
          tags: ['Mascotas'],
          summary: 'Eliminar mascota',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Mascota eliminada' },
            404: { description: 'Mascota no encontrada' },
          },
        },
      },
      '/pets/{id}/vaccines': {
        get: {
          tags: ['Vacunas'],
          summary: 'Historial de vacunas',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Lista de vacunas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Vaccine' } } } } },
          },
        },
        post: {
          tags: ['Vacunas'],
          summary: 'Añadir vacuna',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'date'],
                  properties: {
                    name: { type: 'string', example: 'Rabia' },
                    date: { type: 'string', example: '2025-01-10' },
                    nextDate: { type: 'string', example: '2026-01-10' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Vacuna añadida', content: { 'application/json': { schema: { $ref: '#/components/schemas/Vaccine' } } } },
          },
        },
      },
      '/pets/{id}/visits': {
        get: {
          tags: ['Visitas'],
          summary: 'Historial de visitas veterinarias',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Lista de visitas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Visit' } } } } },
          },
        },
        post: {
          tags: ['Visitas'],
          summary: 'Registrar visita veterinaria',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['date', 'diagnosis'],
                  properties: {
                    date: { type: 'string', example: '2025-02-20' },
                    diagnosis: { type: 'string', example: 'Revisión anual' },
                    medication: { type: 'string', example: 'Antiparasitario' },
                    notes: { type: 'string', example: 'Todo en orden' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Visita registrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Visit' } } } },
          },
        },
      },
      '/pets/{id}/reminders': {
        get: {
          tags: ['Recordatorios'],
          summary: 'Listar recordatorios',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Lista de recordatorios', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Reminder' } } } } },
          },
        },
        post: {
          tags: ['Recordatorios'],
          summary: 'Crear recordatorio',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'date', 'type'],
                  properties: {
                    title: { type: 'string', example: 'Vacuna anual' },
                    date: { type: 'string', example: '2026-01-10' },
                    type: { type: 'string', enum: ['appointment', 'medication', 'vaccine'] },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Recordatorio creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Reminder' } } } },
          },
        },
      },
    },
  },
  apis: [],
}

export const swaggerSpec = swaggerJsdoc(options)