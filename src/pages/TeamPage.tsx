import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TeamBadge from "@/components/common/TeamBadge";
import CountryFlag from "@/components/common/CountryFlag";
import QueryState from "@/components/common/QueryState";
import {
  useConstructorStandings,
  useDriverStandings,
  usePodiums,
} from "@/hooks/useSeason";
import { getDriverPhoto } from "@/data/driverPhotos";
import { getRaceByRound, getTeam, getTeamDrivers } from "@/data/f1Data";

const ORDINAL = ["", "1º", "2º", "3º"];

const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getTeam(teamId) : undefined;

  const constructors = useConstructorStandings();
  const driverStandings = useDriverStandings();
  const podiums = usePodiums();

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-foreground">Equipe não encontrada</h1>
        <Link to="/equipes" className="mt-4 inline-block text-sm text-primary hover:underline">
          Ver todas as equipes
        </Link>
      </div>
    );
  }

  const standing = (constructors.data ?? []).find((c) => c.team_id === team.id);
  const teamPodiums = (podiums.data ?? []).filter((p) => p.team_id === team.id);
  const lineup = getTeamDrivers(team.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/equipes"
        className="mb-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Equipes
      </Link>

      <header
        className="relative overflow-hidden rounded-xl border border-border p-6"
        style={{ background: `linear-gradient(135deg, ${team.color}22, transparent 60%)` }}
      >
        <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: team.color }} />
        <div className="flex flex-wrap items-center gap-5 pl-3">
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: `${team.color}1f` }}
          >
            <TeamBadge teamId={team.id} size={38} />
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              {team.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {team.fullName !== team.name && `${team.fullName} · `}Motor {team.engine}
            </p>
            <p className="text-sm text-muted-foreground">{team.base}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 pl-3 md:grid-cols-4">
          {[
            { label: "Posição", value: standing ? `${standing.position}º` : "—" },
            { label: "Pontos", value: standing?.points ?? "—" },
            { label: "Vitórias", value: standing?.wins ?? "—" },
            { label: "Pódios", value: standing?.podiums ?? "—" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-background/50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-black uppercase tracking-wide text-foreground">Pilotos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {lineup.map((d) => {
            const ds = (driverStandings.data ?? []).find((s) => s.driver_id === d.id);
            const photo = getDriverPhoto(d.id);
            return (
              <article
                key={d.id}
                className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-gradient-card p-4"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary/40">
                  {photo ? (
                    <img
                      src={photo}
                      alt={d.name}
                      loading="lazy"
                      className="absolute left-1/2 top-0 h-[170px] max-w-none -translate-x-1/2 object-contain object-top"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-2xl font-black text-muted-foreground">
                      {d.code}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <CountryFlag countryCode={d.countryCode} className="h-4 w-6" />
                    <span className="text-xs text-muted-foreground">{d.nationality}</span>
                  </div>
                  <h3 className="mt-1 truncate text-lg font-black text-foreground">{d.name}</h3>
                  <p className="text-sm" style={{ color: team.color }}>
                    #{d.number} · {d.code}
                  </p>
                  {ds && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-black text-foreground">{ds.points}</span> pontos ·{" "}
                      {ds.position}º no campeonato
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-black uppercase tracking-wide text-foreground">
          Pódios em 2026
        </h2>
        <QueryState
          loading={podiums.isLoading}
          error={podiums.error as Error | null}
          empty={!podiums.isLoading && !podiums.error && teamPodiums.length === 0}
          emptyLabel="A equipe ainda não subiu ao pódio nesta temporada."
        />
        {teamPodiums.length > 0 && (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {teamPodiums.map((p) => {
              const race = getRaceByRound(p.round);
              return (
                <li key={`${p.round}-${p.driver_id}`} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className="w-7 shrink-0 text-center font-black"
                    style={{ color: team.color }}
                  >
                    {ORDINAL[p.position ?? 0]}
                  </span>
                  {race && <CountryFlag countryCode={race.countryCode} className="h-5 w-7" />}
                  <Link
                    to={race ? `/corrida/${race.slug}` : "/calendario"}
                    className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground hover:text-primary"
                  >
                    {race?.name ?? `Rodada ${p.round}`}
                  </Link>
                  <span className="truncate text-sm text-muted-foreground">{p.driver_name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
