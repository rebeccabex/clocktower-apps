import type { BotCCharacterFieldName, SpecialAbilityFieldName } from "./types";

export type BaseFieldProps = {
  fieldName: BotCCharacterFieldName | SpecialAbilityFieldName;
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
    <div>
      <label htmlFor="characterName">
        {label ?? fieldName}: {required && "*"}
      </label>
      <input
        type="textbox"
        id={fieldName}
        onChange={(e) => onUpdate(e.target.value)}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
};
