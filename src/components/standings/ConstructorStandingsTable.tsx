import { Link } from "react-router-dom";
import TeamBadge from "@/components/common/TeamBadge";
import type { ConstructorStanding } from "@/hooks/useSeason";
import { getTeam, getTeamDrivers, teamColor } from "@/data/f1Data";

interface ConstructorStandingsTableProps {
  standings: ConstructorStanding[];
}

const ConstructorStandingsTable = ({ standings }: ConstructorStandingsTableProps) => {
  const leader = Number(standings[0]?.points ?? 0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-[34px_1fr_72px] items-center gap-2 bg-secondary/40 sm:grid-cols-[40px_1fr_64px_80px] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground md:grid-cols-[48px_1fr_72px_72px_88px]">
        <span>Pos</span>
        <span>Equipe</span>
        <span className="hidden text-center md:block">Vitórias</span>
        <span className="hidden text-center sm:block">Pódios</span>
        <span className="text-right">Pontos</span>
      </div>

      {standings.map((c) => {
        const color = teamColor(c.team_id);
        const team = getTeam(c.team_id);
        const pct = leader > 0 ? (Number(c.points) / leader) * 100 : 0;
        return (
          <Link
            key={c.team_id}
            to={`/equipes/${c.team_id}`}
            className="relative grid grid-cols-[34px_1fr_72px] items-center gap-2 border-t sm:grid-cols-[40px_1fr_64px_80px] border-border/70 px-4 py-3 transition-colors hover:bg-secondary/25 md:grid-cols-[48px_1fr_72px_72px_88px]"
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5 opacity-70"
              style={{ background: color }}
            />
            <span className="text-lg font-black tabular-nums text-foreground">{c.position}</span>

            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${color}1f` }}
              >
                <TeamBadge teamId={c.team_id} size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-foreground">{c.team_name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {getTeamDrivers(c.team_id)
                    .map((d) => d.lastName)
                    .join(" · ") || team?.engine}
                </p>
              </div>
            </div>

            <span className="hidden text-center tabular-nums text-muted-foreground md:block">
              {c.wins}
            </span>
            <span className="hidden text-center tabular-nums text-muted-foreground sm:block">{c.podiums}</span>

            <div className="text-right">
              <span className="font-black tabular-nums text-foreground">{c.points}</span>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ConstructorStandingsTable;
