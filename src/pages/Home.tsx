import { Link } from "react-router-dom";
import { ArrowRight, Flag, Trophy } from "lucide-react";
import NextRaceHero from "@/components/home/NextRaceHero";
import PodiumStrip from "@/components/race/PodiumStrip";
import RaceCard from "@/components/race/RaceCard";
import TeamBadge from "@/components/common/TeamBadge";
import DriverAvatar from "@/components/common/DriverAvatar";
import QueryState from "@/components/common/QueryState";
import {
  useConstructorStandings,
  useDriverStandings,
  usePodiums,
  groupByRound,
} from "@/hooks/useSeason";
import {
  completedRounds,
  getLastCompletedRace,
  getRaceStatus,
  races,
  teamColor,
} from "@/data/f1Data";

const SectionTitle = ({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="mb-4 flex items-end justify-between gap-4">
    <h2 className="text-xl font-black uppercase tracking-wide text-foreground md:text-2xl">
      {title}
    </h2>
    {href && (
      <Link
        to={href}
        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
      >
        {linkLabel ?? "Ver tudo"}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    )}
  </div>
);

const Home = () => {
  const drivers = useDriverStandings();
  const constructors = useConstructorStandings();
  const podiums = usePodiums();

  const byRound = groupByRound(podiums.data);
  const lastRace = getLastCompletedRace();
  const lastPodium = lastRace ? byRound.get(lastRace.round) : undefined;
  const upcoming = races.filter((r) => getRaceStatus(r) !== "finished").slice(0, 3);
  const done = completedRounds();

  const topDrivers = (drivers.data ?? []).slice(0, 5);
  const topTeams = (constructors.data ?? []).slice(0, 5);

  return (
    <>
      <NextRaceHero />

      <div className="container mx-auto space-y-14 px-4 py-12">
        <section>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Etapas disputadas", value: `${done} de 23` },
              { label: "Vencedores diferentes", value: String(new Set((podiums.data ?? []).filter((p) => p.position === 1).map((p) => p.driver_id)).size || "—") },
              { label: "Líder do campeonato", value: topDrivers[0]?.driver_name ?? "—" },
              { label: "Líder entre as equipes", value: topTeams[0]?.team_name ?? "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1.5 truncate text-lg font-black text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        {lastRace && (
          <section>
            <SectionTitle
              title={`Último resultado · ${lastRace.name}`}
              href={`/corrida/${lastRace.slug}`}
              linkLabel="Resultado completo"
            />
            <QueryState loading={podiums.isLoading} error={podiums.error as Error | null} />
            {lastPodium && lastPodium.length > 0 && (
              <div className="rounded-xl border border-border bg-gradient-card p-5">
                <PodiumStrip podium={lastPodium} size="md" />
              </div>
            )}
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle title="Pilotos" href="/classificacao" />
            <QueryState loading={drivers.isLoading} error={drivers.error as Error | null} />
            {topDrivers.length > 0 && (
              <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {topDrivers.map((d) => {
                  const color = teamColor(d.team_id);
                  return (
                    <li key={d.driver_id} className="flex items-center gap-3 px-4 py-3">
                      <span className="w-5 text-lg font-black tabular-nums text-foreground">
                        {d.position}
                      </span>
                      <DriverAvatar
                        driverId={d.driver_id}
                        name={d.driver_name}
                        color={color}
                        size={36}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">{d.driver_name}</p>
                        <p className="truncate text-xs" style={{ color }}>
                          {d.team_name}
                        </p>
                      </div>
                      <span className="font-black tabular-nums text-foreground">{d.points}</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          <div>
            <SectionTitle title="Construtores" href="/classificacao?aba=construtores" />
            <QueryState
              loading={constructors.isLoading}
              error={constructors.error as Error | null}
            />
            {topTeams.length > 0 && (
              <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {topTeams.map((c) => {
                  const color = teamColor(c.team_id);
                  return (
                    <li key={c.team_id} className="flex items-center gap-3 px-4 py-3">
                      <span className="w-5 text-lg font-black tabular-nums text-foreground">
                        {c.position}
                      </span>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${color}1f` }}
                      >
                        <TeamBadge teamId={c.team_id} size={16} />
                      </span>
                      <p className="min-w-0 flex-1 truncate font-bold text-foreground">
                        {c.team_name}
                      </p>
                      <span className="font-black tabular-nums text-foreground">{c.points}</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </section>

        <section>
          <SectionTitle title="Próximas etapas" href="/calendario" linkLabel="Calendário" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((race) => (
              <RaceCard key={race.round} race={race} />
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-4 rounded-xl border border-border bg-gradient-card px-6 py-10 text-center">
          <Trophy className="h-7 w-7 text-primary" />
          <h2 className="text-xl font-black uppercase tracking-wide text-foreground">
            Todas as 23 etapas, resultado a resultado
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Grid de largada, voltas completadas, melhor volta e pontuação de cada piloto em cada
            Grande Prêmio da temporada.
          </p>
          <Link
            to="/calendario"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            <Flag className="h-4 w-4" />
            Abrir o calendário
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
