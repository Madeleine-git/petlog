import { useParams, useNavigate } from 'react-router-dom'
import { usePetDetail } from '../hooks/usePetDetail'
import { usePets } from '../hooks/usePets'
import Navbar from '../components/shared/Navbar'
import Button from '../components/shared/Button'
import VaccineList from '../components/vaccines/VaccineList'
import VisitList from '../components/visits/VisitList'
import ReminderList from '../components/reminders/ReminderList'
import { useState } from 'react'

type Tab = 'vacunas' | 'visitas' | 'recordatorios'

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { pets } = usePets()
  const { vaccines, visits, reminders, loading } = usePetDetail(id ?? '')
  const [activeTab, setActiveTab] = useState<Tab>('vacunas')

  const pet = pets.find((p) => p.id === id)

  if (!pet && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-24 gap-4">
          <p className="text-gray-400">Mascota no encontrada.</p>
          <Button label="Volver" onClick={() => navigate('/dashboard')} variant="secondary" />
        </div>
      </div>
    )
  }

  const tabs: Tab[] = ['vacunas', 'visitas', 'recordatorios']

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">

        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-teal-600 hover:underline mb-4 block"
        >
          ← Volver al dashboard
        </button>

        {pet && (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={pet.photoUrl || 'https://placehold.co/80x80'}
              alt={pet.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{pet.name}</h2>
              <p className="text-sm text-gray-500">{pet.species} · {pet.breed}</p>
              <p className="text-xs text-gray-400 mt-1">Nacimiento: {pet.birthDate}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${activeTab === tab
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-400'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Cargando...</p>
        ) : (
          <>
            {activeTab === 'vacunas' && <VaccineList vaccines={vaccines} />}
            {activeTab === 'visitas' && <VisitList visits={visits} />}
            {activeTab === 'recordatorios' && <ReminderList reminders={reminders} />}
          </>
        )}
      </div>
    </div>
  )
}