const TZ_LABEL = new Intl.DateTimeFormat("pt-BR", { timeZoneName: "short" });

/** Rótulo do fuso horário do navegador, ex. "GMT-3". */
export const localTimeZoneLabel = (): string =>
  TZ_LABEL.formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value ?? "";

const dayMonth = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
const dayMonthLong = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long" });
const weekdayShort = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const hourMinute = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });
const fullDateTime = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

/** O pt-BR devolve "08 de mar."; aqui vira "08 mar". */
const strip = (s: string) => s.replace(/\./g, "").replace(/ de (?=[a-zç]{3,4}$)/, " ");

export const formatDayMonth = (d: Date | string): string => strip(dayMonth.format(new Date(d)));

export const formatDayMonthLong = (d: Date | string): string =>
  strip(dayMonthLong.format(new Date(d)));

export const formatWeekday = (d: Date | string): string => {
  const v = strip(weekdayShort.format(new Date(d)));
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const formatTime = (d: Date | string): string => hourMinute.format(new Date(d));

export const formatFullDateTime = (d: Date | string): string =>
  strip(fullDateTime.format(new Date(d)));

/** Intervalo do fim de semana, ex. "06 – 08 mar". */
export const formatRange = (start: Date | string, end: Date | string): string => {
  const a = new Date(start);
  const b = new Date(end);
  const sameMonth = a.getMonth() === b.getMonth();
  const left = sameMonth
    ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(a)
    : formatDayMonth(a);
  return `${left} – ${formatDayMonth(b)}`;
};

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const countdownTo = (target: Date | string, from: Date = new Date()): Countdown => {
  const total = Math.max(0, new Date(target).getTime() - from.getTime());
  const seconds = Math.floor(total / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    total,
  };
};

export const pad = (n: number): string => String(n).padStart(2, "0");

/** Status de chegada vindo da API, traduzido. */
export const translateStatus = (status: string | null): string => {
  if (!status) return "—";
  const map: Record<string, string> = {
    Finished: "Completou",
    Lapped: "A 1 volta ou mais",
    Retired: "Abandonou",
    "Did not start": "Não largou",
    Disqualified: "Desclassificado",
    Accident: "Acidente",
    Collision: "Colisão",
    Engine: "Motor",
    Gearbox: "Câmbio",
    Hydraulics: "Hidráulica",
    Brakes: "Freios",
    Suspension: "Suspensão",
    Electrical: "Elétrica",
    "Power Unit": "Unidade de potência",
  };
  return map[status] ?? status;
};

/** Texto curto mostrado na coluna de tempo da tabela de resultados. */
export const resultTime = (
  positionText: string,
  timeText: string | null,
  status: string | null
): string => {
  if (timeText) return timeText;
  if (positionText === "D") return "DSQ";
  if (status === "Did not start") return "DNS";
  if (status === "Lapped") return "+1 volta";
  return "DNF";
};
