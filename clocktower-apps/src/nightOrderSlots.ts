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

  return (
    nightOrderSlots.find(
      (slot) =>
        slot.startingPosition === position ||
        (slot.endingPosition ?? nightOrderSlots.length) >= position,
    ) ?? DoesntWakeSlot
  );
};

export const createDisplayValueForNightOrderSlot = (slot: NightOrderSlot) =>
  `${slot.startingPosition} ${slot.description}`;

const DoesntWakeSlot: NightOrderSlot = {
  startingPosition: 0,
  description: "Doesn't wake",
};

export const firstNightOrderSlots: Array<NightOrderSlot> = [
  DoesntWakeSlot,
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

export const otherNightOrderSlots: Array<NightOrderSlot> = [
  DoesntWakeSlot,
  { startingPosition: 0, description: "dawn", unselectable: true },
  {
    startingPosition: 1,
    endingPosition: 2,
    description: "Setup Fabled/Lorics",
    characters: ["Duchess", "Toymaker"],
  },
  {
    startingPosition: 3,
    description: "All night abilities",
    characters: ["Wraith"],
  },
  {
    startingPosition: 4,
    endingPosition: 9,
    description: "Travellers",
    characters: [
      "Cacklejack",
      "Barista",
      "Bureaucrat",
      "Thief",
      "Harlot",
      "Bone Collector",
    ],
  },
  {
    startingPosition: 10,
    description: "Additional abilities",
    characters: ["Philosopher"],
  },
  {
    startingPosition: 11,
    description: "Affect Demon/Minion info",
    characters: ["Poppy Grower"],
  },
  {
    startingPosition: 13,
    endingPosition: 14,
    description: "Affect Minions",
    characters: ["Engineer", "Preacher"],
  },
  {
    startingPosition: 15,
    endingPosition: 16,
    description: "Poisoning Minions",
    characters: ["Xaan", "Poisoner"],
  },
  {
    startingPosition: 17,
    endingPosition: 18,
    description: "Townsfolk protection/drunkening",
    characters: ["Sailor", "Courtier", "Innkeeper", "Monk"],
  },
  {
    startingPosition: 20,
    endingPosition: 21,
    description: "Active self-killing Townsfolk",
    characters: ["Gambler", "Acrobat"],
  },
  {
    startingPosition: 24,
    endingPosition: 33,
    description: "Minion info and abilities",
    characters: ["Organ Grinder", "Devil's Advocate", "Witch..."],
  },
  {
    startingPosition: 34,
    description: "Lunatic",
    characters: ["Lunatic"],
  },
  {
    startingPosition: 35,
    endingPosition: 37,
    description: "Affect Demon",
    characters: ["Exorcist", "Lycanthrope", "Princess"],
  },
  {
    startingPosition: 38,
    endingPosition: 54,
    description: "Killing Demons",
    characters: ["Legion", "Imp", "Zombuul", "..."],
  },
  {
    startingPosition: 55,
    endingPosition: 56,
    description: "Killing Minions",
    characters: ["Assassin", "Godfather"],
  },
  {
    startingPosition: 57,
    description: "Passive killing Townsfolk",
    characters: ["Gossip"],
  },
  {
    startingPosition: 64,
    description: "Resurrection",
    characters: ["Professor"],
  },
  {
    startingPosition: 70,
    endingPosition: 72,
    description: "Death on triggers",
    characters: ["Tinker", "Moonchild", "Grandmother"],
  },
  {
    startingPosition: 73,
    endingPosition: 74,
    description: "On-death triggers",
    characters: ["Hatter", "Barber", "Sweetheart", "..."],
  },
  {
    startingPosition: 75,
    endingPosition: 90,
    description: "Townsfolk and Outsider info and abilities",
    characters: ["Pixie", "Huntsman", "Damsel", "..."],
  },
  {
    startingPosition: 92,
    endingPosition: 95,
    description: "Meta info",
    characters: ["High Priestess", "General", "Chambermaid", "Mathematician"],
  },
  {
    startingPosition: 96,
    description: "Effects for the day",
    characters: ["Riot"],
  },
  {
    startingPosition: 97,
    description: "Dawn",
    unselectable: true,
  },
  {
    startingPosition: 98,
    description: "Morning announcements",
    characters: ["Leviathan"],
  },
];
