import { useState } from 'react'
import { usePets } from '../hooks/usePets'
import PetCard from '../components/pets/PetCard'
import Modal from '../components/shared/Modal'
import Input from '../components/shared/Input'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
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
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-amber-900">Mis mascotas</h2>
            <p className="text-sm text-amber-700">
              {totalPets} mascota{totalPets !== 1 ? 's' : ''} registrada{totalPets !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors"
          >
            + Añadir
          </button>
        </div>

        {loading ? (
          <p className="text-center text-amber-700 mt-12">Cargando...</p>
        ) : pets.length === 0 ? (
          <p className="text-center text-amber-700 mt-12">No tienes mascotas registradas.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {showModal && (
        <Modal title="Añadir mascota" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Nombre" name="name" value={form.name} onChange={handleChange} />
            <Input label="Especie" name="species" value={form.species} onChange={handleChange} placeholder="Perro, Gato..." />
            <Input label="Raza" name="breed" value={form.breed} onChange={handleChange} />
            <Input label="Fecha de nacimiento" name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
            <Input label="URL de foto" name="photoUrl" value={form.photoUrl || ''} onChange={handleChange} />
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}