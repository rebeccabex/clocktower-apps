const nullSelectionValue = "------" as string;

type DropdownProps = {
  values: Array<string>;
  onChange: (newValue: string) => void;
  label: string;
  initialValue?: string;
  required?: boolean;
};

export const Dropdown = ({
  values,
  onChange,
  label,
  initialValue,
  required,
}: DropdownProps) => {
  const dropdownId = `dropdown_${label}`;
  if (!required && !values.includes(nullSelectionValue)) {
    values.unshift(nullSelectionValue);
  }

  return (
    <>
      <label htmlFor={dropdownId}>{label}: </label>
      <select
        id={dropdownId}
        defaultValue={initialValue || "Select..."}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((value) => (
          <option key={`${label}-${value}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};
