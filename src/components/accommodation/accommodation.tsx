import React, { useState } from 'react';
import { Photo } from '../../types';
import InputComponent from '../../components/inputComponent';
import SelectComponent from '../../components/selectComponent';
import { TYPE_OPTIONS } from '../../constants';
import { useValidationAccommodation } from '../../hooks/useValidationAccommodation';

interface Props {
  setStep: (step: number) => void;
}

function Accommodation({ setStep }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, label: 'Photo 1', color: 'bg-red-100 border-red-300' },
    { id: 2, label: 'Photo 2', color: 'bg-green-100 border-green-300' },
  ]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    type,
    setType,
  } = useValidationAccommodation({
    name: '',
    address: '',
    description: '',
    type: '',
  });

  const handleAddPhoto = () => {
    setPhotos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label: `Photo ${prev.length + 1}`,
        color: 'bg-white border-gray-300',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    console.log('send form');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-4 flex flex-col gap-2 h-[630px]"
    >
      <h2 className="text-xl font-semibold mb-2">Accommodation</h2>
      <InputComponent
        value={values.name}
        setValue={(val) => handleChange('name', val)}
        label="Name *"
        required={true}
        error={errors.name}
        touched={touched.name}
        onBlur={() => handleBlur('name')}
      />
      <InputComponent
        value={values.address}
        setValue={(val) => handleChange('address', val)}
        label="Address *"
        required={true}
        error={errors.address}
        touched={touched.address}
        onBlur={() => handleBlur('address')}
      />
      <InputComponent
        value={values.description}
        setValue={(val) => handleChange('description', val)}
        label="Description"
        required={false}
        error={errors.description}
        touched={touched.description}
        onBlur={() => handleBlur('description')}
      />
      <SelectComponent
        type={type}
        setType={setType}
        label="Type *"
        options={TYPE_OPTIONS}
      />
      <div>
        <label className="block text-sm font-medium mb-1">Photos</label>
        <div className="flex gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`w-24 h-20 flex items-center justify-center border rounded ${photo.color}`}
            >
              <span className="text-sm font-medium">{photo.label}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPhoto}
            className="w-24 h-20 flex items-center justify-center border rounded border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
          >
            Add Photo
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-100 text-blue-900 font-semibold text-lg mt-2 disabled:opacity-50"
        disabled={!isValid}
      >
        Next
      </button>
    </form>
  );
}

export default Accommodation;
