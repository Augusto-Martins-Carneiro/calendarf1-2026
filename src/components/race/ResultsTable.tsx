import { Link } from "react-router-dom";
import { Timer } from "lucide-react";
import DriverAvatar from "@/components/common/DriverAvatar";
import type { RaceResult } from "@/hooks/useSeason";
import { teamColor } from "@/data/f1Data";
import { resultTime, translateStatus } from "@/lib/format";

interface ResultsTableProps {
  results: RaceResult[];
  /** Esconde grid e voltas em telas estreitas quando for sprint. */
  compact?: boolean;
}

const positionLabel = (r: RaceResult) => {
  if (r.position_text === "R") return "NC";
  if (r.position_text === "D") return "DSQ";
  if (r.position_text === "W") return "WD";
  return String(r.position ?? r.position_text);
};

const ResultsTable = ({ results, compact = false }: ResultsTableProps) => (
  <div className="overflow-hidden rounded-xl border border-border bg-card">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-secondary/40 text-[11px] uppercase tracking-widest text-muted-foreground">
          <th className="w-12 px-3 py-2.5 text-left font-bold">Pos</th>
          <th className="px-3 py-2.5 text-left font-bold">Piloto</th>
          {!compact && (
            <th className="hidden w-16 px-3 py-2.5 text-center font-bold sm:table-cell">Grid</th>
          )}
          <th className="hidden w-16 px-3 py-2.5 text-center font-bold md:table-cell">Voltas</th>
          <th className="w-28 px-3 py-2.5 text-right font-bold md:w-36">Tempo</th>
          <th className="w-12 px-3 py-2.5 text-right font-bold">Pts</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => {
          const color = teamColor(r.team_id);
          const fastest = r.fastest_lap_rank === 1;
          return (
            <tr
              key={r.driver_id}
              className="border-t border-border/70 transition-colors hover:bg-secondary/25"
            >
              <td className="px-3 py-2">
                <span className="font-bold tabular-nums text-foreground">{positionLabel(r)}</span>
              </td>
              <td className="px-3 py-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-8 w-[3px] shrink-0 rounded-full" style={{ background: color }} />
                  <DriverAvatar
                    driverId={r.driver_id}
                    name={r.driver_name}
                    color={color}
                    size={34}
                  />
                  <div className="min-w-0">
                    <Link
                      to={`/pilotos#${r.driver_id}`}
                      className="block truncate font-semibold text-foreground hover:text-primary"
                    >
                      {r.driver_name}
                      {fastest && (
                        <Timer
                          className="ml-1.5 inline h-3.5 w-3.5 text-violet-400"
                          aria-label="Volta mais rápida"
                        />
                      )}
                    </Link>
                    <p className="truncate text-xs" style={{ color }}>
                      {r.team_name}
                    </p>
                  </div>
                </div>
              </td>
              {!compact && (
                <td className="hidden px-3 py-2 text-center tabular-nums text-muted-foreground sm:table-cell">
                  {r.grid === 0 ? "PIT" : r.grid ?? "—"}
                </td>
              )}
              <td className="hidden px-3 py-2 text-center tabular-nums text-muted-foreground md:table-cell">
                {r.laps ?? "—"}
              </td>
              <td className="px-3 py-2 text-right">
                <span className="font-mono text-xs tabular-nums text-foreground">
                  {resultTime(r.position_text, r.time_text, r.status)}
                </span>
                {!r.time_text && (
                  <span className="block text-[10px] text-muted-foreground">
                    {translateStatus(r.status)}
                  </span>
                )}
              </td>
              <td className="px-3 py-2 text-right font-bold tabular-nums text-foreground">
                {Number(r.points) > 0 ? r.points : "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ResultsTable;
