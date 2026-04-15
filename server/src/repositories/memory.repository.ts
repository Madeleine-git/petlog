import { User, Pet, Vaccine, Visit, Reminder } from '../types'

export const db: {
  users: User[]
  pets: Pet[]
  vaccines: Vaccine[]
  visits: Visit[]
  reminders: Reminder[]
} = {
  users: [],
  pets: [],
  vaccines: [],
  visits: [],
  reminders: [],
}