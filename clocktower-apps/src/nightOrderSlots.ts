export type NightOrderSlot = {
  startingPosition: number;
  endingPosition?: number;
  description: string;
  characters?: Array<string>;
  unselectable?: boolean;
};

export type NightOrder = "First" | "Other";

export const findNightOrderSlotByPosition = (
  night: NightOrder,
  position: number,
) => {
  const nightOrderSlots =
    night === "First" ? firstNightOrderSlots : otherNightOrderSlots;

  return nightOrderSlots.find(
    (slot) =>
      slot.startingPosition === position ||
      (slot.endingPosition ?? nightOrderSlots.length) >= position,
  );
};

export const firstNightOrderSlots: Array<NightOrderSlot> = [
  { startingPosition: 0, description: "dawn", unselectable: true },
  {
    startingPosition: 1,
    endingPosition: 4,
    description: "Setup Fabled/Lorics",
  },
  {
    startingPosition: 5,
    description: "All night abilities",
    characters: ["Wraith"],
  },
  {
    startingPosition: 6,
    endingPosition: 7,
    description: "Setup Demons",
    characters: ["Kazali", "Lord of Typhon"],
  },
  {
    startingPosition: 8,
    endingPosition: 11,
    description: "Travellers",
    characters: ["Apprentice", "Barista", "Bureaucrat", "Thief"],
  },
  {
    startingPosition: 12,
    endingPosition: 14,
    description: "Additional abilities",
    characters: ["Boffin", "Philosopher", "Alchemist"],
  },
  {
    startingPosition: 15,
    endingPosition: 18,
    description: "Affect Demon/Minion info",
    characters: ["Poppy Grower", "Magician", "Tor"],
  },
  {
    startingPosition: 19,
    description: "Minion info",
    unselectable: true,
  },
  {
    startingPosition: 20,
    description: "Extra Minion info",
    characters: ["Snitch"],
  },
  {
    startingPosition: 21,
    endingPosition: 22,
    description: "Alternative Demon setup",
    characters: ["Lunatic", "Summoner"],
  },
  {
    startingPosition: 23,
    description: "Demon info",
    unselectable: true,
  },
  {
    startingPosition: 24,
    endingPosition: 26,
    description: "Extra Demon info",
    characters: ["King, Marionette"],
  },
  {
    startingPosition: 27,
    endingPosition: 28,
    description: "Affect Demon/Minions",
    characters: ["Engineer", "Preacher"],
  },
  {
    startingPosition: 29,
    endingPosition: 30,
    description: "Night 1 Demons",
    characters: ["Lil Monsta", "Lleech", "Pukka", "Yaggababble"],
  },
  {
    startingPosition: 31,
    endingPosition: 33,
    description: "Poisoning Minions",
    characters: ["Xaan", "Poisoner", "Widow"],
  },
  {
    startingPosition: 34,
    description: "Townsfolk protection/drunkening",
    characters: ["Sailor", "Courtier"],
  },
  {
    startingPosition: 37,
    endingPosition: 45,
    description: "Minion info and abilities",
    characters: ["Godfather", "Organ Grinder", "Devil's Advocate"],
  },
  {
    startingPosition: 47,
    endingPosition: 70,
    description: "Townsfolk and Outsider info and abilities",
    characters: ["Pixie", "Huntsman", "Damsel"],
  },
  {
    startingPosition: 73,
    endingPosition: 76,
    description: "Meta info",
    characters: ["High Priestess", "General", "Chambermaid", "Mathematician"],
  },
  {
    startingPosition: 77,
    description: "Dawn",
    unselectable: true,
  },
  {
    startingPosition: 78,
    endingPosition: 79,
    description: "Morning announcements",
    characters: ["Leviathan", "Vizier"],
  },
];

export const otherNightOrderSlots: Array<NightOrderSlot> = [];
