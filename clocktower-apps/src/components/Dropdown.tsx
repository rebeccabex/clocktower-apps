import styled from "styled-components";
import { TooltipWrapper } from "./TooltipWrapper";
import { FieldLabel } from "./FieldLabel";

export const nullSelectionValue = "------" as string;

type BaseDropdownProps = {
  values: Array<string>;
  onChange: (newValue: string) => void;
  label: string;
  currentValue?: string;
  required?: boolean;
  shouldDisplayLabel?: boolean;
  mappingForDisplay?: { [key: string]: string };
};

type DropdownProps = BaseDropdownProps &
  (
    | { displayTooltip: false; tooltipId?: never; tooltipContent?: never }
    | { displayTooltip: true; tooltipId: string; tooltipContent: string }
  );

export const Dropdown = ({
  values,
  onChange,
  label,
  currentValue,
  required,
  shouldDisplayLabel = true,
  mappingForDisplay,
  ...props
}: DropdownProps) => {
  const dropdownId = `dropdown_${label}`;
  if (!required && !values.includes(nullSelectionValue)) {
    values.unshift(nullSelectionValue);
  }

  const getDisplayValue = (value: string) => {
    if (!mappingForDisplay || !Object.keys(mappingForDisplay).includes(value)) {
      return value;
    }
    return mappingForDisplay[value];
  };

  return (
    <DropdownContainer>
      {shouldDisplayLabel && (
        <LabelAndTooltipContainer>
          <LabelContainer htmlFor={dropdownId}>{label}: </LabelContainer>
          {props.displayTooltip && (
            <TooltipWrapper
              tooltipId={props.tooltipId}
              tooltipContent={props.tooltipContent}
            />
          )}
        </LabelAndTooltipContainer>
      )}
      <SelectContainer
        id={dropdownId}
        onChange={(e) => onChange(e.target.value)}
        value={currentValue && getDisplayValue(currentValue)}
      >
        {values.map((value) => (
          <option key={`${label}-${value}`} value={value}>
            {getDisplayValue(value)}
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

const LabelAndTooltipContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const LabelContainer = styled(FieldLabel)`
  width: 80%;
`;

const SelectContainer = styled.select`
  width: 50%;
  margin: 0 10px;
`;
