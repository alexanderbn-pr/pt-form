import {
  AccommodationTypeOption,
  AccommodationValues,
  OwnerValues,
} from './types';

export const MAX_PHOTOS = 2;
export const MAX_IMAGE_PX = 500;
export const ACCEPTED_IMAGE_TYPES = 'image/*';

export const TYPE_OPTIONS: AccommodationTypeOption = [
  { value: 'Apartment', label: 'Apartamento' },
  { value: 'Villa', label: 'Villa' },
  { value: 'House', label: 'Casa' },
];

export const INITIAL_ACCOMMODATION: AccommodationValues = {
  name: '',
  address: '',
  description: '',
  type: '',
};

export const INITIAL_OWNER: OwnerValues = {
  name: '',
  email: '',
  phone: '',
};
