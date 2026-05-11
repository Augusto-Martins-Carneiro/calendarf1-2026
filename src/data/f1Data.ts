export interface Driver {
  name: string;
  nationality: string;
  countryCode: string;
}

export interface Team {
  name: string;
  color: string;
  drivers: Driver[];
}

export interface Race {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  circuit: string;
  city: string;
  date: string;
  time: string;
  laps: number;
}

export const teams: Team[] = [
  {
    name: "McLaren Mercedes",
    color: "#FF8000",
    drivers: [
      { name: "Lando Norris", nationality: "Britânico", countryCode: "GB" },
      { name: "Oscar Piastri", nationality: "Australiano", countryCode: "AU" },
    ],
  },
  {
    name: "Red Bull Ford",
    color: "#3671C6",
    drivers: [
      { name: "Max Verstappen", nationality: "Holandês", countryCode: "NL" },
      { name: "Isack Hadjar", nationality: "Francês", countryCode: "FR" },
    ],
  },
  {
    name: "Mercedes",
    color: "#27F4D2",
    drivers: [
      { name: "George Russell", nationality: "Britânico", countryCode: "GB" },
      { name: "Kimi Antonelli", nationality: "Italiano", countryCode: "IT" },
    ],
  },
  {
    name: "Ferrari",
    color: "#E8002D",
    drivers: [
      { name: "Charles Leclerc", nationality: "Monegasco", countryCode: "MC" },
      { name: "Lewis Hamilton", nationality: "Britânico", countryCode: "GB" },
    ],
  },
  {
    name: "Aston Martin Honda",
    color: "#229971",
    drivers: [
      { name: "Fernando Alonso", nationality: "Espanhol", countryCode: "ES" },
      { name: "Lance Stroll", nationality: "Canadense", countryCode: "CA" },
    ],
  },
  {
    name: "Williams Mercedes",
    color: "#64C4FF",
    drivers: [
      { name: "Alexander Albon", nationality: "Tailandês", countryCode: "TH" },
      { name: "Carlos Sainz", nationality: "Espanhol", countryCode: "ES" },
    ],
  },
  {
    name: "Audi",
    color: "#C92D4B",
    drivers: [
      { name: "Nico Hulkenberg", nationality: "Alemão", countryCode: "DE" },
      { name: "Gabriel Bortoleto", nationality: "Brasileiro", countryCode: "BR" },
    ],
  },
  {
    name: "Cadillac Ferrari",
    color: "#1E5BC6",
    drivers: [
      { name: "Valtteri Bottas", nationality: "Finlandês", countryCode: "FI" },
      { name: "Sergio Pérez", nationality: "Mexicano", countryCode: "MX" },
    ],
  },
  {
    name: "Haas Ferrari",
    color: "#B6BABD",
    drivers: [
      { name: "Esteban Ocon", nationality: "Francês", countryCode: "FR" },
      { name: "Oliver Bearman", nationality: "Britânico", countryCode: "GB" },
    ],
  },
  {
    name: "Racing Bulls Ford",
    color: "#6692FF",
    drivers: [
      { name: "Liam Lawson", nationality: "Neozelandês", countryCode: "NZ" },
      { name: "Arvid Lindblad", nationality: "Britânico", countryCode: "GB" },
    ],
  },
  {
    name: "Alpine Mercedes",
    color: "#FF87BC",
    drivers: [
      { name: "Pierre Gasly", nationality: "Francês", countryCode: "FR" },
      { name: "Franco Colapinto", nationality: "Argentino", countryCode: "AR" },
    ],
  },
];

export const races: Race[] = [
  {
    id: 1,
    name: "Grande Prêmio da Austrália",
    country: "Austrália",
    countryCode: "AU",
    circuit: "Albert Park Circuit",
    city: "Melbourne",
    date: "8 de Março",
    time: "01:00",
    laps: 58,
  },
  {
    id: 2,
    name: "Grande Prêmio da China",
    country: "China",
    countryCode: "CN",
    circuit: "Shanghai International Circuit",
    city: "Xangai",
    date: "15 de Março",
    time: "04:00",
    laps: 56,
  },
  {
    id: 3,
    name: "Grande Prêmio do Japão",
    country: "Japão",
    countryCode: "JP",
    circuit: "Suzuka International Racing Course",
    city: "Suzuka",
    date: "29 de Março",
    time: "02:00",
    laps: 53,
  },
  {
    id: 4,
    name: "Grande Prêmio do Bahrein",
    country: "Bahrein",
    countryCode: "BH",
    circuit: "Bahrain International Circuit",
    city: "Sakhir",
    date: "12 de Abril",
    time: "12:00",
    laps: 57,
  },
  {
    id: 5,
    name: "Grande Prêmio da Arábia Saudita",
    country: "Arábia Saudita",
    countryCode: "SA",
    circuit: "Jeddah Corniche Circuit",
    city: "Jeddah",
    date: "19 de Abril",
    time: "14:00",
    laps: 50,
  },
  {
    id: 6,
    name: "Grande Prêmio de Miami",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Miami International Autodrome",
    city: "Miami",
    date: "3 de Maio",
    time: "17:00",
    laps: 57,
  },
  {
    id: 7,
    name: "Grande Prêmio do Canadá",
    country: "Canadá",
    countryCode: "CA",
    circuit: "Circuit Gilles-Villeneuve",
    city: "Montreal",
    date: "24 de Maio",
    time: "17:00",
    laps: 70,
  },
  {
    id: 8,
    name: "Grande Prêmio de Mônaco",
    country: "Mônaco",
    countryCode: "MC",
    circuit: "Circuit de Monaco",
    city: "Mônaco",
    date: "7 de Junho",
    time: "10:00",
    laps: 78,
  },
  {
    id: 9,
    name: "Grande Prêmio de Barcelona",
    country: "Espanha",
    countryCode: "ES",
    circuit: "Circuit de Barcelona-Catalunya",
    city: "Barcelona",
    date: "14 de Junho",
    time: "10:00",
    laps: 66,
  },
  {
    id: 10,
    name: "Grande Prêmio da Áustria",
    country: "Áustria",
    countryCode: "AT",
    circuit: "Red Bull Ring",
    city: "Spielberg",
    date: "28 de Junho",
    time: "10:00",
    laps: 71,
  },
  {
    id: 11,
    name: "Grande Prêmio da Grã-Bretanha",
    country: "Grã-Bretanha",
    countryCode: "GB",
    circuit: "Silverstone Circuit",
    city: "Silverstone",
    date: "5 de Julho",
    time: "11:00",
    laps: 52,
  },
  {
    id: 12,
    name: "Grande Prêmio da Bélgica",
    country: "Bélgica",
    countryCode: "BE",
    circuit: "Circuit de Spa-Francorchamps",
    city: "Spa-Francorchamps",
    date: "19 de Julho",
    time: "10:00",
    laps: 44,
  },
  {
    id: 13,
    name: "Grande Prêmio da Hungria",
    country: "Hungria",
    countryCode: "HU",
    circuit: "Hungaroring",
    city: "Budapeste",
    date: "26 de Julho",
    time: "10:00",
    laps: 70,
  },
  {
    id: 14,
    name: "Grande Prêmio da Holanda",
    country: "Holanda",
    countryCode: "NL",
    circuit: "Circuit Zandvoort",
    city: "Zandvoort",
    date: "23 de Agosto",
    time: "10:00",
    laps: 72,
  },
  {
    id: 15,
    name: "Grande Prêmio da Itália",
    country: "Itália",
    countryCode: "IT",
    circuit: "Autodromo Nazionale Monza",
    city: "Monza",
    date: "6 de Setembro",
    time: "10:00",
    laps: 53,
  },
  {
    id: 16,
    name: "Grande Prêmio da Espanha",
    country: "Espanha",
    countryCode: "ES",
    circuit: "Madring",
    city: "Madrid",
    date: "13 de Setembro",
    time: "10:00",
    laps: 57,
  },
  {
    id: 17,
    name: "Grande Prêmio do Azerbaijão",
    country: "Azerbaijão",
    countryCode: "AZ",
    circuit: "Baku City Circuit",
    city: "Baku",
    date: "26 de Setembro",
    time: "08:00",
    laps: 51,
  },
  {
    id: 18,
    name: "Grande Prêmio de Cingapura",
    country: "Cingapura",
    countryCode: "SG",
    circuit: "Marina Bay Street Circuit",
    city: "Cingapura",
    date: "11 de Outubro",
    time: "09:00",
    laps: 62,
  },
  {
    id: 19,
    name: "Grande Prêmio dos Estados Unidos",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Circuit of The Americas",
    city: "Austin",
    date: "25 de Outubro",
    time: "17:00",
    laps: 56,
  },
  {
    id: 20,
    name: "Grande Prêmio do México",
    country: "México",
    countryCode: "MX",
    circuit: "Autodromo Hermanos Rodriguez",
    city: "Cidade do México",
    date: "1 de Novembro",
    time: "17:00",
    laps: 71,
  },
  {
    id: 21,
    name: "Grande Prêmio de São Paulo",
    country: "Brasil",
    countryCode: "BR",
    circuit: "Autodromo Jose Carlos Pace",
    city: "São Paulo",
    date: "8 de Novembro",
    time: "14:00",
    laps: 71,
  },
  {
    id: 22,
    name: "Grande Prêmio de Las Vegas",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Las Vegas Strip Circuit",
    city: "Las Vegas",
    date: "22 de Novembro",
    time: "01:00",
    laps: 50,
  },
  {
    id: 23,
    name: "Grande Prêmio do Qatar",
    country: "Qatar",
    countryCode: "QA",
    circuit: "Lusail International Circuit",
    city: "Doha",
    date: "29 de Novembro",
    time: "13:00",
    laps: 57,
  },
  {
    id: 24,
    name: "Grande Prêmio de Abu Dhabi",
    country: "Emirados Árabes",
    countryCode: "AE",
    circuit: "Yas Marina Circuit",
    city: "Abu Dhabi",
    date: "6 de Dezembro",
    time: "10:00",
    laps: 58,
  },
];

export const getAllDrivers = (): { driver: Driver; team: Team }[] => {
  const allDrivers: { driver: Driver; team: Team }[] = [];
  teams.forEach((team) => {
    team.drivers.forEach((driver) => {
      allDrivers.push({ driver, team });
    });
  });
  return allDrivers;
};
