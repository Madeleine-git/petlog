import { Router } from 'express'
import { petsController } from '../controllers/pets.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.use(authMiddleware)

router.get('/', petsController.getAll)
router.post('/', petsController.create)
router.get('/:id', petsController.getById)
router.put('/:id', petsController.update)
router.delete('/:id', petsController.delete)

router.get('/:id/vaccines', petsController.getVaccines)
router.post('/:id/vaccines', petsController.addVaccine)

router.get('/:id/visits', petsController.getVisits)
router.post('/:id/visits', petsController.addVisit)

router.get('/:id/reminders', petsController.getReminders)
router.post('/:id/reminders', petsController.addReminder)

export default router