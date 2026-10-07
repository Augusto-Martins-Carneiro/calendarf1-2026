export type SessionKind = "fp1" | "fp2" | "fp3" | "sq" | "sprint" | "quali" | "race";

export interface Session {
  kind: SessionKind;
  label: string;
  /** Início da sessão em UTC (ISO 8601). */
  start: string;
}

export interface Driver {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  code: string;
  number: number;
  nationality: string;
  countryCode: string;
  teamId: string;
}

export interface Team {
  id: string;
  /** Nome curto, usado em cards e tabelas. */
  name: string;
  /** Nome completo de inscrição na temporada. */
  fullName: string;
  abbr: string;
  color: string;
  engine: string;
  base: string;
  driverIds: string[];
}

export interface Race {
  round: number;
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  circuit: string;
  city: string;
  coords: [number, number];
  laps: number;
  isSprint: boolean;
  note?: string;
  wikiUrl: string;
  sessions: Session[];
}

export interface CancelledRace {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  circuit: string;
  city: string;
  originalDate: string;
  reason: string;
}

export const teams: Team[] = [
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes",
    abbr: "MER",
    color: "#27F4D2",
    engine: "Mercedes",
    base: "Brackley, Reino Unido",
    driverIds: ["russell", "antonelli"],
  },
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Ferrari",
    abbr: "FER",
    color: "#E8002D",
    engine: "Ferrari",
    base: "Maranello, Itália",
    driverIds: ["leclerc", "hamilton"],
  },
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren Mercedes",
    abbr: "MCL",
    color: "#FF8000",
    engine: "Mercedes",
    base: "Woking, Reino Unido",
    driverIds: ["norris", "piastri"],
  },
  {
    id: "red_bull",
    name: "Red Bull",
    fullName: "Red Bull Ford",
    abbr: "RBR",
    color: "#3671C6",
    engine: "Red Bull Ford Powertrains",
    base: "Milton Keynes, Reino Unido",
    driverIds: ["max_verstappen", "hadjar"],
  },
  {
    id: "rb",
    name: "Racing Bulls",
    fullName: "Racing Bulls Ford",
    abbr: "RB",
    color: "#6692FF",
    engine: "Red Bull Ford Powertrains",
    base: "Faenza, Itália",
    driverIds: ["lawson", "lindblad"],
  },
  {
    id: "alpine",
    name: "Alpine",
    fullName: "Alpine Mercedes",
    abbr: "ALP",
    color: "#FF87BC",
    engine: "Mercedes",
    base: "Enstone, Reino Unido",
    driverIds: ["gasly", "colapinto"],
  },
  {
    id: "haas",
    name: "Haas",
    fullName: "Haas Ferrari",
    abbr: "HAA",
    color: "#B6BABD",
    engine: "Ferrari",
    base: "Kannapolis, Estados Unidos",
    driverIds: ["ocon", "bearman"],
  },
  {
    id: "audi",
    name: "Audi",
    fullName: "Audi",
    abbr: "AUD",
    color: "#C92D4B",
    engine: "Audi",
    base: "Hinwil, Suíça",
    driverIds: ["hulkenberg", "bortoleto"],
  },
  {
    id: "williams",
    name: "Williams",
    fullName: "Williams Mercedes",
    abbr: "WIL",
    color: "#64C4FF",
    engine: "Mercedes",
    base: "Grove, Reino Unido",
    driverIds: ["albon", "sainz"],
  },
  {
    id: "aston_martin",
    name: "Aston Martin",
    fullName: "Aston Martin Honda",
    abbr: "AMR",
    color: "#229971",
    engine: "Honda",
    base: "Silverstone, Reino Unido",
    driverIds: ["alonso", "stroll"],
  },
  {
    id: "cadillac",
    name: "Cadillac",
    fullName: "Cadillac Ferrari",
    abbr: "CAD",
    color: "#1E5BC6",
    engine: "Ferrari",
    base: "Indianápolis, Estados Unidos",
    driverIds: ["bottas", "perez"],
  },
];

export const drivers: Driver[] = [
  { id: "russell", name: "George Russell", firstName: "George", lastName: "Russell", code: "RUS", number: 63, nationality: "Britânico", countryCode: "GB", teamId: "mercedes" },
  { id: "antonelli", name: "Kimi Antonelli", firstName: "Kimi", lastName: "Antonelli", code: "ANT", number: 12, nationality: "Italiano", countryCode: "IT", teamId: "mercedes" },
  { id: "leclerc", name: "Charles Leclerc", firstName: "Charles", lastName: "Leclerc", code: "LEC", number: 16, nationality: "Monegasco", countryCode: "MC", teamId: "ferrari" },
  { id: "hamilton", name: "Lewis Hamilton", firstName: "Lewis", lastName: "Hamilton", code: "HAM", number: 44, nationality: "Britânico", countryCode: "GB", teamId: "ferrari" },
  { id: "norris", name: "Lando Norris", firstName: "Lando", lastName: "Norris", code: "NOR", number: 1, nationality: "Britânico", countryCode: "GB", teamId: "mclaren" },
  { id: "piastri", name: "Oscar Piastri", firstName: "Oscar", lastName: "Piastri", code: "PIA", number: 81, nationality: "Australiano", countryCode: "AU", teamId: "mclaren" },
  { id: "max_verstappen", name: "Max Verstappen", firstName: "Max", lastName: "Verstappen", code: "VER", number: 3, nationality: "Holandês", countryCode: "NL", teamId: "red_bull" },
  { id: "hadjar", name: "Isack Hadjar", firstName: "Isack", lastName: "Hadjar", code: "HAD", number: 6, nationality: "Francês", countryCode: "FR", teamId: "red_bull" },
  { id: "lawson", name: "Liam Lawson", firstName: "Liam", lastName: "Lawson", code: "LAW", number: 30, nationality: "Neozelandês", countryCode: "NZ", teamId: "rb" },
  { id: "lindblad", name: "Arvid Lindblad", firstName: "Arvid", lastName: "Lindblad", code: "LIN", number: 41, nationality: "Britânico", countryCode: "GB", teamId: "rb" },
  { id: "gasly", name: "Pierre Gasly", firstName: "Pierre", lastName: "Gasly", code: "GAS", number: 10, nationality: "Francês", countryCode: "FR", teamId: "alpine" },
  { id: "colapinto", name: "Franco Colapinto", firstName: "Franco", lastName: "Colapinto", code: "COL", number: 43, nationality: "Argentino", countryCode: "AR", teamId: "alpine" },
  { id: "ocon", name: "Esteban Ocon", firstName: "Esteban", lastName: "Ocon", code: "OCO", number: 31, nationality: "Francês", countryCode: "FR", teamId: "haas" },
  { id: "bearman", name: "Oliver Bearman", firstName: "Oliver", lastName: "Bearman", code: "BEA", number: 87, nationality: "Britânico", countryCode: "GB", teamId: "haas" },
  { id: "hulkenberg", name: "Nico Hulkenberg", firstName: "Nico", lastName: "Hulkenberg", code: "HUL", number: 27, nationality: "Alemão", countryCode: "DE", teamId: "audi" },
  { id: "bortoleto", name: "Gabriel Bortoleto", firstName: "Gabriel", lastName: "Bortoleto", code: "BOR", number: 5, nationality: "Brasileiro", countryCode: "BR", teamId: "audi" },
  { id: "albon", name: "Alexander Albon", firstName: "Alexander", lastName: "Albon", code: "ALB", number: 23, nationality: "Tailandês", countryCode: "TH", teamId: "williams" },
  { id: "sainz", name: "Carlos Sainz", firstName: "Carlos", lastName: "Sainz", code: "SAI", number: 55, nationality: "Espanhol", countryCode: "ES", teamId: "williams" },
  { id: "alonso", name: "Fernando Alonso", firstName: "Fernando", lastName: "Alonso", code: "ALO", number: 14, nationality: "Espanhol", countryCode: "ES", teamId: "aston_martin" },
  { id: "stroll", name: "Lance Stroll", firstName: "Lance", lastName: "Stroll", code: "STR", number: 18, nationality: "Canadense", countryCode: "CA", teamId: "aston_martin" },
  { id: "bottas", name: "Valtteri Bottas", firstName: "Valtteri", lastName: "Bottas", code: "BOT", number: 77, nationality: "Finlandês", countryCode: "FI", teamId: "cadillac" },
  { id: "perez", name: "Sergio Pérez", firstName: "Sergio", lastName: "Pérez", code: "PER", number: 11, nationality: "Mexicano", countryCode: "MX", teamId: "cadillac" },
  { id: "tsunoda", name: "Yuki Tsunoda", firstName: "Yuki", lastName: "Tsunoda", code: "TSU", number: 22, nationality: "Japonês", countryCode: "JP", teamId: "rb" },
];

/** Etapas que saíram do calendário depois do anúncio original. */
export const cancelledRaces: CancelledRace[] = [
  {
    slug: "arabia-saudita",
    name: "GP da Arábia Saudita",
    country: "Arábia Saudita",
    countryCode: "SA",
    circuit: "Circuito Urbano de Jeddah",
    city: "Jeddah",
    originalDate: "2026-04-19",
    reason: "Etapa cancelada após a eclosão da guerra no Irã. Jeddah volta ao calendário em 2027.",
  },
];

export const races: Race[] = [
  {
    round: 1,
    slug: "australia",
    name: "GP da Austrália",
    country: "Austrália",
    countryCode: "AU",
    circuit: "Albert Park",
    city: "Melbourne",
    coords: [-37.8497, 144.968],
    laps: 58,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Australian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-03-06T01:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-03-06T05:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-03-07T01:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-03-07T05:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-03-08T04:00:00Z" },
    ],
  },
  {
    round: 2,
    slug: "china",
    name: "GP da China",
    country: "China",
    countryCode: "CN",
    circuit: "Circuito Internacional de Xangai",
    city: "Xangai",
    coords: [31.3389, 121.22],
    laps: 56,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Chinese_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-03-13T03:30:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-03-13T07:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-03-14T03:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-03-14T07:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-03-15T07:00:00Z" },
    ],
  },
  {
    round: 3,
    slug: "japao",
    name: "GP do Japão",
    country: "Japão",
    countryCode: "JP",
    circuit: "Circuito de Suzuka",
    city: "Suzuka",
    coords: [34.8431, 136.541],
    laps: 53,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Japanese_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-03-27T02:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-03-27T06:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-03-28T02:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-03-28T06:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-03-29T05:00:00Z" },
    ],
  },
  {
    round: 4,
    slug: "miami",
    name: "GP de Miami",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Miami International Autodrome",
    city: "Miami",
    coords: [25.9581, -80.2389],
    laps: 57,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Miami_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-05-01T16:00:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-05-01T20:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-05-02T16:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-05-02T20:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-05-03T20:00:00Z" },
    ],
  },
  {
    round: 5,
    slug: "canada",
    name: "GP do Canadá",
    country: "Canadá",
    countryCode: "CA",
    circuit: "Circuito Gilles-Villeneuve",
    city: "Montreal",
    coords: [45.5, -73.5228],
    laps: 68,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Canadian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-05-22T16:30:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-05-22T20:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-05-23T16:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-05-23T20:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-05-24T20:00:00Z" },
    ],
  },
  {
    round: 6,
    slug: "monaco",
    name: "GP de Mônaco",
    country: "Mônaco",
    countryCode: "MC",
    circuit: "Circuito de Mônaco",
    city: "Monte Carlo",
    coords: [43.7347, 7.42056],
    laps: 78,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Monaco_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-06-05T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-06-05T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-06-06T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-06-06T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-06-07T13:00:00Z" },
    ],
  },
  {
    round: 7,
    slug: "barcelona",
    name: "GP de Barcelona",
    country: "Espanha",
    countryCode: "ES",
    circuit: "Circuito de Barcelona-Catalunya",
    city: "Barcelona",
    coords: [41.57, 2.26111],
    laps: 66,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Barcelona-Catalunya",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-06-12T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-06-12T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-06-13T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-06-13T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-06-14T13:00:00Z" },
    ],
  },
  {
    round: 8,
    slug: "austria",
    name: "GP da Áustria",
    country: "Áustria",
    countryCode: "AT",
    circuit: "Red Bull Ring",
    city: "Spielberg",
    coords: [47.2197, 14.7647],
    laps: 71,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Austrian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-06-26T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-06-26T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-06-27T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-06-27T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-06-28T13:00:00Z" },
    ],
  },
  {
    round: 9,
    slug: "gra-bretanha",
    name: "GP da Grã-Bretanha",
    country: "Grã-Bretanha",
    countryCode: "GB",
    circuit: "Circuito de Silverstone",
    city: "Silverstone",
    coords: [52.0786, -1.01694],
    laps: 52,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_British_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-07-03T11:30:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-07-03T15:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-07-04T11:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-07-04T15:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-07-05T14:00:00Z" },
    ],
  },
  {
    round: 10,
    slug: "belgica",
    name: "GP da Bélgica",
    country: "Bélgica",
    countryCode: "BE",
    circuit: "Circuito de Spa-Francorchamps",
    city: "Spa-Francorchamps",
    coords: [50.4372, 5.97139],
    laps: 44,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Belgian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-07-17T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-07-17T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-07-18T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-07-18T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-07-19T13:00:00Z" },
    ],
  },
  {
    round: 11,
    slug: "hungria",
    name: "GP da Hungria",
    country: "Hungria",
    countryCode: "HU",
    circuit: "Hungaroring",
    city: "Budapeste",
    coords: [47.5789, 19.2486],
    laps: 70,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Hungarian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-07-24T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-07-24T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-07-25T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-07-25T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-07-26T13:00:00Z" },
    ],
  },
  {
    round: 12,
    slug: "holanda",
    name: "GP da Holanda",
    country: "Holanda",
    countryCode: "NL",
    circuit: "Circuito de Zandvoort",
    city: "Zandvoort",
    coords: [52.3888, 4.54092],
    laps: 72,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Dutch_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-08-21T10:30:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-08-21T14:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-08-22T10:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-08-22T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-08-23T13:00:00Z" },
    ],
  },
  {
    round: 13,
    slug: "italia",
    name: "GP da Itália",
    country: "Itália",
    countryCode: "IT",
    circuit: "Autódromo Nacional de Monza",
    city: "Monza",
    coords: [45.6156, 9.28111],
    laps: 53,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Italian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-09-04T10:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-09-04T14:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-09-05T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-09-05T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-09-06T13:00:00Z" },
    ],
  },
  {
    round: 14,
    slug: "espanha",
    name: "GP da Espanha",
    country: "Espanha",
    countryCode: "ES",
    circuit: "Madring",
    city: "Madri",
    coords: [40.46528, -3.61528],
    laps: 57,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Spanish_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-09-11T11:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-09-11T15:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-09-12T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-09-12T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-09-13T13:00:00Z" },
    ],
  },
  {
    round: 15,
    slug: "azerbaijao",
    name: "GP do Azerbaijão",
    country: "Azerbaijão",
    countryCode: "AZ",
    circuit: "Circuito Urbano de Baku",
    city: "Baku",
    coords: [40.3725, 49.8533],
    laps: 51,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Azerbaijan_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-09-24T08:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-09-24T12:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-09-25T08:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-09-25T12:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-09-26T11:00:00Z" },
    ],
  },
  {
    round: 16,
    slug: "bahrein",
    name: "GP do Bahrein",
    country: "Malásia",
    countryCode: "MY",
    circuit: "Circuito Internacional de Sepang",
    city: "Sepang",
    coords: [2.76083, 101.738],
    laps: 55,
    isSprint: false,
    note: "Realizado em Sepang, na Malásia, após a remarcação da etapa de abril.",
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Bahrain_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-10-02T04:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-10-02T08:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-10-03T04:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-10-03T08:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-10-04T07:00:00Z" },
    ],
  },
  {
    round: 17,
    slug: "cingapura",
    name: "GP de Cingapura",
    country: "Cingapura",
    countryCode: "SG",
    circuit: "Circuito de Marina Bay",
    city: "Marina Bay",
    coords: [1.2914, 103.864],
    laps: 62,
    isSprint: true,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Singapore_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-10-09T08:30:00Z" },
      { kind: "sq", label: "Classificação Sprint", start: "2026-10-09T12:30:00Z" },
      { kind: "sprint", label: "Sprint", start: "2026-10-10T09:00:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-10-10T13:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-10-11T12:00:00Z" },
    ],
  },
  {
    round: 18,
    slug: "estados-unidos",
    name: "GP dos Estados Unidos",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Circuit of The Americas",
    city: "Austin",
    coords: [30.1328, -97.6411],
    laps: 56,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_United_States_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-10-23T17:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-10-23T21:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-10-24T17:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-10-24T21:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-10-25T20:00:00Z" },
    ],
  },
  {
    round: 19,
    slug: "mexico",
    name: "GP do México",
    country: "México",
    countryCode: "MX",
    circuit: "Autódromo Hermanos Rodríguez",
    city: "Cidade do México",
    coords: [19.4042, -99.0907],
    laps: 71,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Mexico_City_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-10-30T18:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-10-30T22:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-10-31T17:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-10-31T21:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-11-01T20:00:00Z" },
    ],
  },
  {
    round: 20,
    slug: "sao-paulo",
    name: "GP de São Paulo",
    country: "Brasil",
    countryCode: "BR",
    circuit: "Autódromo José Carlos Pace",
    city: "São Paulo",
    coords: [-23.7036, -46.6997],
    laps: 71,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Brazilian_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-11-06T15:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-11-06T19:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-11-07T14:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-11-07T18:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-11-08T17:00:00Z" },
    ],
  },
  {
    round: 21,
    slug: "las-vegas",
    name: "GP de Las Vegas",
    country: "Estados Unidos",
    countryCode: "US",
    circuit: "Las Vegas Strip Circuit",
    city: "Las Vegas",
    coords: [36.1147, -115.173],
    laps: 50,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Las_Vegas_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-11-20T00:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-11-20T04:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-11-21T00:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-11-21T04:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-11-22T04:00:00Z" },
    ],
  },
  {
    round: 22,
    slug: "catar",
    name: "GP do Catar",
    country: "Catar",
    countryCode: "QA",
    circuit: "Circuito Internacional de Lusail",
    city: "Lusail",
    coords: [25.49, 51.4542],
    laps: 57,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Qatar_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-11-27T13:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-11-27T17:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-11-28T14:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-11-28T18:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-11-29T16:00:00Z" },
    ],
  },
  {
    round: 23,
    slug: "abu-dhabi",
    name: "GP de Abu Dhabi",
    country: "Emirados Árabes",
    countryCode: "AE",
    circuit: "Circuito de Yas Marina",
    city: "Abu Dhabi",
    coords: [24.4672, 54.6031],
    laps: 58,
    isSprint: false,
    wikiUrl: "https://en.wikipedia.org/wiki/2026_Abu_Dhabi_Grand_Prix",
    sessions: [
      { kind: "fp1", label: "Treino Livre 1", start: "2026-12-04T09:30:00Z" },
      { kind: "fp2", label: "Treino Livre 2", start: "2026-12-04T13:00:00Z" },
      { kind: "fp3", label: "Treino Livre 3", start: "2026-12-05T10:30:00Z" },
      { kind: "quali", label: "Classificação", start: "2026-12-05T14:00:00Z" },
      { kind: "race", label: "Corrida", start: "2026-12-06T13:00:00Z" },
    ],
  },
];

const teamIndex = new Map(teams.map((t) => [t.id, t]));
const driverIndex = new Map(drivers.map((d) => [d.id, d]));

export const getTeam = (teamId: string): Team | undefined => teamIndex.get(teamId);

export const getDriver = (driverId: string): Driver | undefined => driverIndex.get(driverId);

export const getTeamDrivers = (teamId: string): Driver[] => {
  const team = teamIndex.get(teamId);
  if (!team) return [];
  return team.driverIds.map((id) => driverIndex.get(id)).filter((d): d is Driver => !!d);
};

export const teamColor = (teamId: string): string => teamIndex.get(teamId)?.color ?? "#8E8E93";

export const getRaceByRound = (round: number): Race | undefined =>
  races.find((r) => r.round === round);

export const getRaceBySlug = (slug: string): Race | undefined =>
  races.find((r) => r.slug === slug);

const raceSession = (race: Race): Session =>
  race.sessions.find((s) => s.kind === "race") ?? race.sessions[race.sessions.length - 1];

export const raceStart = (race: Race): Date => new Date(raceSession(race).start);

export const weekendStart = (race: Race): Date => new Date(race.sessions[0].start);

export type RaceStatus = "finished" | "live" | "upcoming";

/** Uma corrida é considerada em andamento até 3h depois da largada. */
const RACE_WINDOW_MS = 3 * 60 * 60 * 1000;

export const getRaceStatus = (race: Race, now: Date = new Date()): RaceStatus => {
  const start = raceStart(race).getTime();
  const t = now.getTime();
  if (t < start) return "upcoming";
  if (t < start + RACE_WINDOW_MS) return "live";
  return "finished";
};

export const getNextRace = (now: Date = new Date()): Race | undefined =>
  races.find((r) => getRaceStatus(r, now) !== "finished");

export const getLastCompletedRace = (now: Date = new Date()): Race | undefined =>
  [...races].reverse().find((r) => getRaceStatus(r, now) === "finished");

export const getNextSession = (
  now: Date = new Date()
): { race: Race; session: Session } | undefined => {
  const t = now.getTime();
  for (const race of races) {
    for (const session of race.sessions) {
      if (new Date(session.start).getTime() > t) return { race, session };
    }
  }
  return undefined;
};

export const completedRounds = (now: Date = new Date()): number =>
  races.filter((r) => getRaceStatus(r, now) === "finished").length;
