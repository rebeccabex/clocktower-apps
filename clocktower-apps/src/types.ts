import { nullSelectionValue } from "./components/Dropdown";

export const characterType = {
  townsfolk: "Townsfolk",
  outsider: "Outsider",
  minion: "Minion",
  demon: "Demon",
  traveller: "Traveller",
  fabled: "Fabled",
  loric: "Loric",
};

export type CharacterType = keyof typeof characterType;
export const characterTypes = Object.keys(
  characterType,
) as Array<CharacterType>;

export const specialAbilityType = {
  selection: "Selection",
  ability: "Ability",
  signal: "Signal",
  vote: "Vote",
  reveal: "Reveal",
  player: "Player",
  reminder: "Reminder",
};
export type SpecialAbilityType = keyof typeof specialAbilityType;
export const specialAbilityTypes = Object.keys(
  specialAbilityType,
) as Array<SpecialAbilityType>;

export const specialAbilityName = {
  grimoire: "grimoire",
  pointing: "pointing",
  ghostVotes: "ghost-votes",
  distributeRoles: "distribute-roles",
  bagDisabled: "bag-disabled",
  bagDuplicate: "bag-duplicate",
  evilDuplicate: "evil-duplicate",
  goodDuplicate: "good-duplicate",
  multiplier: "multiplier",
  hidden: "hidden",
  replaceCharacter: "replace-character",
  player: "player",
  card: "card",
  openEyes: "open-eyes",
  public: "public",
};
export type SpecialAbilityName = keyof typeof specialAbilityName;
export const specialAbilities = Object.keys(
  specialAbilityName,
) as Array<SpecialAbilityName>;

export const specialAbilityTime = {
  pregame: "pregame",
  day: "day",
  night: "night",
  firstNight: "firstNight",
  firstDay: "firstDay",
  otherNight: "otherNight",
  otherDay: "otherDay",
};
export type SpecialAbilityTime = keyof typeof specialAbilityTime;
export const specialAbilityTimes = Object.keys(
  specialAbilityTime,
) as Array<SpecialAbilityTime>;

export const specialAbilityGlobal = {
  townsfolk: "townsfolk",
  outsider: "outsider",
  minion: "minion",
  demon: "demon",
  traveller: "traveller",
  dead: "dead",
};
export type SpecialAbilityGlobal = keyof typeof specialAbilityGlobal;
export const specialAbilityGlobalSettings = Object.keys(
  specialAbilityGlobal,
) as Array<SpecialAbilityGlobal>;

export type SpecialAbility = {
  name: SpecialAbilityName;
  type: SpecialAbilityType;
  value?: string | number;
  time?: SpecialAbilityTime;
  global?: SpecialAbilityGlobal;
};
export type SpecialAbilityFieldName = keyof SpecialAbility;

export const defaultSpecialAbility = {
  name: "grimoire" as const,
  type: "ability" as const,
};

export type Jinx = {
  id: string;
  reason: string;
};
export type JinxFieldName = keyof Jinx;

export type BotCCharacterArrayFields = {
  imageUrls: Array<string>;
  reminders: Array<string>;
  remindersGlobal: Array<string>;
  specialAbilities: Array<SpecialAbility>;
};
export type BotCCharacterArrayFieldName = keyof BotCCharacterArrayFields;

export type BotCCharacter = {
  id: string;
  edition?: string;
  name: string;
  team: CharacterType;
  imageUrls?: Array<string>;
  ability: string;
  setup: boolean;
  reminders?: Array<string>;
  remindersGlobal?: Array<string>;
  firstNightReminder?: string;
  otherNightReminder?: string;
  specialAbilities?: Array<SpecialAbility>;
  jinxes?: Array<Jinx>;
  flavor?: string;
};
export type BotCCharacterFieldName = keyof BotCCharacter;

export const emptyBotCCharacter: BotCCharacter = {
  id: "",
  edition: "",
  name: "",
  team: "townsfolk",
  imageUrls: [],
  ability: "",
  setup: false,
  reminders: [],
  remindersGlobal: [],
  specialAbilities: [],
};

const removeEmptyArrayValues = (character: BotCCharacter): BotCCharacter => ({
  ...character,
  imageUrls: character.imageUrls?.filter((url) => url.length > 0),
  reminders: character.reminders?.filter((reminder) => reminder.length > 0),
  remindersGlobal: character.remindersGlobal?.filter(
    (reminder) => reminder.length > 0,
  ),
  specialAbilities: character.specialAbilities?.map((ability) => ({
    ...ability,
    time: ability.time === nullSelectionValue ? undefined : ability.time,
    global: ability.global === nullSelectionValue ? undefined : ability.global,
  })),
});

const removeEmptyOptionalFields = (
  character: BotCCharacter,
): BotCCharacter => ({
  ...character,
  edition: character.edition || undefined,
  imageUrls:
    character.imageUrls && character.imageUrls.length > 0
      ? character.imageUrls
      : undefined,
  reminders:
    character.reminders && character.reminders.length > 0
      ? character.reminders
      : undefined,
  remindersGlobal:
    character.remindersGlobal && character.remindersGlobal.length > 0
      ? character.remindersGlobal
      : undefined,
  firstNightReminder: character.firstNightReminder || undefined,
  otherNightReminder: character.otherNightReminder || undefined,
  specialAbilities:
    character.specialAbilities && character.specialAbilities.length > 0
      ? character.specialAbilities
      : undefined,
});

export const convertCharacterToJson = (character: BotCCharacter) => {
  const modifiedCharacter = removeEmptyOptionalFields(
    removeEmptyArrayValues(character),
  );

  return JSON.stringify(modifiedCharacter, null, 2);
};
