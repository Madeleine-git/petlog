import { Request, Response } from 'express'
import { authService } from '../services/auth.service'

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
        res.status(400).json({ error: 'Todos los campos son obligatorios' })
        return
      }
      const result = await authService.register(name, email, password)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña son obligatorios' })
        return
      }
      const result = await authService.login(email, password)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
}