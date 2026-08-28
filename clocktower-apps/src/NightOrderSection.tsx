import styled from "styled-components";
import {
  createDisplayValueForNightOrderSlot,
  findNightOrderSlotByPosition,
  type NightOrder,
  type NightOrderSlot,
} from "./nightOrderSlots";
import { FieldLabel } from "./components/FieldLabel";

type NightOrderSectionProps = {
  nightOrder: NightOrder;
  label: string;
  nightOrderSlots: Array<NightOrderSlot>;
  updateNightOrderValue: (newValue: number) => void;
  currentValue: number;
};

export const NightOrderSection = ({
  nightOrder,
  label,
  nightOrderSlots,
  updateNightOrderValue,
  currentValue,
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
      <LabelContainer>{label}: </LabelContainer>
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

const LabelContainer = styled(FieldLabel)`
  width: 40%;
`;

const ValueContainer = styled.div`
  width: 60%;
`;

const SelectContainer = styled.select`
  width: 70%;
`;

const InputContainer = styled.input`
  width: 20%;
`;
