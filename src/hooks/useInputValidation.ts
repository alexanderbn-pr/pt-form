import { useState } from 'react';

export interface AccommodationValues {
  name: string;
  address: string;
  description: string;
}

export interface AccommodationErrors {
  name?: string;
  address?: string;
  description?: string;
}

export function useValidationAccommodation(initialValues: AccommodationValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<AccommodationErrors>({});
  const [touched, setTouched] = useState<{
    [K in keyof AccommodationValues]?: boolean;
  }>({});

  const validate = (
    vals: AccommodationValues = values,
  ): AccommodationErrors => {
    const errs: AccommodationErrors = {};

    if (!vals.name) {
      errs.name = 'Name is required.';
    } else if (vals.name.length < 4 || vals.name.length > 128) {
      errs.name = 'Name must be between 4 and 128 characters.';
    } else if (/\d/.test(vals.name)) {
      errs.name = 'Name cannot contain numbers.';
    }

    if (!vals.address) {
      errs.address = 'Address is required.';
    } else if (vals.address.length < 4 || vals.address.length > 128) {
      errs.address = 'Address must be between 4 and 128 characters.';
    }

    if (vals.description) {
      if (vals.description.length < 128 || vals.description.length > 2048) {
        errs.description =
          'Description must be between 128 and 2048 characters.';
      }
    }

    return errs;
  };

  const handleChange = (field: keyof AccommodationValues, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    setErrors(validate(newValues));
  };

  const handleBlur = (field: keyof AccommodationValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const isValid = Object.keys(validate(values)).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    setValues,
  };
}
