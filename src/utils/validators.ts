export interface ValidationErrors {
  [key: string]: string
}

export function validateLogin(email: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!email) {
    errors.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El email no es válido'
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  return errors
}

export function validateRegister(name: string, email: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!name) {
    errors.name = 'El nombre es obligatorio'
  } else if (name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  const loginErrors = validateLogin(email, password)
  return { ...errors, ...loginErrors }
}

export function validatePet(name: string, species: string): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!name) {
    errors.name = 'El nombre es obligatorio'
  } else if (name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!species) {
    errors.species = 'La especie es obligatoria'
  }

  return errors
}