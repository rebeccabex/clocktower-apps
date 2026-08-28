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
  ...props
}: DropdownProps) => {
  const dropdownId = `dropdown_${label}`;
  if (!required && !values.includes(nullSelectionValue)) {
    values.unshift(nullSelectionValue);
  }

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
