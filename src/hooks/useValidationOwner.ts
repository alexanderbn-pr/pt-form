import { useState } from 'react';

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

export function useValidationOwner(initialValues: OwnerValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<OwnerErrors>({});
  const [touched, setTouched] = useState<{
    [K in keyof OwnerValues]?: boolean;
  }>({});

  function validateEmail(email: string): boolean {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  }
  const validate = (vals: OwnerValues = values): OwnerErrors => {
    const errs: OwnerErrors = {};

    if (!vals.name) {
      errs.name = 'Name is required.';
    } else if (vals.name.length < 4 || vals.name.length > 64) {
      errs.name = 'Name must be between 4 and 64 characters.';
    }

    if (!vals.email) {
      errs.email = 'Address is required.';
    } else if (!validateEmail(vals.email)) {
      errs.email = 'El correo debe tener un formato válido.';
    }

    if (vals.phone) {
      const onlyDigits = /^\d+$/;
      if (!onlyDigits.test(vals.phone)) {
        errs.phone = 'Phone number must contain numbers only.';
      } else if (vals.phone.length > 9) {
        errs.phone = 'Phone number must be up to 9 digits.';
      }
    }

    return errs;
  };

  const handleChange = (field: keyof OwnerValues, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    setErrors(validate(newValues));
  };

  const handleBlur = (field: keyof OwnerValues) => {
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
