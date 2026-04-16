import apiClient from './client'
import type { User } from '../types/pet.types'

export interface AuthResponse {
  token: string
  user: User
}

export const authApi = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    })
    return response.data
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    return response.data
  },
}