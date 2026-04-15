export interface User {
  id: string
  name: string
  email: string
}

export interface Pet {
  id: string
  userId: string
  name: string
  species: string
  breed: string
  birthDate: string
  photoUrl?: string
}

export interface Vaccine {
  id: string
  petId: string
  name: string
  date: string
  nextDate?: string
}

export interface Visit {
  id: string
  petId: string
  date: string
  diagnosis: string
  medication?: string
  notes?: string
}

export interface Reminder {
  id: string
  petId: string
  title: string
  date: string
  type: 'appointment' | 'medication' | 'vaccine'
}

export interface CreatePetDto {
  name: string
  species: string
  breed: string
  birthDate: string
  photoUrl?: string
}

export interface CreateVaccineDto {
  name: string
  date: string
  nextDate?: string
}

export interface CreateVisitDto {
  date: string
  diagnosis: string
  medication?: string
  notes?: string
}

export interface CreateReminderDto {
  title: string
  date: string
  type: 'appointment' | 'medication' | 'vaccine'
}