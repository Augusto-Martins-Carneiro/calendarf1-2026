import DriverAvatar from "@/components/common/DriverAvatar";
import TeamBadge from "@/components/common/TeamBadge";
import type { DriverStanding } from "@/hooks/useSeason";
import { teamColor } from "@/data/f1Data";

interface DriverStandingsTableProps {
  standings: DriverStanding[];
}

const DriverStandingsTable = ({ standings }: DriverStandingsTableProps) => {
  const leader = Number(standings[0]?.points ?? 0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid grid-cols-[34px_1fr_72px] items-center gap-2 bg-secondary/40 sm:grid-cols-[40px_1fr_64px_80px] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground md:grid-cols-[48px_1fr_72px_72px_88px]">
        <span>Pos</span>
        <span>Piloto</span>
        <span className="hidden text-center md:block">Vitórias</span>
        <span className="hidden text-center sm:block">Pódios</span>
        <span className="text-right">Pontos</span>
      </div>

      {standings.map((d) => {
        const color = teamColor(d.team_id);
        const pct = leader > 0 ? (Number(d.points) / leader) * 100 : 0;
        return (
          <div
            key={d.driver_id}
            id={d.driver_id}
            className="relative grid scroll-mt-20 grid-cols-[34px_1fr_72px] items-center gap-2 border-t sm:grid-cols-[40px_1fr_64px_80px] border-border/70 px-4 py-3 transition-colors hover:bg-secondary/25 md:grid-cols-[48px_1fr_72px_72px_88px]"
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5 opacity-70"
              style={{ background: color }}
            />
            <span className="text-lg font-black tabular-nums text-foreground">{d.position}</span>

            <div className="flex min-w-0 items-center gap-3">
              <DriverAvatar driverId={d.driver_id} name={d.driver_name} color={color} size={40} />
              <div className="min-w-0">
                <p className="flex items-center gap-2 truncate font-semibold text-foreground">
                  {d.driver_name}
                  <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
                    {d.driver_code}
                  </span>
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <TeamBadge teamId={d.team_id} size={12} className="opacity-80" />
                  <p className="truncate text-xs" style={{ color }}>
                    {d.team_name}
                  </p>
                </div>
              </div>
            </div>

            <span className="hidden text-center tabular-nums text-muted-foreground md:block">
              {d.wins}
            </span>
            <span className="hidden text-center tabular-nums text-muted-foreground sm:block">{d.podiums}</span>

            <div className="text-right">
              <span className="font-black tabular-nums text-foreground">{d.points}</span>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DriverStandingsTable;
