import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TeamBadge from "@/components/common/TeamBadge";
import DriverAvatar from "@/components/common/DriverAvatar";
import QueryState from "@/components/common/QueryState";
import { useConstructorStandings } from "@/hooks/useSeason";
import { getTeamDrivers, teams } from "@/data/f1Data";

const TeamsPage = () => {
  const { data, isLoading, error } = useConstructorStandings();
  const byId = new Map((data ?? []).map((c) => [c.team_id, c]));
  const ordered = [...teams].sort(
    (a, b) => (byId.get(a.id)?.position ?? 99) - (byId.get(b.id)?.position ?? 99)
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Temporada 2026</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Equipes
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Onze equipes no grid, com a chegada da Cadillac e a Audi no lugar da Sauber.
        </p>
      </header>

      <QueryState loading={isLoading} error={error as Error | null} />

      <div className="grid gap-4 md:grid-cols-2">
        {ordered.map((team) => {
          const standing = byId.get(team.id);
          return (
            <Link
              key={team.id}
              to={`/equipes/${team.id}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-gradient-card transition-colors hover:border-primary/50"
            >
              <span className="absolute inset-y-0 left-0 w-1" style={{ background: team.color }} />

              <div className="flex items-center gap-4 p-5 pl-6">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${team.color}1f` }}
                >
                  <TeamBadge teamId={team.id} size={26} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-xl font-black text-foreground">{team.name}</h2>
                  <p className="truncate text-xs text-muted-foreground">
                    Motor {team.engine} · {team.base}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-black tabular-nums text-foreground">{standing?.points ?? "—"}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {standing ? `${standing.position}º lugar` : "pontos"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>

              <div className="flex gap-4 border-t border-border/70 px-5 py-3 pl-6">
                {getTeamDrivers(team.id).map((d) => (
                  <span key={d.id} className="flex min-w-0 items-center gap-2">
                    <DriverAvatar
                      driverId={d.id}
                      name={d.name}
                      color={team.color}
                      size={28}
                    />
                    <span className="truncate text-sm text-foreground">{d.name}</span>
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsPage;
