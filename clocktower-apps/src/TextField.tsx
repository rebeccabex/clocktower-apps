import type { BotCCharacterFieldName } from "./CharacterJsonCreatorPage";

type TextFieldProps = {
  fieldName: BotCCharacterFieldName;
  updateField: (newValue: string) => void;
  maxLength: number;
  label?: string;
  required?: boolean;
  helpText?: string;
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
      ></input>
    </div>
  );
};
