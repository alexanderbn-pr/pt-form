import { typesAccommodation } from '../types';
interface SelectComponentProps {
  type: string;
  setType: (value: string) => void;
  label: string;
  options: typesAccommodation;
}

function SelectComponent({
  type,
  setType,
  label,
  options,
}: SelectComponentProps) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        className="w-full border rounded px-2 py-1 mt-1"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="" disabled>
          - Selecciona una opción -
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
