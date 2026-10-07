#!/usr/bin/env node
/**
 * Gera a migração com os resultados e a classificação da temporada a partir da
 * API Jolpica (sucessora da Ergast).
 *
 *   node scripts/gerar-resultados.mjs
 *
 * O arquivo gerado substitui supabase/migrations/20261006120000_season_2026_full_results.sql.
 * Rode-o depois de cada Grande Prêmio e aplique o SQL no painel do Supabase.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SEASON = 2026;
const API = `https://api.jolpi.ca/ergast/f1/${SEASON}`;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = join(ROOT, "supabase/migrations/20261006120000_season_2026_full_results.sql");

const DRIVER_NAMES = {
  russell: "George Russell",
  antonelli: "Kimi Antonelli",
  leclerc: "Charles Leclerc",
  hamilton: "Lewis Hamilton",
  norris: "Lando Norris",
  piastri: "Oscar Piastri",
  max_verstappen: "Max Verstappen",
  hadjar: "Isack Hadjar",
  lawson: "Liam Lawson",
  lindblad: "Arvid Lindblad",
  gasly: "Pierre Gasly",
  colapinto: "Franco Colapinto",
  ocon: "Esteban Ocon",
  bearman: "Oliver Bearman",
  hulkenberg: "Nico Hulkenberg",
  bortoleto: "Gabriel Bortoleto",
  albon: "Alexander Albon",
  sainz: "Carlos Sainz",
  alonso: "Fernando Alonso",
  stroll: "Lance Stroll",
  bottas: "Valtteri Bottas",
  perez: "Sergio Pérez",
  tsunoda: "Yuki Tsunoda",
};

const TEAM_NAMES = {
  mercedes: "Mercedes",
  ferrari: "Ferrari",
  mclaren: "McLaren Mercedes",
  red_bull: "Red Bull Ford",
  rb: "Racing Bulls Ford",
  alpine: "Alpine Mercedes",
  haas: "Haas Ferrari",
  audi: "Audi",
  williams: "Williams Mercedes",
  aston_martin: "Aston Martin Honda",
  cadillac: "Cadillac Ferrari",
};

/** A API usa ids diferentes dos do app para alguns pilotos. */
const ID_ALIAS = { arvid_lindblad: "lindblad" };
const normId = (id) => ID_ALIAS[id] ?? id;

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v) => (v === null || v === undefined || v === "" ? "null" : Number(v));

const nomePiloto = (id) => {
  const nome = DRIVER_NAMES[id];
  if (!nome) throw new Error(`Piloto desconhecido: ${id}. Adicione-o em DRIVER_NAMES.`);
  return nome;
};

const nomeEquipe = (id) => {
  const nome = TEAM_NAMES[id];
  if (!nome) throw new Error(`Equipe desconhecida: ${id}. Adicione-a em TEAM_NAMES.`);
  return nome;
};

const buscar = async (caminho) => {
  const resposta = await fetch(`${API}${caminho}?format=json&limit=100`);
  if (!resposta.ok) throw new Error(`${caminho} respondeu ${resposta.status}`);
  return (await resposta.json()).MRData;
};

const main = async () => {
  const calendario = (await buscar("/races/")).RaceTable.Races;
  console.log(`Calendário: ${calendario.length} etapas.`);

  const linhas = [];
  const podios = {};
  const podiosEquipe = {};
  const equipeAtual = {};
  let ultimaRodada = 0;

  const registrar = (round, sessao, resultados, ehSprint) => {
    for (const r of resultados) {
      const did = normId(r.Driver.driverId);
      const tid = r.Constructor.constructorId;
      if (!ehSprint) {
        const atual = equipeAtual[did];
        if (!atual || round >= atual.round) equipeAtual[did] = { round, tid };
        if (Number(r.position) <= 3 && r.positionText !== "R") {
          podios[did] = (podios[did] ?? 0) + 1;
          podiosEquipe[tid] = (podiosEquipe[tid] ?? 0) + 1;
        }
      }
      linhas.push(
        `(${round},${q(sessao)},${n(r.position)},${q(r.positionText)},${q(did)},` +
          `${q(nomePiloto(did))},${q(r.Driver.code)},${n(r.number)},${q(tid)},${q(nomeEquipe(tid))},` +
          `${n(r.grid)},${n(r.laps)},${q(r.status)},${q(r.Time?.time ?? null)},` +
          `${q(r.FastestLap?.Time?.time ?? null)},${n(r.FastestLap?.rank ?? null)},${n(r.points)})`
      );
    }
  };

  for (const etapa of calendario) {
    const round = Number(etapa.round);
    const corrida = (await buscar(`/${round}/results/`)).RaceTable.Races[0];
    if (!corrida) break;
    ultimaRodada = round;
    registrar(round, "race", corrida.Results, false);
    console.log(`  rodada ${round}: ${corrida.raceName}`);

    if (etapa.Sprint) {
      const sprint = (await buscar(`/${round}/sprint/`)).RaceTable.Races[0];
      if (sprint?.SprintResults) registrar(round, "sprint", sprint.SprintResults, true);
    }
  }

  const pilotos = (await buscar("/driverstandings/")).StandingsTable.StandingsLists[0];
  const equipes = (await buscar("/constructorstandings/")).StandingsTable.StandingsLists[0];

  const linhasPilotos = pilotos.DriverStandings.map((d) => {
    const did = normId(d.Driver.driverId);
    const tid = equipeAtual[did]?.tid ?? d.Constructors.at(-1).constructorId;
    return (
      `(${n(d.position)},${q(did)},${q(nomePiloto(did))},${q(d.Driver.code)},` +
      `${n(d.Driver.permanentNumber)},${q(tid)},${q(nomeEquipe(tid))},${n(d.points)},` +
      `${n(d.wins)},${n(podios[did] ?? 0)})`
    );
  });

  const linhasEquipes = equipes.ConstructorStandings.map((c) => {
    const tid = c.Constructor.constructorId;
    return (
      `(${n(c.position)},${q(tid)},${q(nomeEquipe(tid))},${n(c.points)},` +
      `${n(c.wins)},${n(podiosEquipe[tid] ?? 0)})`
    );
  });

  const sql = `-- Temporada ${SEASON} da Fórmula 1 — resultados completos e classificação.
-- Dados oficiais até a rodada ${ultimaRodada}.
-- Gerado por scripts/gerar-resultados.mjs a partir de ${API}.
--
-- Esta migração recria as três tabelas de resultados e repopula tudo do zero.
-- É segura de rodar mais de uma vez.

DROP TABLE IF EXISTS public.race_results;
DROP TABLE IF EXISTS public.driver_standings;
DROP TABLE IF EXISTS public.constructor_standings;

CREATE TABLE public.race_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round integer NOT NULL,
  session_type text NOT NULL CHECK (session_type IN ('race','sprint')),
  position integer,
  position_text text NOT NULL,
  driver_id text NOT NULL,
  driver_name text NOT NULL,
  driver_code text,
  driver_number integer,
  team_id text NOT NULL,
  team_name text NOT NULL,
  grid integer,
  laps integer,
  status text,
  time_text text,
  fastest_lap text,
  fastest_lap_rank integer,
  points numeric NOT NULL DEFAULT 0,
  UNIQUE (round, session_type, driver_id)
);

CREATE INDEX race_results_round_idx ON public.race_results (round, session_type, position);

CREATE TABLE public.driver_standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL,
  driver_id text NOT NULL UNIQUE,
  driver_name text NOT NULL,
  driver_code text,
  driver_number integer,
  team_id text NOT NULL,
  team_name text NOT NULL,
  points numeric NOT NULL DEFAULT 0,
  wins integer NOT NULL DEFAULT 0,
  podiums integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.constructor_standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL,
  team_id text NOT NULL UNIQUE,
  team_name text NOT NULL,
  points numeric NOT NULL DEFAULT 0,
  wins integer NOT NULL DEFAULT 0,
  podiums integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.race_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constructor_standings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read race results"
  ON public.race_results FOR SELECT USING (true);
CREATE POLICY "Public can read driver standings"
  ON public.driver_standings FOR SELECT USING (true);
CREATE POLICY "Public can read constructor standings"
  ON public.constructor_standings FOR SELECT USING (true);

INSERT INTO public.race_results
  (round, session_type, position, position_text, driver_id, driver_name, driver_code,
   driver_number, team_id, team_name, grid, laps, status, time_text, fastest_lap,
   fastest_lap_rank, points)
VALUES
${linhas.join(",\n")};

INSERT INTO public.driver_standings
  (position, driver_id, driver_name, driver_code, driver_number, team_id, team_name, points, wins, podiums)
VALUES
${linhasPilotos.join(",\n")};

INSERT INTO public.constructor_standings
  (position, team_id, team_name, points, wins, podiums)
VALUES
${linhasEquipes.join(",\n")};
`;

  writeFileSync(DESTINO, sql);
  console.log(
    `\n${linhas.length} resultados, ${linhasPilotos.length} pilotos e ${linhasEquipes.length} equipes.`
  );
  console.log(`Arquivo gravado em ${DESTINO}`);
  console.log("Cole o conteúdo no SQL Editor do Supabase para aplicar.");
};

main().catch((erro) => {
  console.error("Falhou:", erro.message);
  process.exit(1);
});
