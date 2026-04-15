import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../repositories/memory.repository'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt'

export const authService = {
  async register(name: string, email: string, password: string) {
    const exists = db.users.find(u => u.email === email)
    if (exists) throw new Error('El email ya está registrado')

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    }
    db.users.push(user)

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    return { token, user: { id: user.id, name: user.name, email: user.email } }
  },

  async login(email: string, password: string) {
    const user = db.users.find(u => u.email === email)
    if (!user) throw new Error('Email o contraseña incorrectos')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Email o contraseña incorrectos')

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    return { token, user: { id: user.id, name: user.name, email: user.email } }
  },
}