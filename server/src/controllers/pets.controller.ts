import { Response } from 'express'
import { petService } from '../services/pet.service'
import { AuthRequest } from '../middleware/auth.middleware'

export const petsController = {
  getAll(req: AuthRequest, res: Response) {
    try {
      const pets = petService.getAll(req.userId!)
      res.status(200).json(pets)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  },

  getById(req: AuthRequest, res: Response) {
    try {
      const pet = petService.getById(String(req.params.id), req.userId!)
      res.status(200).json(pet)
    } catch (error) {
      res.status(404).json({ error: (error as Error).message })
    }
  },

  create(req: AuthRequest, res: Response) {
    try {
      const pet = petService.create(req.userId!, req.body)
      res.status(201).json(pet)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },

  update(req: AuthRequest, res: Response) {
    try {
      const pet = petService.update(String(req.params.id), req.userId!, req.body)
      res.status(200).json(pet)
    } catch (error) {
      res.status(404).json({ error: (error as Error).message })
    }
  },

  delete(req: AuthRequest, res: Response) {
    try {
      petService.delete(String(req.params.id), req.userId!)
      res.status(200).json({ ok: true })
    } catch (error) {
      res.status(404).json({ error: (error as Error).message })
    }
  },

  getVaccines(req: AuthRequest, res: Response) {
    try {
      const vaccines = petService.getVaccines(String(req.params.id))
      res.status(200).json(vaccines)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  },

  addVaccine(req: AuthRequest, res: Response) {
    try {
      const vaccine = petService.addVaccine(String(req.params.id), req.body)
      res.status(201).json(vaccine)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },

  getVisits(req: AuthRequest, res: Response) {
    try {
      const visits = petService.getVisits(String(req.params.id))
      res.status(200).json(visits)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  },

  addVisit(req: AuthRequest, res: Response) {
    try {
      const visit = petService.addVisit(String(req.params.id), req.body)
      res.status(201).json(visit)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },

  getReminders(req: AuthRequest, res: Response) {
    try {
      const reminders = petService.getReminders(String(req.params.id))
      res.status(200).json(reminders)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  },

  addReminder(req: AuthRequest, res: Response) {
    try {
      const reminder = petService.addReminder(String(req.params.id), req.body)
      res.status(201).json(reminder)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  },
}