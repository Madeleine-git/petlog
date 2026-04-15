import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Pet, CreatePetDto } from '../types/pet.types'

const MOCK_PETS: Pet[] = [
  {
    id: '1',
    userId: '1',
    name: 'Coco',
    species: 'Perro',
    breed: 'Perro de Agua',
    birthDate: '2023-09-14',
    photoUrl: '',
  },
  {
    id: '2',
    userId: '1',
    name: 'Michi',
    species: 'Gato',
    breed: 'Siamés',
    birthDate: '2019-07-22',
    photoUrl: '',
  },
]

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(MOCK_PETS)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const totalPets = useMemo(() => pets.length, [pets])

  const createPet = useCallback((data: CreatePetDto) => {
    const newPet: Pet = {
      id: Date.now().toString(),
      userId: '1',
      ...data,
    }
    setPets((prev) => [...prev, newPet])
  }, [])

  const deletePet = useCallback((id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id))
  }, [])

  return {
    pets,
    loading,
    totalPets,
    createPet,
    deletePet,
  }
}