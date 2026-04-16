import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Pet, CreatePetDto } from '../types/pet.types'
import { petsApi } from '../api/pets.api'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await petsApi.getAll()
        setPets(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [])

  const totalPets = useMemo(() => pets.length, [pets])

  const createPet = useCallback(async (data: CreatePetDto) => {
    try {
      const newPet = await petsApi.create(data)
      setPets((prev) => [...prev, newPet])
    } catch (err) {
      setError((err as Error).message)
    }
  }, [])

  const deletePet = useCallback(async (id: string) => {
    try {
      await petsApi.remove(id)
      setPets((prev) => prev.filter((pet) => pet.id !== id))
    } catch (err) {
      setError((err as Error).message)
    }
  }, [])

  return {
    pets,
    loading,
    error,
    totalPets,
    createPet,
    deletePet,
  }
}