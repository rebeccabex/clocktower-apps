import styled from "styled-components";
import { Dropdown } from "./components/Dropdown";
import { TextField } from "./components/TextField";
import {
  specialAbilities,
  specialAbilityGlobalSettings,
  specialAbilityTimes,
  specialAbilityTypes,
  type SpecialAbility,
  type SpecialAbilityFieldName,
} from "./types";

type SpecialAbilitiesFieldProps = {
  specialAbility: SpecialAbility;
  updateAbility: (
    fieldToUpdate: SpecialAbilityFieldName,
    newValue: string,
  ) => void;
};

export const SpecialAbilitiesField = ({
  specialAbility,
  updateAbility,
}: SpecialAbilitiesFieldProps) => {
  const handleOnChange = (
    fieldToUpdate: SpecialAbilityFieldName,
    newValue: string,
  ) => updateAbility(fieldToUpdate, newValue);

  return (
    <SpecialAbilityContainer>
      <Dropdown
        values={specialAbilities}
        onChange={(newValue: string) => handleOnChange("name", newValue)}
        label="Ability"
        currentValue={specialAbility.name}
        required
      />
      <Dropdown
        values={specialAbilityTypes}
        onChange={(newValue: string) => handleOnChange("type", newValue)}
        label="Type"
        currentValue={specialAbility.type}
        required
      />
      <Dropdown
        values={specialAbilityGlobalSettings}
        onChange={(newValue: string) => handleOnChange("global", newValue)}
        label="Global"
        currentValue={specialAbility.global ?? undefined}
      />
      <Dropdown
        values={specialAbilityTimes}
        onChange={(newValue: string) => handleOnChange("time", newValue)}
        label="Time"
        currentValue={specialAbility.time ?? undefined}
      />
      <TextField
        fieldName="value"
        updateField={(newValue: string) => handleOnChange("value", newValue)}
        label="Value"
        value={specialAbility.value as string}
        maxLength={50}
      />
    </SpecialAbilityContainer>
  );
};

const SpecialAbilityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
