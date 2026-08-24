import styled from "styled-components";

export const nullSelectionValue = "------" as string;

type DropdownProps = {
  values: Array<string>;
  onChange: (newValue: string) => void;
  label: string;
  currentValue?: string;
  required?: boolean;
  shouldDisplayLabel?: boolean;
};

export const Dropdown = ({
  values,
  onChange,
  label,
  currentValue,
  required,
  shouldDisplayLabel = true,
}: DropdownProps) => {
  const dropdownId = `dropdown_${label}`;
  if (!required && !values.includes(nullSelectionValue)) {
    values.unshift(nullSelectionValue);
  }

  return (
    <DropdownContainer>
      {shouldDisplayLabel && (
        <LabelContainer htmlFor={dropdownId}>{label}: </LabelContainer>
      )}
      <SelectContainer
        id={dropdownId}
        onChange={(e) => onChange(e.target.value)}
        value={currentValue}
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
  margin: 5px 0;
`;

const LabelContainer = styled.label`
  width: 40%;
`;

const SelectContainer = styled.select`
  width: 60%;
  margin: 0 10px;
`;
