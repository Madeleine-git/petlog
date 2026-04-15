import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Vaccine, Visit, Reminder } from '../types/pet.types'

const MOCK_VACCINES: Vaccine[] = [
  { id: '1', petId: '1', name: 'Rabia', date: '2025-01-10', nextDate: '2026-01-10' },
  { id: '2', petId: '1', name: 'Moquillo', date: '2025-03-15', nextDate: '2026-03-15' },
]

const MOCK_VISITS: Visit[] = [
  { id: '1', petId: '1', date: '2025-02-20', diagnosis: 'Revisión anual', medication: 'Antiparasitario', notes: 'Todo en orden' },
]

const MOCK_REMINDERS: Reminder[] = [
  { id: '1', petId: '1', title: 'Vacuna anual', date: '2026-01-10', type: 'vaccine' },
  { id: '2', petId: '1', title: 'Revisión veterinario', date: '2025-06-20', type: 'appointment' },
]

export function usePetDetail(petId: string) {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVaccines(MOCK_VACCINES.filter(v => v.petId === petId))
      setVisits(MOCK_VISITS.filter(v => v.petId === petId))
      setReminders(MOCK_REMINDERS.filter(r => r.petId === petId))
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [petId])

  const pendingReminders = useMemo(
    () => reminders.filter(r => new Date(r.date) > new Date()),
    [reminders]
  )

  const addVaccine = useCallback((vaccine: Vaccine) => {
    setVaccines(prev => [...prev, vaccine])
  }, [])

  const addVisit = useCallback((visit: Visit) => {
    setVisits(prev => [...prev, visit])
  }, [])

  const addReminder = useCallback((reminder: Reminder) => {
    setReminders(prev => [...prev, reminder])
  }, [])

  return {
    vaccines,
    visits,
    reminders,
    pendingReminders,
    loading,
    addVaccine,
    addVisit,
    addReminder,
  }
}