import styled from "styled-components";
import {
  createDisplayValueForNightOrderSlot,
  findNightOrderSlotByPosition,
  type NightOrder,
  type NightOrderSlot,
} from "./nightOrderSlots";
import { FieldLabel } from "./components/FieldLabel";
import { TooltipWrapper } from "./components/TooltipWrapper";

type BaseNightOrderSectionProps = {
  nightOrder: NightOrder;
  label: string;
  nightOrderSlots: Array<NightOrderSlot>;
  updateNightOrderValue: (newValue: number) => void;
  currentValue: number;
};

type NightOrderSectionProps = BaseNightOrderSectionProps &
  (
    | { displayTooltip: false; tooltipId?: never; tooltipContent?: never }
    | { displayTooltip: true; tooltipId: string; tooltipContent: string }
  );

export const NightOrderSection = ({
  nightOrder,
  label,
  nightOrderSlots,
  updateNightOrderValue,
  currentValue,
  ...props
}: NightOrderSectionProps) => {
  const currentNightOrderSlot = createDisplayValueForNightOrderSlot(
    findNightOrderSlotByPosition(nightOrder, currentValue),
  );

  const onChangeDropdownValue = (newValue: string) =>
    updateNightOrderValue(Number.parseInt(newValue));

  const onChangeNumericValue = (newValue: string) =>
    updateNightOrderValue(Number.parseInt(newValue));

  return (
    <NightOrderSectionContainer>
      <LabelAndTooltipContainer>
        <LabelContainer>{label}: </LabelContainer>
        {props.displayTooltip && (
          <TooltipWrapper
            tooltipId={props.tooltipId}
            tooltipContent={props.tooltipContent}
          />
        )}
      </LabelAndTooltipContainer>
      <ValueContainer>
        <SelectContainer
          id={label}
          onChange={(e) => onChangeDropdownValue(e.target.value)}
          value={currentNightOrderSlot}
        >
          {nightOrderSlots.map((value) => (
            <option
              key={`${label}-${createDisplayValueForNightOrderSlot(value)}`}
              value={createDisplayValueForNightOrderSlot(value)}
              disabled={value.unselectable}
            >
              {createDisplayValueForNightOrderSlot(value)}
            </option>
          ))}
        </SelectContainer>
        <InputContainer
          type="number"
          onChange={(e) => onChangeNumericValue(e.target.value)}
          value={currentValue}
          min={0}
        />
      </ValueContainer>
    </NightOrderSectionContainer>
  );
};

const NightOrderSectionContainer = styled.div`
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

const ValueContainer = styled.div`
  width: 55%;
`;

const SelectContainer = styled.select`
  width: 70%;
`;

const InputContainer = styled.input`
  width: 20%;
`;
