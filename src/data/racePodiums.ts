export interface PodiumEntry {
  position: 1 | 2 | 3;
  driver: string;
  team: string;
}

export interface RacePodium {
  raceId: number;
  race?: PodiumEntry[];
  sprint?: PodiumEntry[];
}

// Resultados oficiais 2026
export const racePodiums: RacePodium[] = [
  {
    raceId: 1, // Austrália
    race: [
      { position: 1, driver: "George Russell", team: "Mercedes" },
      { position: 2, driver: "Kimi Antonelli", team: "Mercedes" },
      { position: 3, driver: "Charles Leclerc", team: "Ferrari" },
    ],
  },
  {
    raceId: 2, // China (Sprint Weekend)
    sprint: [
      { position: 1, driver: "George Russell", team: "Mercedes" },
      { position: 2, driver: "Charles Leclerc", team: "Ferrari" },
      { position: 3, driver: "Lewis Hamilton", team: "Ferrari" },
    ],
    race: [
      { position: 1, driver: "Kimi Antonelli", team: "Mercedes" },
      { position: 2, driver: "George Russell", team: "Mercedes" },
      { position: 3, driver: "Lewis Hamilton", team: "Ferrari" },
    ],
  },
  {
    raceId: 3, // Japão
    race: [
      { position: 1, driver: "Kimi Antonelli", team: "Mercedes" },
      { position: 2, driver: "Oscar Piastri", team: "McLaren Mercedes" },
      { position: 3, driver: "Charles Leclerc", team: "Ferrari" },
    ],
  },
];

export const getPodiumForRace = (raceId: number): RacePodium | undefined =>
  racePodiums.find((p) => p.raceId === raceId);
