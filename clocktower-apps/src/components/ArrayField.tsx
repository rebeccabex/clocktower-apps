import { Button } from "./Button";
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
    <ArrayFieldContainer>
      <HeaderContainer>
        <div>{label}</div>
        <Button onClick={onAddItem} label="Add" disabled={isDisabled} />
      </HeaderContainer>
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
            <Button onClick={() => onRemoveItem(i)} label="Delete" />
          </RowContainer>
        ))}
      </FieldsContainer>
    </ArrayFieldContainer>
  );
};

const ArrayFieldContainer = styled.div`
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
