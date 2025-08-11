import { useState } from 'react';
import { AccommodationValues, AccommodationErrors, Photo } from '../types';
import { validateAccommodation } from '../validation/accommodation';
import { MAX_PHOTOS } from '../constants';

export function useAccommodation(initialValues: AccommodationValues) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<AccommodationErrors>({});
  const [type, setType] = useState('');
  const [touched, setTouched] = useState<{
    [K in keyof AccommodationValues]?: boolean;
  }>({});

  const validate = (
    vals: AccommodationValues = values,
  ): AccommodationErrors => {
    return validateAccommodation(vals, type);
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

  const handleAddPhotos = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setPhotos((prev) => {
      const availableSlots = Math.max(0, MAX_PHOTOS - prev.length);
      const filesToAdd = files.slice(0, availableSlots);
      if (filesToAdd.length === 0) return prev;

      const startId = prev.length + 1;
      const newPhotos: Photo[] = filesToAdd.map((file, idx) => ({
        id: startId + idx,
        url: URL.createObjectURL(file),
      }));
      return [...prev, ...newPhotos];
    });
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
    setType,
    type,
    handleAddPhotos,
    photos,
    setPhotos,
    setErrors,
    setTouched,
  };
}
