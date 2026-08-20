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
  maxLength: number;
  required?: boolean;
  pattern?: string;
};

export const TextField = ({
  fieldName,
  updateField,
  maxLength,
  label,
  required,
  pattern,
}: TextFieldProps) => {
  const onUpdate = (newValue: string) => updateField(newValue);

  return (
    <TextFieldContainer>
      <LabelContainer htmlFor="characterName">
        {label ?? fieldName}: {required && "*"}
      </LabelContainer>
      <InputContainer
        type="textbox"
        id={fieldName}
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
