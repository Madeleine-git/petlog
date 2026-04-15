import { useState } from 'react'
import { usePets } from '../hooks/usePets'
import PetCard from '../components/pets/PetCard'
import Modal from '../components/shared/Modal'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import Navbar from '../components/shared/Navbar'
import type { CreatePetDto } from '../types/pet.types'

export default function DashboardPage() {
  const { pets, loading, totalPets, createPet } = usePets()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<CreatePetDto>({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    photoUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreate = () => {
    if (!form.name || !form.species) return
    createPet(form)
    setShowModal(false)
    setForm({ name: '', species: '', breed: '', birthDate: '', photoUrl: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Mis mascotas</h2>
            <p className="text-sm text-gray-400">
              {totalPets} mascota{totalPets !== 1 ? 's' : ''} registrada{totalPets !== 1 ? 's' : ''}
            </p>
          </div>
          <Button label="+ Añadir" onClick={() => setShowModal(true)} variant="primary" />
        </div>

        {loading ? (
          <p className="text-center text-gray-400 mt-12">Cargando...</p>
        ) : pets.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">No tienes mascotas registradas.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="Añadir mascota" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Nombre" name="name" value={form.name} onChange={handleChange} />
            <Input label="Especie" name="species" value={form.species} onChange={handleChange} placeholder="Perro, Gato..." />
            <Input label="Raza" name="breed" value={form.breed} onChange={handleChange} />
            <Input label="Fecha de nacimiento" name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
            <Input label="URL de foto" name="photoUrl" value={form.photoUrl || ''} onChange={handleChange} />
            <div className="flex gap-2 justify-end mt-2">
              <Button label="Cancelar" onClick={() => setShowModal(false)} variant="secondary" />
              <Button label="Guardar" onClick={handleCreate} variant="primary" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}