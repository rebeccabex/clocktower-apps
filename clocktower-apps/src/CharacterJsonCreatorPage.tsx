import { useState } from "react";
import styled from "styled-components";
import { TextField } from "./TextField";
import { ArrayField } from "./ArrayField";

const characterType = {
  townsfolk: "Townsfolk",
  outsider: "Outsider",
  minion: "Minion",
  demon: "Demon",
  traveller: "Traveller",
  fabled: "Fabled",
  loric: "Loric",
};

type CharacterType = keyof typeof characterType;
const characterTypes = Object.keys(characterType) as Array<CharacterType>;

type SpecialAbilities = {};

type Jinx = {
  id: string;
  reason: string;
};

type BotCCharacterArrayFields = {
  imageUrls: Array<string>;
  reminders: Array<string>;
  remindersGlobal: Array<string>;
};
type BotCCharacterArrayFieldNames = keyof BotCCharacterArrayFields;

type BotCCharacter = {
  id: string;
  edition: string;
  characterName: string;
  team: CharacterType;
  imageUrls: Array<string>;
  ability: string;
  setup: boolean;
  reminders: Array<string>;
  remindersGlobal: Array<string>;
  firstNightReminder?: string;
  otherNightReminder?: string;
  specialAbilities: SpecialAbilities;
  jinxes?: Array<Jinx>;
  flavor?: string;
};
export type BotCCharacterFieldName = keyof BotCCharacter;

const emptyBotCCharacter: BotCCharacter = {
  id: "",
  edition: "",
  characterName: "",
  team: "townsfolk",
  imageUrls: [],
  ability: "",
  setup: false,
  reminders: [],
  remindersGlobal: [],
  specialAbilities: {},
};

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
    updatedField: BotCCharacterArrayFieldNames,
    updatedValue: T,
    index: number,
  ) => {
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
    updatedField: BotCCharacterArrayFieldNames,
    newValue: T,
  ) => {
    setCharacterObject({
      ...characterObject,
      [updatedField]: [...characterObject[updatedField], newValue],
    });
  };

  const removeItemFromArray = (
    updatedField: BotCCharacterArrayFieldNames,
    indexToRemove: number,
  ) => {
    const updatedArray = characterObject[updatedField].filter(
      (_, i) => indexToRemove !== i,
    );

    setCharacterObject({
      ...characterObject,
      [updatedField]: updatedArray,
    });
  };

  const characterJsonString = JSON.stringify(characterObject);

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
          />
          <TextField
            fieldName="characterName"
            updateField={(newValue: string) =>
              updateField("characterName", newValue)
            }
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
            values={characterObject.imageUrls}
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
            values={characterObject.reminders}
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
            values={characterObject.remindersGlobal}
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
        </InputColumn>
        <OutputColumn>{characterJsonString}</OutputColumn>
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
