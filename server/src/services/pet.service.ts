import { db } from '../repositories/memory.repository'
import type { Pet } from '../types'

export const petService = {
  getAll(userId: string): Pet[] {
    return db.pets.filter(p => p.userId === userId)
  },

  getById(id: string, userId: string): Pet {
    const pet = db.pets.find(p => p.id === id && p.userId === userId)
    if (!pet) throw new Error('Mascota no encontrada')
    return pet
  },

  create(userId: string, data: Omit<Pet, 'id' | 'userId'>): Pet {
    const pet: Pet = { id: Date.now().toString(), userId, ...data }
    db.pets.push(pet)
    return pet
  },

  update(id: string, userId: string, data: Partial<Omit<Pet, 'id' | 'userId'>>): Pet {
    const index = db.pets.findIndex(p => p.id === id && p.userId === userId)
    if (index === -1) throw new Error('Mascota no encontrada')
    db.pets[index] = { ...db.pets[index], ...data }
    return db.pets[index]
  },

  delete(id: string, userId: string): void {
    const index = db.pets.findIndex(p => p.id === id && p.userId === userId)
    if (index === -1) throw new Error('Mascota no encontrada')
    db.pets.splice(index, 1)
  },

  getVaccines(petId: string) {
    return db.vaccines.filter(v => v.petId === petId)
  },

  addVaccine(petId: string, data: Omit<import('../types').Vaccine, 'id' | 'petId'>) {
    const vaccine = { id: Date.now().toString(), petId, ...data }
    db.vaccines.push(vaccine)
    return vaccine
  },

  getVisits(petId: string) {
    return db.visits.filter(v => v.petId === petId)
  },

  addVisit(petId: string, data: Omit<import('../types').Visit, 'id' | 'petId'>) {
    const visit = { id: Date.now().toString(), petId, ...data }
    db.visits.push(visit)
    return visit
  },

  getReminders(petId: string) {
    return db.reminders.filter(r => r.petId === petId)
  },

  addReminder(petId: string, data: Omit<import('../types').Reminder, 'id' | 'petId'>) {
    const reminder = { id: Date.now().toString(), petId, ...data }
    db.reminders.push(reminder)
    return reminder
  },
}