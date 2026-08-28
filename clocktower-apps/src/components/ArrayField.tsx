import { Trash2 } from "lucide-react";
import { Button } from "./Button";
import { type BaseFieldProps } from "./TextField";
import styled from "styled-components";
import { TooltipWrapper } from "./TooltipWrapper";

type BaseArrayFieldProps = BaseFieldProps & {
  values: Array<string>;
  updateItem: (newValue: string, index: number) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  maxItemLength?: number;
  maxNumberOfElements: number;
};

type ArrayFieldProps = BaseArrayFieldProps &
  (
    | { displayTooltip: false; tooltipId?: never; tooltipContent?: never }
    | { displayTooltip: true; tooltipId: string; tooltipContent: string }
  );

export const ArrayField = ({
  fieldName,
  label,
  values,
  updateItem,
  addItem,
  removeItem,
  maxItemLength,
  maxNumberOfElements,
  ...props
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
        {props.displayTooltip && (
          <TooltipWrapper
            tooltipId={props.tooltipId}
            tooltipContent={props.tooltipContent}
          />
        )}
      </HeaderContainer>
      <FieldsContainer>
        {values.map((value, i) => (
          <RowContainer key={i}>
            <TextFieldWrapper
              type="textbox"
              id={`${fieldName}-${i}`}
              onChange={(e) => onUpdate(e.target.value, i)}
              maxLength={maxItemLength}
              value={value}
            />
            <Button
              onClick={() => onRemoveItem(i)}
              label="Delete"
              icon={Trash2}
            />
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
  margin: 5px 0;
`;

const TextFieldWrapper = styled.input`
  width: 80%;
  margin-left: 10px;
`;
