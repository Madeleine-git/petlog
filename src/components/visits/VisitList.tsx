import type { Visit } from '../../types/pet.types'
import Card from '../shared/Card'

interface VisitListProps {
  visits: Visit[]
}

export default function VisitList({ visits }: VisitListProps) {
  if (visits.length === 0) {
    return <p className="text-sm text-gray-400">No hay visitas registradas.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {visits.map((visit) => (
        <Card key={visit.id}>
          <p className="text-xs text-gray-400 mb-1">{visit.date}</p>
          <p className="font-medium text-gray-800 text-sm">{visit.diagnosis}</p>
          {visit.medication && (
            <p className="text-xs text-gray-500 mt-1">Medicación: {visit.medication}</p>
          )}
          {visit.notes && (
            <p className="text-xs text-gray-400 mt-1 italic">{visit.notes}</p>
          )}
        </Card>
      ))}
    </div>
  )
}