import { OwnerValues, OwnerErrors } from '../types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateOwner(values: OwnerValues): OwnerErrors {
  const errors: OwnerErrors = {};

  const name = values.name?.trim() ?? '';
  const email = values.email?.trim() ?? '';
  const phone = values.phone?.trim() ?? '';

  if (name.length === 0) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (email.length === 0) {
    errors.email = 'El email es obligatorio.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'El email debe tener un formato válido.';
  }

  if (phone.length > 0) {
    if (!/^\d+$/.test(phone)) {
      errors.phone = 'El teléfono solo puede contener números.';
    } else if (phone.length > 9) {
      errors.phone = 'El teléfono debe tener como máximo 9 dígitos.';
    }
  }

  return errors;
} 