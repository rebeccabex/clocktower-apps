// Source - https://stackoverflow.com/a/73648393
// Posted by Jan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-21, License - CC BY-SA 4.0

import { useEffect, useState } from "react";

export default function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setInternalState] = useState<T>(initialValue);

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    setInternalState(JSON.parse(value));
  }, [key]);

  const setState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  return [state, setState];
}
