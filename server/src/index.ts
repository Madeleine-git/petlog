import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import authRoutes from './routes/auth.routes'
import petsRoutes from './routes/pets.routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/
  ]
}))
app.use(express.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/auth', authRoutes)
app.use('/api/pets', petsRoutes)

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'PetLog API',
    version: '1.0.0',
    status: 'running',
    docs: '/api/docs'
  })
})

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'PetLog API funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Documentación Swagger: http://localhost:${PORT}/api/docs`)
})