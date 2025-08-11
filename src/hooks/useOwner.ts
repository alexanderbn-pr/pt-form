import { useState } from 'react';
import { OwnerValues, OwnerErrors } from '../types';
import { validateOwner } from '../validation/owner';

export function useOwner(initialValues: OwnerValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<OwnerErrors>({});
  const [touched, setTouched] = useState<{
    [K in keyof OwnerValues]?: boolean;
  }>({});

  const validate = (vals: OwnerValues = values): OwnerErrors => {
    return validateOwner(vals);
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
    setErrors,
    setTouched,
  };
}
