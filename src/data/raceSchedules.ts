export interface RaceSession {
  name: string;
  day: "Sex" | "Sáb" | "Dom";
  time: string;
}

export interface RaceSchedule {
  raceId: number;
  dates: string;
  isSprint: boolean;
  sessions: RaceSession[];
}

export const raceSchedules: RaceSchedule[] = [
  {
    raceId: 1, // Australia
    dates: "06-08 Mar",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "FP2", day: "Sex", time: "16:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 2, // China - Sprint
    dates: "13-15 Mar",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "11:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "15:30" },
      { name: "Sprint", day: "Sáb", time: "11:00" },
      { name: "Qualificação", day: "Sáb", time: "15:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 3, // Japan
    dates: "27-29 Mar",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "11:30" },
      { name: "FP2", day: "Sex", time: "15:00" },
      { name: "FP3", day: "Sáb", time: "11:30" },
      { name: "Qualificação", day: "Sáb", time: "15:00" },
      { name: "Corrida", day: "Dom", time: "14:00" },
    ],
  },
  {
    raceId: 4, // Bahrain
    dates: "10-12 Abr",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "14:30" },
      { name: "FP2", day: "Sex", time: "18:00" },
      { name: "FP3", day: "Sáb", time: "15:30" },
      { name: "Qualificação", day: "Sáb", time: "19:00" },
      { name: "Corrida", day: "Dom", time: "18:00" },
    ],
  },
  {
    raceId: 5, // Saudi Arabia
    dates: "17-19 Abr",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "16:30" },
      { name: "FP2", day: "Sex", time: "20:00" },
      { name: "FP3", day: "Sáb", time: "16:30" },
      { name: "Qualificação", day: "Sáb", time: "20:00" },
      { name: "Corrida", day: "Dom", time: "20:00" },
    ],
  },
  {
    raceId: 6, // Miami - Sprint
    dates: "01-03 Mai",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "16:30" },
      { name: "Sprint", day: "Sáb", time: "12:00" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "16:00" },
    ],
  },
  {
    raceId: 7, // Canada - Sprint
    dates: "22-24 Mai",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "16:30" },
      { name: "Sprint", day: "Sáb", time: "12:00" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "16:00" },
    ],
  },
  {
    raceId: 8, // Monaco
    dates: "05-07 Jun",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 9, // Spain (Barcelona)
    dates: "12-14 Jun",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 10, // Austria
    dates: "26-28 Jun",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 11, // Great Britain - Sprint
    dates: "03-05 Jul",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "16:30" },
      { name: "Sprint", day: "Sáb", time: "12:00" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 12, // Belgium
    dates: "17-19 Jul",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 13, // Hungary
    dates: "24-26 Jul",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 14, // Netherlands - Sprint
    dates: "21-23 Ago",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "16:30" },
      { name: "Sprint", day: "Sáb", time: "12:00" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 15, // Italy
    dates: "04-06 Set",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "FP2", day: "Sex", time: "16:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 16, // Spain (Madrid)
    dates: "11-13 Set",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 17, // Azerbaijan
    dates: "24-26 Set",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "FP2", day: "Sex", time: "16:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 18, // Singapore - Sprint
    dates: "09-11 Out",
    isSprint: true,
    sessions: [
      { name: "FP1", day: "Sex", time: "15:30" },
      { name: "Sprint Qualifying", day: "Sex", time: "19:30" },
      { name: "Sprint", day: "Sáb", time: "17:00" },
      { name: "Qualificação", day: "Sáb", time: "21:00" },
      { name: "Corrida", day: "Dom", time: "20:00" },
    ],
  },
  {
    raceId: 19, // USA (Austin)
    dates: "23-25 Out",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "16:00" },
      { name: "Corrida", day: "Dom", time: "15:00" },
    ],
  },
  {
    raceId: 20, // Mexico
    dates: "30 Out-01 Nov",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "12:30" },
      { name: "FP2", day: "Sex", time: "15:30" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "15:00" },
      { name: "Corrida", day: "Dom", time: "14:00" },
    ],
  },
  {
    raceId: 21, // Brazil
    dates: "06-08 Nov",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "13:30" },
      { name: "FP2", day: "Sex", time: "16:30" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "15:00" },
      { name: "Corrida", day: "Dom", time: "14:00" },
    ],
  },
  {
    raceId: 22, // Las Vegas
    dates: "19-21 Nov",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "16:00" },
      { name: "FP2", day: "Sex", time: "20:00" },
      { name: "FP3", day: "Sáb", time: "17:00" },
      { name: "Qualificação", day: "Sáb", time: "20:00" },
      { name: "Corrida", day: "Dom", time: "20:00" },
    ],
  },
  {
    raceId: 23, // Qatar
    dates: "27-29 Nov",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "14:00" },
      { name: "FP2", day: "Sex", time: "18:00" },
      { name: "FP3", day: "Sáb", time: "15:00" },
      { name: "Qualificação", day: "Sáb", time: "21:00" },
      { name: "Corrida", day: "Dom", time: "19:00" },
    ],
  },
  {
    raceId: 24, // Abu Dhabi
    dates: "04-06 Dez",
    isSprint: false,
    sessions: [
      { name: "FP1", day: "Sex", time: "11:00" },
      { name: "FP2", day: "Sex", time: "17:00" },
      { name: "FP3", day: "Sáb", time: "12:30" },
      { name: "Qualificação", day: "Sáb", time: "18:00" },
      { name: "Corrida", day: "Dom", time: "17:00" },
    ],
  },
];

export const getScheduleForRace = (raceId: number): RaceSchedule | undefined => {
  return raceSchedules.find((s) => s.raceId === raceId);
};
