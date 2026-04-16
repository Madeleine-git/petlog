import { useParams, useNavigate } from 'react-router-dom'
import { usePetDetail } from '../hooks/usePetDetail'
import { usePets } from '../hooks/usePets'
import Navbar from '../components/shared/Navbar'
import VaccineList from '../components/vaccines/VaccineList'
import VisitList from '../components/visits/VisitList'
import ReminderList from '../components/reminders/ReminderList'
import Footer from '../components/shared/Footer'
import Modal from '../components/shared/Modal'
import Input from '../components/shared/Input'
import { useState } from 'react'
import type { CreateVaccineDto, CreateVisitDto, CreateReminderDto, CreatePetDto } from '../types/pet.types'

type Tab = 'vacunas' | 'visitas' | 'recordatorios'

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { pets, updatePet } = usePets()
  const { vaccines, visits, reminders, loading, addVaccine, addVisit, addReminder } = usePetDetail(id ?? '')
  const [activeTab, setActiveTab] = useState<Tab>('vacunas')
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [vaccineForm, setVaccineForm] = useState<CreateVaccineDto>({ name: '', date: '', nextDate: '' })
  const [visitForm, setVisitForm] = useState<CreateVisitDto>({ date: '', diagnosis: '', medication: '', notes: '' })
  const [reminderForm, setReminderForm] = useState<CreateReminderDto>({ title: '', date: '', type: 'appointment' })

  const pet = pets.find((p) => p.id === id)

  const [editForm, setEditForm] = useState<CreatePetDto>({
    name: pet?.name || '',
    species: pet?.species || '',
    breed: pet?.breed || '',
    birthDate: pet?.birthDate || '',
    photoUrl: pet?.photoUrl || '',
  })

  const handleAddVaccine = async () => {
    if (!vaccineForm.name || !vaccineForm.date) return
    await addVaccine(vaccineForm)
    setShowModal(false)
    setVaccineForm({ name: '', date: '', nextDate: '' })
  }

  const handleAddVisit = async () => {
    if (!visitForm.date || !visitForm.diagnosis) return
    await addVisit(visitForm)
    setShowModal(false)
    setVisitForm({ date: '', diagnosis: '', medication: '', notes: '' })
  }

  const handleAddReminder = async () => {
    if (!reminderForm.title || !reminderForm.date) return
    await addReminder(reminderForm)
    setShowModal(false)
    setReminderForm({ title: '', date: '', type: 'appointment' })
  }

  const handleEditPet = async () => {
    if (!editForm.name || !editForm.species) return
    await updatePet(id ?? '', editForm)
    setShowEditModal(false)
  }

  const openEditModal = () => {
    setEditForm({
      name: pet?.name || '',
      species: pet?.species || '',
      breed: pet?.breed || '',
      birthDate: pet?.birthDate || '',
      photoUrl: pet?.photoUrl || '',
    })
    setShowEditModal(true)
  }

  if (!pet && !loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-amber-700">Mascota no encontrada.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors"
          >
            Volver
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const tabs: Tab[] = ['vacunas', 'visitas', 'recordatorios']

  const tabLabel: Record<Tab, string> = {
    vacunas: 'Añadir vacuna',
    visitas: 'Añadir visita',
    recordatorios: 'Añadir recordatorio',
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-amber-700 hover:underline mb-4 block"
        >
          ← Volver al dashboard
        </button>

        {pet && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={pet.photoUrl || 'https://placehold.co/80x80'}
                alt={pet.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-200"
              />
              <div>
                <h2 className="text-xl font-semibold text-amber-900">{pet.name}</h2>
                <p className="text-sm text-amber-700">{pet.species} · {pet.breed}</p>
                <p className="text-xs text-amber-600 mt-1">Nacimiento: {pet.birthDate}</p>
              </div>
            </div>
            <button
              onClick={openEditModal}
              className="px-3 py-1.5 rounded-lg text-sm border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
            >
              Editar perfil
            </button>
          </div>
        )}

        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${activeTab === tab
                  ? 'bg-amber-700 text-white'
                  : 'bg-white border border-amber-200 text-amber-700 hover:border-amber-400'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-amber-700 text-white hover:bg-amber-800 transition-colors"
          >
            + {tabLabel[activeTab]}
          </button>
        </div>

        {loading ? (
          <p className="text-center text-amber-700">Cargando...</p>
        ) : (
          <>
            {activeTab === 'vacunas' && <VaccineList vaccines={vaccines} />}
            {activeTab === 'visitas' && <VisitList visits={visits} />}
            {activeTab === 'recordatorios' && <ReminderList reminders={reminders} />}
          </>
        )}
      </div>

      <Footer />

      {showEditModal && (
        <Modal title="Editar perfil de mascota" onClose={() => setShowEditModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Nombre" name="name" value={editForm.name} onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Especie" name="species" value={editForm.species} onChange={(e) => setEditForm(p => ({ ...p, species: e.target.value }))} placeholder="Perro, Gato..." />
            <Input label="Raza" name="breed" value={editForm.breed} onChange={(e) => setEditForm(p => ({ ...p, breed: e.target.value }))} />
            <Input label="Fecha de nacimiento" name="birthDate" type="date" value={editForm.birthDate} onChange={(e) => setEditForm(p => ({ ...p, birthDate: e.target.value }))} />
            <Input label="URL de foto" name="photoUrl" value={editForm.photoUrl || ''} onChange={(e) => setEditForm(p => ({ ...p, photoUrl: e.target.value }))} />
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
              <button onClick={handleEditPet} className="px-4 py-2 rounded-lg text-sm bg-amber-700 text-white hover:bg-amber-800">Guardar</button>
            </div>
          </div>
        </Modal>
      )}

      {showModal && activeTab === 'vacunas' && (
        <Modal title="Añadir vacuna" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Nombre de la vacuna" name="name" value={vaccineForm.name} onChange={(e) => setVaccineForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Fecha administrada" name="date" type="date" value={vaccineForm.date} onChange={(e) => setVaccineForm(p => ({ ...p, date: e.target.value }))} />
            <Input label="Próxima dosis" name="nextDate" type="date" value={vaccineForm.nextDate || ''} onChange={(e) => setVaccineForm(p => ({ ...p, nextDate: e.target.value }))} />
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
              <button onClick={handleAddVaccine} className="px-4 py-2 rounded-lg text-sm bg-amber-700 text-white hover:bg-amber-800">Guardar</button>
            </div>
          </div>
        </Modal>
      )}

      {showModal && activeTab === 'visitas' && (
        <Modal title="Añadir visita" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Fecha" name="date" type="date" value={visitForm.date} onChange={(e) => setVisitForm(p => ({ ...p, date: e.target.value }))} />
            <Input label="Diagnóstico" name="diagnosis" value={visitForm.diagnosis} onChange={(e) => setVisitForm(p => ({ ...p, diagnosis: e.target.value }))} />
            <Input label="Medicación" name="medication" value={visitForm.medication || ''} onChange={(e) => setVisitForm(p => ({ ...p, medication: e.target.value }))} />
            <Input label="Notas" name="notes" value={visitForm.notes || ''} onChange={(e) => setVisitForm(p => ({ ...p, notes: e.target.value }))} />
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
              <button onClick={handleAddVisit} className="px-4 py-2 rounded-lg text-sm bg-amber-700 text-white hover:bg-amber-800">Guardar</button>
            </div>
          </div>
        </Modal>
      )}

      {showModal && activeTab === 'recordatorios' && (
        <Modal title="Añadir recordatorio" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-4">
            <Input label="Título" name="title" value={reminderForm.title} onChange={(e) => setReminderForm(p => ({ ...p, title: e.target.value }))} />
            <Input label="Fecha" name="date" type="date" value={reminderForm.date} onChange={(e) => setReminderForm(p => ({ ...p, date: e.target.value }))} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={reminderForm.type}
                onChange={(e) => setReminderForm(p => ({ ...p, type: e.target.value as CreateReminderDto['type'] }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="appointment">Cita veterinaria</option>
                <option value="medication">Medicación</option>
                <option value="vaccine">Vacuna</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
              <button onClick={handleAddReminder} className="px-4 py-2 rounded-lg text-sm bg-amber-700 text-white hover:bg-amber-800">Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}