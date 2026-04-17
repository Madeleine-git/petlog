import { useState } from 'react'
import { usePets } from '../hooks/usePets'
import Modal from '../components/shared/Modal'
import Input from '../components/shared/Input'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import type { CreatePetDto, Pet } from '../types/pet.types'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useNavigate } from 'react-router-dom'

interface SortablePetCardProps {
  pet: Pet
}

function SortablePetCard({ pet }: SortablePetCardProps) {
  const navigate = useNavigate()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: pet.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4 cursor-grab active:cursor-grabbing"
    >
      <div {...attributes} {...listeners} className="text-amber-300 text-xl select-none">
        ⠿
      </div>
      <div
        className="flex items-center gap-4 flex-1 cursor-pointer"
        onClick={() => navigate(`/pets/${pet.id}`)}
      >
        <img
          src={pet.photoUrl || 'https://placehold.co/64x64'}
          alt={pet.name}
          className="w-16 h-16 rounded-full object-cover border border-amber-200"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{pet.name}</h3>
          <p className="text-sm text-gray-500">{pet.species} · {pet.breed}</p>
          <p className="text-xs text-gray-400 mt-1">Nacimiento: {pet.birthDate}</p>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { pets: fetchedPets, loading, totalPets, createPet } = usePets()
  const [pets, setPets] = useState<Pet[]>([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<CreatePetDto>({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    photoUrl: '',
  })

  const sensors = useSensors(useSensor(PointerSensor))

  if (fetchedPets.length > 0 && pets.length === 0) {
    setPets(fetchedPets)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = pets.findIndex(p => p.id === active.id)
      const newIndex = pets.findIndex(p => p.id === over.id)
      setPets(arrayMove(pets, oldIndex, newIndex))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreate = async () => {
    if (!form.name || !form.species) return
    await createPet(form)
    setPets(prev => [...prev, { id: Date.now().toString(), userId: '1', ...form }])
    setShowModal(false)
    setForm({ name: '', species: '', breed: '', birthDate: '', photoUrl: '' })
  }

  const displayPets = pets.length > 0 ? pets : fetchedPets

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
        ) : displayPets.length === 0 ? (
          <p className="text-center text-amber-700 mt-12">No tienes mascotas registradas.</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={displayPets.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-4">
                {displayPets.map((pet) => (
                  <SortablePetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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