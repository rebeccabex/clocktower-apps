// Source - https://stackoverflow.com/a/73648393
// Posted by Jan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-21, License - CC BY-SA 4.0

import { useEffect, useState } from "react";
import { convertCharacterToJson, type BotCCharacter } from "../types";

export default function useCharacterState(
  key: string,
  initialValue: BotCCharacter,
): [
  BotCCharacter,
  (value: BotCCharacter) => void,
  string,
  // (value: string) => void,
] {
  const [state, setInternalState] = useState(initialValue);
  const characterString = convertCharacterToJson(state);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    setInternalState(JSON.parse(value));
  }, [key]);

  const setState = (value: BotCCharacter) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  return [state, setState, characterString];
}
