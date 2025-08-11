import { AccommodationValues, TypeOption } from '../types';

interface SelectComponentProps {
  type: string;
  setType: (value: string) => void;
  label: string;
  options: TypeOption[];
  touched?: boolean;
  error?: string;
  handleBlur: (field: keyof AccommodationValues) => void;
}

function SelectComponent({
  type,
  setType,
  label,
  options,
  error,
  touched,
  handleBlur,
}: SelectComponentProps) {
  const hasError = Boolean(error && touched);

  return (
    <div>
      <label className="label-input">{label}</label>
      <select
        className={`input ${hasError ? 'input--err' : 'input--ok'}`}
        value={type}
        onChange={(e) => setType(e.target.value)}
        onBlur={() => handleBlur('type')}
        required
      >
        <option value="" disabled>
          -- Select a option --
        </option>
        {options.map((opt: TypeOption) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={`field-error ${hasError ? '' : 'hidden'}`}>
        {hasError ? error : ''}
      </span>
    </div>
  );
}

export default SelectComponent;
