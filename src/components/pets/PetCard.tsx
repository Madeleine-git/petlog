import { useNavigate } from 'react-router-dom'
import type { Pet } from '../../types/pet.types'
import Card from '../shared/Card'

interface PetCardProps {
  pet: Pet
}

export default function PetCard({ pet }: PetCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="cursor-pointer hover:border-amber-400 hover:shadow-md transition-all duration-200 active:scale-95">
      <div className="flex items-center gap-4" onClick={() => navigate(`/pets/${pet.id}`)}>
        <img
          src={pet.photoUrl || 'https://placehold.co/64x64'}
          alt={pet.name}
          className="w-16 h-16 rounded-full object-cover border border-amber-200 transition-transform duration-200 hover:scale-105"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{pet.name}</h3>
          <p className="text-sm text-gray-500">{pet.species} · {pet.breed}</p>
          <p className="text-xs text-gray-400 mt-1">Nacimiento: {pet.birthDate}</p>
        </div>
      </div>
    </Card>
  )
}