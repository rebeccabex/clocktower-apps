import styled from "styled-components";
import { Dropdown } from "./components/Dropdown";
import { TextField } from "./components/TextField";
import {
  specialAbilities,
  specialAbilityGlobal,
  specialAbilityGlobalSettings,
  specialAbilityName,
  specialAbilityTime,
  specialAbilityTimes,
  specialAbilityType,
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
  index: number;
};

export const SpecialAbilitiesField = ({
  specialAbility,
  updateAbility,
  index,
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
        mappingForDisplay={specialAbilityName}
        required
        displayTooltip={false}
      />
      <Dropdown
        values={specialAbilityTypes}
        onChange={(newValue: string) => handleOnChange("type", newValue)}
        label="Type"
        currentValue={specialAbility.type}
        mappingForDisplay={specialAbilityType}
        required
        displayTooltip
        tooltipId={`special-ability-${index}-type`}
        tooltipContent="The integration type, where the feature is used"
      />
      <Dropdown
        values={specialAbilityGlobalSettings}
        onChange={(newValue: string) => handleOnChange("global", newValue)}
        label="Global"
        currentValue={specialAbility.global ?? undefined}
        mappingForDisplay={specialAbilityGlobal}
        displayTooltip
        tooltipId={`special-ability-${index}-global`}
        tooltipContent="The character type that uses the ability if the character is not in play (eg Lil' Monsta)"
      />
      <Dropdown
        values={specialAbilityTimes}
        onChange={(newValue: string) => handleOnChange("time", newValue)}
        label="Time"
        currentValue={specialAbility.time ?? undefined}
        mappingForDisplay={specialAbilityTime}
        displayTooltip
        tooltipId={`special-ability-${index}-time`}
        tooltipContent="The point in the game where the special ability is used"
      />
      <TextField
        fieldName="value"
        updateField={(newValue: string) => handleOnChange("value", newValue)}
        label="Value"
        value={specialAbility.value as string}
        maxLength={50}
        displayTooltip
        tooltipId={`special-ability-${index}-value`}
        tooltipContent="A text or numerical value used by the special ability"
      />
    </SpecialAbilityContainer>
  );
};

const SpecialAbilityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
