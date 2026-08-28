import styled from "styled-components";
import type {
  BotCCharacterFieldName,
  JinxFieldName,
  SpecialAbilityFieldName,
} from "../types";
import { TooltipWrapper } from "./TooltipWrapper";

export type BaseFieldProps = {
  fieldName: BotCCharacterFieldName | SpecialAbilityFieldName | JinxFieldName;
  label?: string;
};

type BaseTextFieldProps = BaseFieldProps & {
  updateField: (newValue: string) => void;
  value: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  shouldDisplayLabel?: boolean;
};

type TextFieldProps = BaseTextFieldProps &
  (
    | { displayTooltip: false; tooltipId?: never; tooltipContent?: never }
    | { displayTooltip: true; tooltipId: string; tooltipContent: string }
  );

export const TextField = ({
  fieldName,
  updateField,
  value,
  maxLength,
  label,
  required,
  pattern,
  shouldDisplayLabel = true,
  ...props
}: TextFieldProps) => {
  const onUpdate = (newValue: string) => updateField(newValue);

  return (
    <TextFieldContainer>
      {shouldDisplayLabel && (
        <LabelAndTooltip>
          <LabelContainer htmlFor="characterName">
            {label ?? fieldName}: {required && "*"}
          </LabelContainer>
          {props.displayTooltip && (
            <TooltipWrapper
              tooltipId={props.tooltipId}
              tooltipContent={props.tooltipContent}
            />
          )}
        </LabelAndTooltip>
      )}
      <InputContainer
        type="textbox"
        id={fieldName}
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
        maxLength={maxLength}
        pattern={pattern}
      />
    </TextFieldContainer>
  );
};

const TextFieldContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;

const LabelAndTooltip = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const LabelContainer = styled.label`
  width: 80%;
`;

const InputContainer = styled.input`
  width: 50%;
  margin: 0 10px;
`;
