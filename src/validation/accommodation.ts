import { AccommodationValues, AccommodationErrors } from '../types';

export function validateAccommodation(
  values: AccommodationValues,
  type: string,
): AccommodationErrors {
  const errors: AccommodationErrors = {};

  const name = values.name?.trim() ?? '';
  const address = values.address?.trim() ?? '';
  const typeValue = (type ?? values.type ?? '').trim();

  if (name.length === 0) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (address.length === 0) {
    errors.address = 'La dirección es obligatoria.';
  }

  if (typeValue.length === 0) {
    errors.type = 'El tipo es obligatorio.';
  }

  return errors;
}
