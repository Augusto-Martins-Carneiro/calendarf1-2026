import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type RaceResult = Omit<Database["public"]["Tables"]["race_results"]["Row"], "id">;
export type DriverStanding = Omit<
  Database["public"]["Tables"]["driver_standings"]["Row"],
  "id" | "updated_at"
>;
export type ConstructorStanding = Omit<
  Database["public"]["Tables"]["constructor_standings"]["Row"],
  "id" | "updated_at"
>;

const RESULT_COLUMNS =
  "round, session_type, position, position_text, driver_id, driver_name, driver_code, driver_number, team_id, team_name, grid, laps, status, time_text, fastest_lap, fastest_lap_rank, points";

const DRIVER_STANDING_COLUMNS =
  "position, driver_id, driver_name, driver_code, driver_number, team_id, team_name, points, wins, podiums";

const CONSTRUCTOR_STANDING_COLUMNS =
  "position, team_id, team_name, points, wins, podiums";

/** Erro amigável quando o banco ainda está no esquema antigo. */
const describe = (message: string): Error =>
  new Error(
    /column|does not exist|schema cache/i.test(message)
      ? "O banco ainda não recebeu a migração da temporada 2026. Rode supabase/migrations/20261006120000_season_2026_full_results.sql no painel do Supabase."
      : message
  );

export const useDriverStandings = () =>
  useQuery({
    queryKey: ["driver-standings"],
    queryFn: async (): Promise<DriverStanding[]> => {
      const { data, error } = await supabase
        .from("driver_standings")
        .select(DRIVER_STANDING_COLUMNS)
        .order("position", { ascending: true });
      if (error) throw describe(error.message);
      return data ?? [];
    },
  });

export const useConstructorStandings = () =>
  useQuery({
    queryKey: ["constructor-standings"],
    queryFn: async (): Promise<ConstructorStanding[]> => {
      const { data, error } = await supabase
        .from("constructor_standings")
        .select(CONSTRUCTOR_STANDING_COLUMNS)
        .order("position", { ascending: true });
      if (error) throw describe(error.message);
      return data ?? [];
    },
  });

/** Resultado completo de uma etapa (corrida e, quando houver, sprint). */
export const useRaceResults = (round: number | undefined) =>
  useQuery({
    queryKey: ["race-results", round],
    enabled: typeof round === "number",
    queryFn: async (): Promise<RaceResult[]> => {
      const { data, error } = await supabase
        .from("race_results")
        .select(RESULT_COLUMNS)
        .eq("round", round as number)
        .order("position", { ascending: true });
      if (error) throw describe(error.message);
      return (data ?? []) as RaceResult[];
    },
  });

/** Pódios de todas as etapas já disputadas, para o calendário e a home. */
export const usePodiums = () =>
  useQuery({
    queryKey: ["podiums"],
    queryFn: async (): Promise<RaceResult[]> => {
      const { data, error } = await supabase
        .from("race_results")
        .select(RESULT_COLUMNS)
        .eq("session_type", "race")
        .lte("position", 3)
        .order("round", { ascending: true })
        .order("position", { ascending: true });
      if (error) throw describe(error.message);
      return (data ?? []) as RaceResult[];
    },
  });

/** Agrupa uma lista de resultados por etapa. */
export const groupByRound = (results: RaceResult[] | undefined) => {
  const map = new Map<number, RaceResult[]>();
  (results ?? []).forEach((r) => {
    const list = map.get(r.round) ?? [];
    list.push(r);
    map.set(r.round, list);
  });
  return map;
};

/** Última etapa com resultado lançado. */
export const latestRoundWithResults = (results: RaceResult[] | undefined): number =>
  (results ?? []).reduce((max, r) => Math.max(max, r.round), 0);
