import InputComponent from '../../components/inputComponent';
import { OwnerValues, OwnerErrors } from '../../types';

interface Props {
  handleSubmit: (e: React.FormEvent, step: number) => void;
  values: OwnerValues;
  errors: OwnerErrors;
  touched: Partial<Record<keyof OwnerValues, boolean>>;
  handleChange: (field: keyof OwnerValues, value: string) => void;
  handleBlur: (field: keyof OwnerValues) => void;
  isValid: boolean;
}

function Owner({
  handleSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid,
}: Props) {
  return (
    <form onSubmit={(e) => handleSubmit(e, 3)} className="form">
      <section>
        <h2 className="title">Owner</h2>
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
      <button type="submit" className="mt-2 btn-primary" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default Owner;
