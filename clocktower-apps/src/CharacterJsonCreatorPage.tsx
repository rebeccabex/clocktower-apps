import { useState } from "react";

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
  // const [characterJsonString, updateCharacterJsonString] = useState("{}");
  const [characterObject, setCharacterObject] = useState(emptyBotCCharacter);

  const updateCharacterName = (newName: string) => {
    setCharacterObject({
      ...characterObject,
      characterName: newName,
      id: `${characterObject.edition}_${newName}`,
    });
  };

  const updateAbility = (ability: string) => {
    setCharacterObject({
      ...characterObject,
      ability: ability,
    });
  };

  const updateCharacterEdition = (newEdition: string) => {
    setCharacterObject({
      ...characterObject,
      edition: newEdition,
      id: `${newEdition}_${characterObject.characterName}`,
    });
  };

  const updateCharacterType = (newType: CharacterType) => {
    setCharacterObject({
      ...characterObject,
      team: newType,
    });
  };

  const updateCharacterImageUrls = (urls: string) => {
    const urlList = urls.split("\r\n");
    setCharacterObject({
      ...characterObject,
      imageUrls: urlList,
    });
  };

  const updateIsSetup = (isSetup: boolean) => {
    setCharacterObject({
      ...characterObject,
      setup: isSetup,
    });
  };

  const updateCharacterReminders = (reminders: string) => {
    const reminderList = reminders.split("\r\n");
    setCharacterObject({
      ...characterObject,
      reminders: reminderList,
    });
  };

  const updateGlobalReminders = (reminders: string) => {
    const reminderList = reminders.split("\r\n");
    setCharacterObject({
      ...characterObject,
      remindersGlobal: reminderList,
    });
  };

  const updateFirstNightReminder = (reminder: string) => {
    if (reminder.length === 0) {
      setCharacterObject({
        ...characterObject,
        firstNightReminder: undefined,
      });
    } else {
      setCharacterObject({
        ...characterObject,
        firstNightReminder: reminder,
      });
    }
  };

  const updateOtherNightReminder = (reminder: string) => {
    if (reminder.length === 0) {
      setCharacterObject({
        ...characterObject,
        otherNightReminder: undefined,
      });
    } else {
      setCharacterObject({
        ...characterObject,
        otherNightReminder: reminder,
      });
    }
  };

  const updateFlavourText = (newFlavourText: string) => {
    setCharacterObject({
      ...characterObject,
      flavor: newFlavourText,
    });
  };

  const characterJsonString = JSON.stringify(characterObject);

  return (
    <>
      <div>Create Json for a Clocktower character</div>
      <div>
        <div>
          <label htmlFor="characterName">Character name: </label>
          <input
            type="textbox"
            id="characterName"
            onChange={(e) => updateCharacterName(e.target.value)}
            maxLength={30}
          ></input>
        </div>
        <div>
          <label htmlFor="characterType">Character type: </label>
          <select
            id="characterType"
            onChange={(e) =>
              updateCharacterType(e.target.value as CharacterType)
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
        <div>
          <label htmlFor="ability">Ability: </label>
          <input
            id="ability"
            onChange={(e) => updateAbility(e.target.value)}
            maxLength={250}
          />
        </div>
        <div>
          <label htmlFor="edition">Edition: </label>
          <input
            id="edition"
            onChange={(e) => updateCharacterEdition(e.target.value)}
            maxLength={50}
          ></input>
        </div>
        <div>
          <label htmlFor="imageUrls">
            Image URLs (put each on a separate line):
          </label>
          <textarea
            id="imageUrls"
            onChange={(e) => updateCharacterImageUrls(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="isSetup">Setup?: </label>
          <input
            id="isSetup"
            type="checkbox"
            onChange={(e) => updateIsSetup(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="characterReminders">Reminders: </label>
          <input
            id="characterReminders"
            onChange={(e) => updateCharacterReminders(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="globalReminders">Global reminders: </label>
          <input
            id="globalReminders"
            onChange={(e) => updateGlobalReminders(e.target.value)}
          ></input>
        </div>
      </div>
      <div>
        <label htmlFor="firstNightReminder">
          First Night Reminder: (leave blank if Character doesn't act on the
          first night)
        </label>
        <input
          id="firstNightReminder"
          onChange={(e) => updateFirstNightReminder(e.target.value)}
          maxLength={500}
        ></input>
      </div>
      <div>
        <label htmlFor="otherNightReminder">
          Other Night Reminder: (leave blank if Character doesn't act on the
          nights other than the first)
        </label>
        <input
          id="otherNightReminder"
          onChange={(e) => updateOtherNightReminder(e.target.value)}
          maxLength={500}
        ></input>
      </div>
      <div>
        <label htmlFor="flavour">Flavour text: </label>
        <input
          id="flavour"
          onChange={(e) => updateFlavourText(e.target.value)}
          maxLength={500}
        />
      </div>
      <div>{characterJsonString}</div>
    </>
  );
};
