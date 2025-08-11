import { useState } from 'react';
import { useAccommodation } from '../../hooks/useAccommodation';
import { useOwner } from '../../hooks/useOwner';
import { INITIAL_ACCOMMODATION, INITIAL_OWNER } from '../../constants';
import Accommodation from '../accommodation/accommodation';
import Owner from '../owner/owner';
import Resume from '../resume/resume';
import type { AccommodationValues, OwnerValues, Photo } from '../../types';

interface MultiStepFormSubmitDetail {
  accommodation: AccommodationValues;
  photos: Photo[];
  owner: OwnerValues;
}

interface MultiStepFormProps {
  onSubmit?: (detail: MultiStepFormSubmitDetail) => void;
}

function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const {
    values: valuesAcommodation,
    errors: errorsAcommodation,
    touched: touchedAcommodation,
    handleChange: handleChangeAcommodation,
    handleBlur: handleBlurAcommodation,
    isValid: isValidAcommodation,
    setErrors: setErrorsAcommodation,
    setTouched: setTouchedAcommodation,
    type,
    setType,
    handleAddPhotos,
    photos,
    setPhotos,
    setValues: setValuesAcommodation,
  } = useAccommodation(INITIAL_ACCOMMODATION);

  const {
    values: valuesOwner,
    errors: errorsOwner,
    touched: touchedOwner,
    handleChange: handleChangeOwner,
    handleBlur: handleBlurOwner,
    isValid: isValidOwner,
    setValues: setValuesOwner,
    setErrors: setErrorsOwner,
    setTouched: setTouchedOwner,
  } = useOwner(INITIAL_OWNER);

  const handleSubmit = (e: React.FormEvent, step: number) => {
    e.preventDefault();
    setStep(step);
  };

  const handleResetValues = () => {
    const detail: MultiStepFormSubmitDetail = {
      accommodation: { ...valuesAcommodation, type },
      photos,
      owner: valuesOwner,
    };

    onSubmit?.(detail);

    setValuesAcommodation(INITIAL_ACCOMMODATION);
    setValuesOwner(INITIAL_OWNER);
    setPhotos([]);
    setErrorsAcommodation({});
    setTouchedAcommodation({});
    setErrorsOwner({});
    setTouchedOwner({});
    setType('');
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Accommodation
            handleSubmit={handleSubmit}
            values={valuesAcommodation}
            errors={errorsAcommodation}
            touched={touchedAcommodation}
            handleChange={handleChangeAcommodation}
            handleBlur={handleBlurAcommodation}
            isValid={isValidAcommodation}
            type={type}
            setType={setType}
            handleAddPhotos={handleAddPhotos}
            photos={photos}
          />
        );
      case 2:
        return (
          <Owner
            handleSubmit={handleSubmit}
            values={valuesOwner}
            errors={errorsOwner}
            touched={touchedOwner}
            handleChange={handleChangeOwner}
            handleBlur={handleBlurOwner}
            isValid={isValidOwner}
          />
        );
      case 3:
        return (
          <Resume
            accommodationValues={valuesAcommodation}
            accommodationType={type}
            accommodationPhotos={photos}
            ownerValues={valuesOwner}
            handleResetValues={handleResetValues}
          />
        );
      default:
        return null;
    }
  };
  return (
    <main className="bg-white rounded-2xl shadow-lg p-8 w-[400px] flex flex-col">
      <div key={step} className="animate-[stepFadeSlide_500ms_ease-out]">
        {renderStep()}
      </div>
    </main>
  );
}

export default MultiStepForm;
