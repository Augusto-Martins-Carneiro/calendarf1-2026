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

// Corridas canceladas em 2026
export const cancelledRaces: number[] = [4, 5]; // Bahrein, Arábia Saudita (Jeddah)

export const isRaceCancelled = (raceId: number): boolean =>
  cancelledRaces.includes(raceId);

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
  {
    raceId: 6, // Miami (Sprint Weekend)
    sprint: [
      { position: 1, driver: "Lando Norris", team: "McLaren Mercedes" },
      { position: 2, driver: "Oscar Piastri", team: "McLaren Mercedes" },
      { position: 3, driver: "Charles Leclerc", team: "Ferrari" },
    ],
    race: [
      { position: 1, driver: "Kimi Antonelli", team: "Mercedes" },
      { position: 2, driver: "Lando Norris", team: "McLaren Mercedes" },
      { position: 3, driver: "Oscar Piastri", team: "McLaren Mercedes" },
    ],
  },
  {
    raceId: 7, // Canadá
    race: [
      { position: 1, driver: "Kimi Antonelli", team: "Mercedes" },
      { position: 2, driver: "Lewis Hamilton", team: "Ferrari" },
      { position: 3, driver: "Max Verstappen", team: "Red Bull Ford" },
    ],
  },
];

export const getPodiumForRace = (raceId: number): RacePodium | undefined =>
  racePodiums.find((p) => p.raceId === raceId);
