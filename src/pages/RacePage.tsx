import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, RotateCcw, Zap } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";
import SessionSchedule from "@/components/race/SessionSchedule";
import ResultsTable from "@/components/race/ResultsTable";
import Countdown from "@/components/home/Countdown";
import QueryState from "@/components/common/QueryState";
import { useRaceResults } from "@/hooks/useSeason";
import {
  getRaceByRound,
  getRaceBySlug,
  getRaceStatus,
  raceStart,
  races,
  weekendStart,
} from "@/data/f1Data";
import { formatRange, formatFullDateTime } from "@/lib/format";

const RacePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const race = slug ? getRaceBySlug(slug) : undefined;
  const results = useRaceResults(race?.round);

  if (!race) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-foreground">Etapa não encontrada</h1>
        <Link to="/calendario" className="mt-4 inline-block text-sm text-primary hover:underline">
          Voltar ao calendário
        </Link>
      </div>
    );
  }

  const status = getRaceStatus(race);
  const previous = getRaceByRound(race.round - 1);
  const next = getRaceByRound(race.round + 1);

  const raceResults = (results.data ?? []).filter((r) => r.session_type === "race");
  const sprintResults = (results.data ?? []).filter((r) => r.session_type === "sprint");
  const fastest = raceResults.find((r) => r.fastest_lap_rank === 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
        {previous ? (
          <Link
            to={`/corrida/${previous.slug}`}
            className="inline-flex min-w-0 items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/corrida/${next.slug}`}
            className="inline-flex min-w-0 items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <span className="truncate">{next.name}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <header className="rounded-xl border border-border bg-gradient-card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Rodada {race.round}
          </span>
          {race.isSprint && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Zap className="h-3 w-3" />
              Fim de semana sprint
            </span>
          )}
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {formatRange(weekendStart(race), raceStart(race))}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <CountryFlag countryCode={race.countryCode} className="h-11 w-16" />
          <h1 className="text-3xl font-black leading-none tracking-tight text-foreground md:text-4xl">
            {race.name}
          </h1>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {race.circuit}, {race.city}
          </span>
          <span className="inline-flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-primary" />
            {race.laps} voltas
          </span>
          <a
            href={`https://www.openstreetmap.org/?mlat=${race.coords[0]}&mlon=${race.coords[1]}#map=14/${race.coords[0]}/${race.coords[1]}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            Ver no mapa
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={race.wikiUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            Wikipédia
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {race.note && (
          <p className="mt-4 rounded-lg border border-border bg-background/50 p-3 text-xs leading-relaxed text-muted-foreground">
            {race.note}
          </p>
        )}

        {status === "upcoming" && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Largada · {formatFullDateTime(raceStart(race))}
            </p>
            <Countdown target={raceStart(race).toISOString()} className="mt-3 flex-wrap" />
          </div>
        )}
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8 lg:order-2">
          <SessionSchedule race={race} />

          {fastest && (
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Volta mais rápida
              </p>
              <p className="mt-2 font-semibold text-foreground">{fastest.driver_name}</p>
              <p className="font-mono text-2xl font-bold text-violet-400">{fastest.fastest_lap}</p>
            </div>
          )}
        </div>

        <div className="space-y-10 lg:order-1">
          <QueryState
            loading={results.isLoading}
            error={results.error as Error | null}
            empty={!results.isLoading && !results.error && raceResults.length === 0}
            emptyLabel={
              status === "finished"
                ? "Resultado ainda não lançado para esta etapa."
                : "Etapa ainda não disputada."
            }
          />

          {sprintResults.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-black uppercase tracking-wide text-foreground">
                <Zap className="h-4 w-4 text-amber-400" />
                Sprint
              </h2>
              <ResultsTable results={sprintResults} compact />
            </section>
          )}

          {raceResults.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-black uppercase tracking-wide text-foreground">
                Resultado da corrida
              </h2>
              <ResultsTable results={raceResults} />
            </section>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/calendario"
          className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          Todas as {races.length} etapas
        </Link>
      </div>
    </div>
  );
};

export default RacePage;
