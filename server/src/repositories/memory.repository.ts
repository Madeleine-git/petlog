import bcrypt from 'bcryptjs'
import type { User, Pet, Vaccine, Visit, Reminder } from '../types'

const hashedPassword = bcrypt.hashSync('test123', 12)

export const db: {
  users: User[]
  pets: Pet[]
  vaccines: Vaccine[]
  visits: Visit[]
  reminders: Reminder[]
} = {
  users: [
    {
      id: 'test-user-1',
      name: 'Test User',
      email: 'test@petlog.com',
      password: hashedPassword,
    }
  ],
  pets: [
    {
      id: 'pet-1',
      userId: 'test-user-1',
      name: 'Coco',
      species: 'Perro',
      breed: 'Perro de Agua Español',
      birthDate: '2023-09-14',
      photoUrl: '',
    },
    {
      id: 'pet-2',
      userId: 'test-user-1',
      name: 'Michi',
      species: 'Gato',
      breed: 'Siamés',
      birthDate: '2019-07-22',
      photoUrl: '',
    }
  ],
  vaccines: [
    {
      id: 'vac-1',
      petId: 'pet-1',
      name: 'Rabia',
      date: '2025-01-10',
      nextDate: '2026-01-10',
    },
    {
      id: 'vac-2',
      petId: 'pet-1',
      name: 'Moquillo',
      date: '2025-03-15',
      nextDate: '2026-03-15',
    }
  ],
  visits: [
    {
      id: 'visit-1',
      petId: 'pet-1',
      date: '2025-02-20',
      diagnosis: 'Revisión anual',
      medication: 'Antiparasitario',
      notes: 'Todo en orden',
    }
  ],
  reminders: [
    {
      id: 'rem-1',
      petId: 'pet-1',
      title: 'Vacuna anual',
      date: '2026-01-10',
      type: 'vaccine',
    },
    {
      id: 'rem-2',
      petId: 'pet-2',
      title: 'Revisión veterinario',
      date: '2026-06-20',
      type: 'appointment',
    }
  ],
}