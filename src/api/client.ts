import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

let authToken: string | null = null

export function setToken(token: string | null) {
  authToken = token
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message = error.response?.data?.error || 'Error de conexión con el servidor'
    return Promise.reject(new Error(message))
  }
)

export default apiClient