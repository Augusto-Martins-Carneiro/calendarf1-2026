import { Link } from "react-router-dom";
import TeamBadge from "@/components/common/TeamBadge";
import CountryFlag from "@/components/common/CountryFlag";
import QueryState from "@/components/common/QueryState";
import { useDriverStandings, type DriverStanding } from "@/hooks/useSeason";
import { getDriverPhoto } from "@/data/driverPhotos";
import { drivers as roster, getDriver, teamColor } from "@/data/f1Data";

const fallbackStandings = (): DriverStanding[] =>
  roster.map((d, i) => ({
    position: i + 1,
    driver_id: d.id,
    driver_name: d.name,
    driver_code: d.code,
    driver_number: d.number,
    team_id: d.teamId,
    team_name: d.name,
    points: 0,
    wins: 0,
    podiums: 0,
  }));

const DriversPage = () => {
  const { data, isLoading, error } = useDriverStandings();
  const standings = (data ?? []).length > 0 ? data ?? [] : fallbackStandings();

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Temporada 2026</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Pilotos
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Em ordem de campeonato. {standings.length} pilotos pontuaram ou largaram em 2026.
        </p>
      </header>

      <QueryState loading={isLoading} error={error as Error | null} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {standings.map((d) => {
          const color = teamColor(d.team_id);
          const info = getDriver(d.driver_id);
          const photo = getDriverPhoto(d.driver_id);
          return (
            <article
              key={d.driver_id}
              id={d.driver_id}
              className="group relative flex scroll-mt-20 flex-col overflow-hidden rounded-xl border border-border bg-gradient-card"
            >
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />

              <div className="flex items-start justify-between gap-2 p-4 pb-0">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {d.position}º no campeonato
                  </p>
                  <h2 className="mt-1 truncate text-xl font-black leading-tight text-foreground">
                    {info?.firstName ?? d.driver_name}
                  </h2>
                  <h3 className="truncate text-xl font-black uppercase leading-tight text-foreground">
                    {info?.lastName ?? ""}
                  </h3>
                </div>
                <span
                  className="shrink-0 font-black italic leading-none tabular-nums opacity-70"
                  style={{ color, fontSize: 40 }}
                >
                  {d.driver_number ?? ""}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 px-4">
                {info && <CountryFlag countryCode={info.countryCode} className="h-4 w-6" />}
                <TeamBadge teamId={d.team_id} size={14} />
                <span className="truncate text-xs" style={{ color }}>
                  {d.team_name}
                </span>
              </div>

              <div className="relative mt-3 h-52 overflow-hidden">
                <div
                  className="absolute inset-x-0 bottom-0 h-32 opacity-20"
                  style={{ background: `radial-gradient(60% 80% at 50% 100%, ${color}, transparent)` }}
                />
                {photo ? (
                  <img
                    src={photo}
                    alt={d.driver_name}
                    loading="lazy"
                    className="absolute left-1/2 top-0 h-[300px] max-w-none -translate-x-1/2 object-contain object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl font-black text-secondary">
                    {d.driver_code}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 border-t border-border/70 text-center">
                {[
                  { label: "Pontos", value: d.points },
                  { label: "Vitórias", value: d.wins },
                  { label: "Pódios", value: d.podiums },
                ].map((s) => (
                  <div key={s.label} className="border-l border-border/70 py-2.5 first:border-l-0">
                    <p className="font-black tabular-nums text-foreground">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Pilotos reservas aparecem na lista quando disputaram ao menos uma etapa.{" "}
        <Link to="/classificacao" className="text-primary hover:underline">
          Ver a classificação completa
        </Link>
        .
      </p>
    </div>
  );
};

export default DriversPage;
