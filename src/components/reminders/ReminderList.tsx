import type { Reminder } from '../../types/pet.types'
import Card from '../shared/Card'

interface ReminderListProps {
  reminders: Reminder[]
}

const typeLabel: Record<Reminder['type'], string> = {
  appointment: 'Cita',
  medication: 'Medicación',
  vaccine: 'Vacuna',
}

export default function ReminderList({ reminders }: ReminderListProps) {
  if (reminders.length === 0) {
    return <p className="text-sm text-gray-400">No hay recordatorios.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {reminders.map((reminder) => (
        <Card key={reminder.id}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800 text-sm">{reminder.title}</p>
              <p className="text-xs text-gray-400 mt-1">{reminder.date}</p>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
              {typeLabel[reminder.type]}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}