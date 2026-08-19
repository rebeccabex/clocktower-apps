import type { BaseFieldProps } from "./TextField";
import styled from "styled-components";

type ArrayFieldProps = BaseFieldProps & {
  values: Array<string>;
  updateItem: (newValue: string, index: number) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  maxItemLength?: number;
  maxNumberOfElements: number;
};

export const ArrayField = ({
  fieldName,
  label,
  values,
  updateItem,
  addItem,
  removeItem,
  maxItemLength,
  maxNumberOfElements,
}: ArrayFieldProps) => {
  const onUpdate = (newValue: string, index: number) =>
    updateItem(newValue, index);
  const onAddItem = () => addItem();
  const onRemoveItem = (index: number) => removeItem(index);
  const isDisabled = values.length >= maxNumberOfElements;

  return (
    <div>
      <div>{label}</div>
      <button onClick={onAddItem} disabled={isDisabled}>
        Add
      </button>
      <FieldsContainer>
        {values.map((value, i) => (
          <RowContainer key={i}>
            <input
              type="textbox"
              id={`${fieldName}-${i}`}
              onChange={(e) => onUpdate(e.target.value, i)}
              maxLength={maxItemLength}
              value={value}
            />
            <button onClick={() => onRemoveItem(i)}>-</button>
          </RowContainer>
        ))}
      </FieldsContainer>
    </div>
  );
};

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
