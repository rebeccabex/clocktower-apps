import {
  findNightOrderSlotByPosition,
  type NightOrder,
  type NightOrderSlot,
} from "./nightOrderSlots";

type NightOrderSectionProps = {
  nightOrder: NightOrder;
  label: string;
  dropdownValues: Array<NightOrderSlot>;
  updateNightOrderValue: (newValue: number) => void;
  currentValue: number;
};

export const NightOrderSection = ({
  nightOrder,
  label,
  dropdownValues,
  updateNightOrderValue,
  currentValue,
}: NightOrderSectionProps) => {
  const nightOrderSlot = findNightOrderSlotByPosition(nightOrder, currentValue);

  const onChange = (newValue: string) =>
    updateNightOrderValue(Number.parseInt(newValue));

  return (
    <>
      <label>{label}: </label>
      <select id={label} onChange={(e) => onChange(e.target.value)}>
        {dropdownValues.map((value) => (
          <option
            key={`${label}-${value}`}
            value={value.startingPosition}
            selected={
              value.startingPosition === nightOrderSlot?.startingPosition
            }
          >
            <div>{value.startingPosition}</div>
            <div>{value.description}</div>
          </option>
        ))}
      </select>
      <input
        type="number"
        onBlur={(e) => onChange(e.target.value)}
        value={currentValue}
      />
    </>
  );
};
