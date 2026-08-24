import styled from "styled-components";
import type {
  BotCCharacterFieldName,
  JinxFieldName,
  SpecialAbilityFieldName,
} from "../types";

export type BaseFieldProps = {
  fieldName: BotCCharacterFieldName | SpecialAbilityFieldName | JinxFieldName;
  label?: string;
  helpText?: string;
};

type TextFieldProps = BaseFieldProps & {
  updateField: (newValue: string) => void;
  value: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  shouldDisplayLabel?: boolean;
};

export const TextField = ({
  fieldName,
  updateField,
  value,
  maxLength,
  label,
  required,
  pattern,
  shouldDisplayLabel = true,
}: TextFieldProps) => {
  const onUpdate = (newValue: string) => updateField(newValue);

  return (
    <TextFieldContainer>
      {shouldDisplayLabel && (
        <LabelContainer htmlFor="characterName">
          {label ?? fieldName}: {required && "*"}
        </LabelContainer>
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

const LabelContainer = styled.label`
  width: 40%;
`;

const InputContainer = styled.input`
  width: 60%;
  margin: 0 10px;
`;
