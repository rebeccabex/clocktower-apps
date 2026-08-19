import { useState } from "react";
import styled from "styled-components";
import { TextField } from "./components/TextField";
import { ArrayField } from "./components/ArrayField";
import {
  emptyBotCCharacter,
  type BotCCharacterFieldName,
  type BotCCharacterArrayFieldName,
  type CharacterType,
  characterTypes,
  convertCharacterToJson,
  type SpecialAbility,
} from "./types";
import { SpecialAbilities } from "./SpecialAbilities";

export const CharacterJsonCreatorPage = () => {
  const [characterObject, setCharacterObject] = useState(emptyBotCCharacter);

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

  const characterJsonString = convertCharacterToJson(characterObject);

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
            maxLength={50}
            label="Id"
            pattern="[a-z0-9]"
          />
          <TextField
            fieldName="name"
            updateField={(newValue: string) => updateField("name", newValue)}
            maxLength={30}
            label="Character name"
          />
          <div>
            <label htmlFor="characterType">Character type: </label>
            <select
              id="characterType"
              onChange={(e) =>
                updateField("team", e.target.value as CharacterType)
              }
            >
              (
              {characterTypes.map((characterType) => (
                <option key={characterType} value={characterType}>
                  {characterType}
                </option>
              ))}
              )
            </select>
          </div>
          <TextField
            fieldName="ability"
            updateField={(newValue: string) => updateField("ability", newValue)}
            maxLength={250}
            label="Ability"
          />
          <TextField
            fieldName="edition"
            updateField={(newValue: string) => updateField("edition", newValue)}
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
          <TextField
            fieldName="firstNightReminder"
            updateField={(newValue: string) =>
              updateField("firstNightReminder", newValue)
            }
            maxLength={500}
            label="First Night Reminder"
            helpText="Leave blank if character doesn't act on the first night"
          />
          <TextField
            fieldName="otherNightReminder"
            updateField={(newValue: string) =>
              updateField("otherNightReminder", newValue)
            }
            maxLength={500}
            label="Other Night Reminder"
            helpText="Leave blank if character doesn't wake at night (excluding the first night)"
          />
          <TextField
            fieldName="flavor"
            updateField={(newValue: string) => updateField("flavor", newValue)}
            maxLength={50}
            label="Flavour text"
          />
          <SpecialAbilities
            specialAbilities={characterObject.specialAbilities ?? []}
            addSpecialAbility={(newAbility: SpecialAbility) =>
              addItemToArray("specialAbilities", newAbility)
            }
            updateSpecialAbility={(
              updatedAbility: SpecialAbility,
              indexToUpdate: number,
            ) =>
              updateValueInArray(
                "specialAbilities",
                updatedAbility,
                indexToUpdate,
              )
            }
            removeSpecialAbility={(indexToRemove: number) =>
              removeItemFromArray("specialAbilities", indexToRemove)
            }
          />
        </InputColumn>
        <OutputColumn>
          <button onClick={copyJsonToClipboard}>Copy</button>
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
`;

const OutputColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  width: 50%;
`;
