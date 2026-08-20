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
        initialValue={specialAbility.name}
        required
      />
      <Dropdown
        values={specialAbilityTypes}
        onChange={(newValue: string) => handleOnChange("type", newValue)}
        label="Type"
        initialValue={specialAbility.type}
        required
      />
      <Dropdown
        values={specialAbilityGlobalSettings}
        onChange={(newValue: string) => handleOnChange("global", newValue)}
        label="Global"
        initialValue={specialAbility.global ?? undefined}
      />
      <Dropdown
        values={specialAbilityTimes}
        onChange={(newValue: string) => handleOnChange("time", newValue)}
        label="Time"
        initialValue={specialAbility.time ?? undefined}
      />
      <TextField
        fieldName="value"
        updateField={(newValue: string) => handleOnChange("value", newValue)}
        label="Value"
        maxLength={50}
      />
    </SpecialAbilityContainer>
  );
};

const SpecialAbilityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
