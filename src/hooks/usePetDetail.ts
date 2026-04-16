import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Vaccine, Visit, Reminder, CreateVaccineDto, CreateVisitDto, CreateReminderDto } from '../types/pet.types'
import { petsApi } from '../api/pets.api'

export function usePetDetail(petId: string) {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vaccinesData, visitsData, remindersData] = await Promise.all([
          petsApi.getVaccines(petId),
          petsApi.getVisits(petId),
          petsApi.getReminders(petId),
        ])
        setVaccines(vaccinesData)
        setVisits(visitsData)
        setReminders(remindersData)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [petId])

  const pendingReminders = useMemo(
    () => reminders.filter(r => new Date(r.date) > new Date()),
    [reminders]
  )

  const addVaccine = useCallback(async (data: CreateVaccineDto) => {
    try {
      const vaccine = await petsApi.addVaccine(petId, data)
      setVaccines(prev => [...prev, vaccine])
    } catch (err) {
      setError((err as Error).message)
    }
  }, [petId])

  const addVisit = useCallback(async (data: CreateVisitDto) => {
    try {
      const visit = await petsApi.addVisit(petId, data)
      setVisits(prev => [...prev, visit])
    } catch (err) {
      setError((err as Error).message)
    }
  }, [petId])

  const addReminder = useCallback(async (data: CreateReminderDto) => {
    try {
      const reminder = await petsApi.addReminder(petId, data)
      setReminders(prev => [...prev, reminder])
    } catch (err) {
      setError((err as Error).message)
    }
  }, [petId])

  return {
    vaccines,
    visits,
    reminders,
    pendingReminders,
    loading,
    error,
    addVaccine,
    addVisit,
    addReminder,
  }
}