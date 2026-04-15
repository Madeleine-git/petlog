import type { Vaccine } from '../../types/pet.types'
import Card from '../shared/Card'

interface VaccineListProps {
  vaccines: Vaccine[]
}

export default function VaccineList({ vaccines }: VaccineListProps) {
  if (vaccines.length === 0) {
    return <p className="text-sm text-gray-400">No hay vacunas registradas.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {vaccines.map((vaccine) => {
        const isUpToDate = vaccine.nextDate
          ? new Date(vaccine.nextDate) > new Date()
          : true

        return (
          <Card key={vaccine.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800 text-sm">{vaccine.name}</p>
                <p className="text-xs text-gray-400">Administrada: {vaccine.date}</p>
                {vaccine.nextDate && (
                  <p className="text-xs text-gray-400">Próxima dosis: {vaccine.nextDate}</p>
                )}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isUpToDate
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-600'
              }`}>
                {isUpToDate ? 'Al día' : 'Pendiente'}
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}