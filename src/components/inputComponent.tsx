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
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="text"
        className={`w-full border rounded px-2 py-1 mt-1 ${error && touched ? 'border-red-400' : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        required={required}
      />
      <span
        className={`text-xs text-red-500 block min-h-[1.25rem] ${
          error && touched ? 'visible' : 'invisible'
        }`}
      >
        {error && touched ? error : ''}
      </span>
    </div>
  );
}

export default InputComponent;
