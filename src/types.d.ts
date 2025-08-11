export interface Photo {
  id: number;
  url: string;
}

export type AccommodationTypeOption = {
  value: string;
  label: string;
}[];

export interface AccommodationValues {
  name: string;
  address: string;
  description: string;
  type: string;
}

export interface AccommodationErrors {
  name?: string;
  address?: string;
  description?: string;
  type?: string;
}

export interface OwnerValues {
  name: string;
  email: string;
  phone: string;
}

export interface OwnerErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export interface TypeOption {
  value: string;
  label: string;
}
