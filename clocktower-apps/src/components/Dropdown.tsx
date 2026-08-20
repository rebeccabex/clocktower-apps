import styled from "styled-components";

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
    <DropdownContainer>
      <LabelContainer htmlFor={dropdownId}>{label}: </LabelContainer>
      <SelectContainer
        id={dropdownId}
        defaultValue={initialValue || "Select..."}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((value) => (
          <option key={`${label}-${value}`} value={value}>
            {value}
          </option>
        ))}
      </SelectContainer>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const LabelContainer = styled.label`
  width: 40%;
`;

const SelectContainer = styled.select`
  width: 60%;
  margin: 0 10px;
`;
