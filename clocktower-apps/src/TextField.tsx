import type { BotCCharacterFieldName } from "./CharacterJsonCreatorPage";

export type BaseFieldProps = {
  fieldName: BotCCharacterFieldName;
  label?: string;
  helpText?: string;
};

type TextFieldProps = BaseFieldProps & {
  updateField: (newValue: string) => void;
  maxLength: number;
  required?: boolean;
};

export const TextField = ({
  fieldName,
  updateField,
  maxLength,
  label,
  required,
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
      />
    </div>
  );
};
