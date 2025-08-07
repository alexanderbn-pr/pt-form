import React from 'react';
import InputComponent from '../../components/inputComponent';
import { useValidationOwner } from '../../hooks/useValidationOwner';

interface Props {
  setStep: (step: number) => void;
}

function Owner({ setStep }: Props) {
  const { values, errors, touched, handleChange, handleBlur, isValid } =
    useValidationOwner({
      name: '',
      email: '',
      phone: '',
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    console.log('send form');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-4 flex flex-col gap-2 h-[630px] justify-between"
    >
      <section>
        <h2 className="text-xl font-semibold mb-2">Owner</h2>
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
          value={values.email}
          setValue={(val) => handleChange('email', val)}
          label="Email *"
          required={true}
          error={errors.email}
          touched={touched.email}
          onBlur={() => handleBlur('email')}
        />
        <InputComponent
          value={values.phone}
          setValue={(val) => handleChange('phone', val)}
          label="Phone"
          required={false}
          error={errors.phone}
          touched={touched.phone}
          onBlur={() => handleBlur('phone')}
        />
      </section>
      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-100 text-blue-900 font-semibold text-lg mt-2 disabled:opacity-50"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default Owner;
