import apiClient from './client'
import type { Pet, Vaccine, Visit, Reminder, CreatePetDto, CreateVaccineDto, CreateVisitDto, CreateReminderDto } from '../types/pet.types'

export const petsApi = {
  async getAll(): Promise<Pet[]> {
    const response = await apiClient.get<Pet[]>('/pets')
    return response.data
  },

  async getById(id: string): Promise<Pet> {
    const response = await apiClient.get<Pet>(`/pets/${id}`)
    return response.data
  },

  async create(data: CreatePetDto): Promise<Pet> {
    const response = await apiClient.post<Pet>('/pets', data)
    return response.data
  },

  async update(id: string, data: Partial<CreatePetDto>): Promise<Pet> {
    const response = await apiClient.put<Pet>(`/pets/${id}`, data)
    return response.data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/pets/${id}`)
  },

  async getVaccines(petId: string): Promise<Vaccine[]> {
    const response = await apiClient.get<Vaccine[]>(`/pets/${petId}/vaccines`)
    return response.data
  },

  async addVaccine(petId: string, data: CreateVaccineDto): Promise<Vaccine> {
    const response = await apiClient.post<Vaccine>(`/pets/${petId}/vaccines`, data)
    return response.data
  },

  async getVisits(petId: string): Promise<Visit[]> {
    const response = await apiClient.get<Visit[]>(`/pets/${petId}/visits`)
    return response.data
  },

  async addVisit(petId: string, data: CreateVisitDto): Promise<Visit> {
    const response = await apiClient.post<Visit>(`/pets/${petId}/visits`, data)
    return response.data
  },

  async getReminders(petId: string): Promise<Reminder[]> {
    const response = await apiClient.get<Reminder[]>(`/pets/${petId}/reminders`)
    return response.data
  },

  async addReminder(petId: string, data: CreateReminderDto): Promise<Reminder> {
    const response = await apiClient.post<Reminder>(`/pets/${petId}/reminders`, data)
    return response.data
  },
}