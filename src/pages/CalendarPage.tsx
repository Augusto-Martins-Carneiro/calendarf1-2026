import { useState } from "react";
import { Ban } from "lucide-react";
import RaceCard from "@/components/race/RaceCard";
import CountryFlag from "@/components/common/CountryFlag";
import QueryState from "@/components/common/QueryState";
import { usePodiums, groupByRound } from "@/hooks/useSeason";
import { cancelledRaces, completedRounds, getRaceStatus, races } from "@/data/f1Data";
import { formatDayMonthLong } from "@/lib/format";

type Filter = "todas" | "disputadas" | "proximas";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "disputadas", label: "Disputadas" },
  { id: "proximas", label: "A disputar" },
];

const CalendarPage = () => {
  const [filter, setFilter] = useState<Filter>("todas");
  const podiums = usePodiums();
  const byRound = groupByRound(podiums.data);

  const visible = races.filter((r) => {
    if (filter === "todas") return true;
    const finished = getRaceStatus(r) === "finished";
    return filter === "disputadas" ? finished : !finished;
  });

  const done = completedRounds();

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Temporada 2026</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Calendário
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          23 etapas, 6 delas com corrida sprint. {done} já disputadas. Os horários aparecem no fuso
          do seu dispositivo.
        </p>
      </header>

      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <QueryState error={podiums.error as Error | null} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((race) => (
          <RaceCard key={race.round} race={race} podium={byRound.get(race.round)} />
        ))}
      </div>

      {filter !== "proximas" && cancelledRaces.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Fora do calendário
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cancelledRaces.map((race) => (
              <div
                key={race.slug}
                className="rounded-xl border border-dashed border-border bg-card/40 p-4 opacity-80"
              >
                <div className="flex items-start gap-3">
                  <CountryFlag
                    countryCode={race.countryCode}
                    className="mt-0.5 h-8 w-11 grayscale"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1 rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                      <Ban className="h-2.5 w-2.5" />
                      Cancelada
                    </span>
                    <h3 className="mt-1 truncate text-lg font-bold leading-tight text-foreground">
                      {race.name}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">{race.circuit}</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-border/70 pt-3 text-[11px] leading-snug text-muted-foreground">
                  Data original: {formatDayMonthLong(race.originalDate)}. {race.reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CalendarPage;
