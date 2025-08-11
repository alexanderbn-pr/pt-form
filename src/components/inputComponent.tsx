interface InputComponentProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

function InputComponent({
  value,
  setValue,
  label,
  required,
  error,
  touched,
  onBlur,
}: InputComponentProps) {
  const hasError = Boolean(error && touched);
  return (
    <div>
      <label className="label-input">{label}</label>
      <input
        type="text"
        className={`input ${hasError ? 'input--err' : 'input--ok'}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-label={label}
      />
      <span className={`field-error ${hasError ? '' : 'hidden'}`}>
        {hasError ? error : ''}
      </span>
    </div>
  );
}

export default InputComponent;
