import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";
import PodiumStrip from "@/components/race/PodiumStrip";
import type { RaceResult } from "@/hooks/useSeason";
import { getRaceStatus, raceStart, weekendStart, type Race } from "@/data/f1Data";
import { formatRange, formatTime } from "@/lib/format";

interface RaceCardProps {
  race: Race;
  podium?: RaceResult[];
}

const STATUS = {
  finished: { label: "Finalizada", className: "bg-secondary text-muted-foreground" },
  live: { label: "Em andamento", className: "bg-primary/15 text-primary" },
  upcoming: { label: "A disputar", className: "bg-foreground/10 text-foreground" },
} as const;

const RaceCard = ({ race, podium }: RaceCardProps) => {
  const status = getRaceStatus(race);
  const badge = STATUS[status];

  return (
    <Link
      to={`/corrida/${race.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-gradient-card transition-colors hover:border-primary/60"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-3 p-4">
        <CountryFlag countryCode={race.countryCode} className="mt-0.5 h-8 w-11" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Rodada {race.round}
            </span>
            {race.isSprint && (
              <span className="inline-flex items-center gap-0.5 rounded bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <Zap className="h-2.5 w-2.5" />
                Sprint
              </span>
            )}
          </div>
          <h3 className="mt-0.5 truncate text-lg font-bold leading-tight text-foreground">
            {race.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{race.circuit}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 px-4 py-2.5 text-xs">
        <span className="font-semibold uppercase tracking-wide text-foreground">
          {formatRange(weekendStart(race), raceStart(race))}
        </span>
        <span className="text-muted-foreground">Largada {formatTime(raceStart(race))}</span>
      </div>

      {podium && podium.length > 0 && (
        <div className="border-t border-border/70 bg-background/40 p-4">
          <PodiumStrip podium={podium} />
        </div>
      )}

      {race.note && (
        <p className="border-t border-border/70 px-4 py-2.5 text-[11px] leading-snug text-muted-foreground">
          {race.note}
        </p>
      )}
    </Link>
  );
};

export default RaceCard;
