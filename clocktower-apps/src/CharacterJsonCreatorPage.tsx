import styled from "styled-components";
import { TextField } from "./components/TextField";
import { ArrayField } from "./components/ArrayField";
import {
  emptyBotCCharacter,
  type BotCCharacterFieldName,
  type BotCCharacterArrayFieldName,
  type CharacterType,
  characterTypes,
  type SpecialAbility,
  type SpecialAbilityFieldName,
  type Jinx,
  type JinxFieldName,
} from "./types";
import { SpecialAbilities } from "./SpecialAbilities";
import { JinxSection } from "./JinxSection";
import { Button } from "./components/Button";
import { Dropdown } from "./components/Dropdown";
import { NightOrderSection } from "./NightOrderSection";
import { firstNightOrderSlots, otherNightOrderSlots } from "./nightOrderSlots";
import useCharacterState from "./hooks/useCharacterState";

export const CharacterJsonCreatorPage = () => {
  const [characterObject, setCharacterObject, characterJsonString] =
    useCharacterState("currentJson", emptyBotCCharacter);

  const updateField = <T,>(
    updatedField: BotCCharacterFieldName,
    newValue: T,
  ) => {
    setCharacterObject({
      ...characterObject,
      [updatedField]: newValue,
    });
  };

  const updateValueInArray = <T,>(
    updatedField: BotCCharacterArrayFieldName,
    updatedValue: T,
    index: number,
  ) => {
    if (!characterObject[updatedField]) {
      return;
    }

    const updatedArray = characterObject[updatedField].map((item, i) => {
      if (index === i) {
        return updatedValue;
      } else {
        return item;
      }
    });

    setCharacterObject({
      ...characterObject,
      [updatedField]: updatedArray,
    });
  };

  const addItemToArray = <T,>(
    updatedField: BotCCharacterArrayFieldName,
    newValue: T,
  ) => {
    setCharacterObject({
      ...characterObject,
      [updatedField]: characterObject[updatedField]
        ? [...characterObject[updatedField], newValue]
        : [newValue],
    });
  };

  const removeItemFromArray = (
    updatedField: BotCCharacterArrayFieldName,
    indexToRemove: number,
  ) => {
    if (!characterObject[updatedField]) {
      return;
    }

    const updatedArray = characterObject[updatedField].filter(
      (_, i) => indexToRemove !== i,
    );

    setCharacterObject({
      ...characterObject,
      [updatedField]: updatedArray,
    });
  };

  const updateSpecialAbilities = (
    fieldToUpdate: SpecialAbilityFieldName,
    newValue: string,
    indexToUpdate: number,
  ) => {
    const updatedSpecialAbilities = characterObject.specialAbilities?.map(
      (specialAbility, i) => {
        if (i === indexToUpdate) {
          return {
            ...specialAbility,
            [fieldToUpdate]: newValue,
          };
        }
        return specialAbility;
      },
    );

    setCharacterObject({
      ...characterObject,
      specialAbilities: updatedSpecialAbilities,
    });
  };

  const updateJinxes = (
    fieldToUpdate: JinxFieldName,
    newValue: string,
    indexToUpdate: number,
  ) => {
    const updatedJinxes = characterObject.jinxes?.map((jinx, i) => {
      if (i === indexToUpdate) {
        return {
          ...jinx,
          [fieldToUpdate]: newValue,
        };
      }
      return jinx;
    });

    setCharacterObject({
      ...characterObject,
      jinxes: updatedJinxes,
    });
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(characterJsonString);
  };

  return (
    <>
      <div>Create Json for a Clocktower character</div>
      <PageLayout>
        <InputColumn>
          <TextField
            fieldName="id"
            updateField={(newValue: string) => updateField("id", newValue)}
            value={characterObject.id ?? ""}
            maxLength={50}
            label="Id"
            pattern="[a-z0-9]"
            required
          />
          <TextField
            fieldName="name"
            updateField={(newValue: string) => updateField("name", newValue)}
            value={characterObject.name ?? ""}
            maxLength={30}
            label="Character name"
            required
          />
          <Dropdown
            values={characterTypes}
            currentValue={characterObject.team}
            label="Character type"
            onChange={(newValue: string) =>
              updateField("team", newValue as CharacterType)
            }
            required
          />
          <TextField
            fieldName="ability"
            updateField={(newValue: string) => updateField("ability", newValue)}
            value={characterObject.ability ?? ""}
            maxLength={250}
            label="Ability"
            required
          />
          <TextField
            fieldName="edition"
            updateField={(newValue: string) => updateField("edition", newValue)}
            value={characterObject.edition ?? ""}
            maxLength={50}
            label="Edition"
          />
          <ArrayField
            fieldName="imageUrls"
            label="Image URLs"
            values={characterObject.imageUrls ?? []}
            updateItem={(newValue: string, index: number) =>
              updateValueInArray("imageUrls", newValue, index)
            }
            addItem={() => addItemToArray("imageUrls", "")}
            removeItem={(index) => removeItemFromArray("imageUrls", index)}
            maxNumberOfElements={3}
          />
          <div>
            <label htmlFor="isSetup">Setup?: </label>
            <input
              id="isSetup"
              type="checkbox"
              onChange={(e) => updateField("setup", e.target.checked)}
            />
          </div>
          <ArrayField
            fieldName="reminders"
            label="Character reminders"
            values={characterObject.reminders ?? []}
            updateItem={(newValue: string, index: number) =>
              updateValueInArray("reminders", newValue, index)
            }
            addItem={() => addItemToArray("reminders", "")}
            removeItem={(index) => removeItemFromArray("reminders", index)}
            maxNumberOfElements={20}
            maxItemLength={30}
          />
          <ArrayField
            fieldName="remindersGlobal"
            label="Global reminders"
            values={characterObject.remindersGlobal ?? []}
            updateItem={(newValue: string, index: number) =>
              updateValueInArray("remindersGlobal", newValue, index)
            }
            addItem={() => addItemToArray("remindersGlobal", "")}
            removeItem={(index) =>
              removeItemFromArray("remindersGlobal", index)
            }
            maxNumberOfElements={20}
            maxItemLength={25}
          />
          <NightOrderSection
            label="First night order"
            nightOrderSlots={firstNightOrderSlots}
            nightOrder="First"
            currentValue={characterObject.firstNight ?? 0}
            updateNightOrderValue={(newValue: number) =>
              updateField("firstNight", newValue)
            }
          />
          <NightOrderSection
            label="Other nights order"
            nightOrderSlots={otherNightOrderSlots}
            nightOrder="Other"
            currentValue={characterObject.otherNight ?? 0}
            updateNightOrderValue={(newValue: number) =>
              updateField("otherNight", newValue)
            }
          />
          <TextField
            fieldName="firstNightReminder"
            updateField={(newValue: string) =>
              updateField("firstNightReminder", newValue)
            }
            value={characterObject.firstNightReminder ?? ""}
            maxLength={500}
            label="First Night Reminder"
            helpText="Leave blank if character doesn't act on the first night"
          />
          <TextField
            fieldName="otherNightReminder"
            updateField={(newValue: string) =>
              updateField("otherNightReminder", newValue)
            }
            value={characterObject.otherNightReminder ?? ""}
            maxLength={500}
            label="Other Night Reminder"
            helpText="Leave blank if character doesn't wake at night (excluding the first night)"
          />
          <TextField
            fieldName="flavor"
            updateField={(newValue: string) => updateField("flavor", newValue)}
            value={characterObject.flavor ?? ""}
            maxLength={50}
            label="Flavour text"
          />
          <SpecialAbilities
            specialAbilities={characterObject.specialAbilities ?? []}
            addSpecialAbility={(newAbility: SpecialAbility) =>
              addItemToArray("specialAbilities", newAbility)
            }
            updateSpecialAbility={updateSpecialAbilities}
            removeSpecialAbility={(indexToRemove: number) =>
              removeItemFromArray("specialAbilities", indexToRemove)
            }
          />
          <JinxSection
            jinxes={characterObject.jinxes ?? []}
            addJinx={(newJinx: Jinx) => addItemToArray("jinxes", newJinx)}
            updateJinx={updateJinxes}
            removeJinx={(indexToRemove: number) =>
              removeItemFromArray("jinxes", indexToRemove)
            }
          />
        </InputColumn>
        <OutputColumn>
          <Button onClick={copyJsonToClipboard} label="Copy" />
          {characterJsonString}
        </OutputColumn>
      </PageLayout>
    </>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: 50%;
  padding: 10px 0;
`;

const OutputColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: 50%;
  padding: 10px 0;
`;
