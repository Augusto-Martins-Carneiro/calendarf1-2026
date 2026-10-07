import { useSearchParams } from "react-router-dom";
import { Trophy, Users } from "lucide-react";
import DriverStandingsTable from "@/components/standings/DriverStandingsTable";
import ConstructorStandingsTable from "@/components/standings/ConstructorStandingsTable";
import QueryState from "@/components/common/QueryState";
import {
  useConstructorStandings,
  useDriverStandings,
  usePodiums,
  latestRoundWithResults,
} from "@/hooks/useSeason";
import { getRaceByRound } from "@/data/f1Data";

const StandingsPage = () => {
  const [params, setParams] = useSearchParams();
  const tab = params.get("aba") === "construtores" ? "construtores" : "pilotos";

  const drivers = useDriverStandings();
  const constructors = useConstructorStandings();
  const podiums = usePodiums();

  const lastRound = latestRoundWithResults(podiums.data);
  const lastRace = getRaceByRound(lastRound);

  const active = tab === "pilotos" ? drivers : constructors;

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Campeonato 2026</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Classificação
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {lastRace
            ? `Pontuação após a rodada ${lastRound} · ${lastRace.name}.`
            : "Pontuação da temporada."}
        </p>
      </header>

      <div className="mb-6 flex gap-2">
        {[
          { id: "pilotos", label: "Pilotos", icon: Users },
          { id: "construtores", label: "Construtores", icon: Trophy },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setParams(id === "pilotos" ? {} : { aba: id })}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <QueryState
        loading={active.isLoading}
        error={active.error as Error | null}
        empty={!active.isLoading && !active.error && (active.data ?? []).length === 0}
        emptyLabel="A classificação ainda não foi publicada."
      />

      {tab === "pilotos" && (drivers.data ?? []).length > 0 && (
        <DriverStandingsTable standings={drivers.data ?? []} />
      )}
      {tab === "construtores" && (constructors.data ?? []).length > 0 && (
        <ConstructorStandingsTable standings={constructors.data ?? []} />
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        Pódios contam apenas os Grandes Prêmios; os pontos incluem as corridas sprint.
      </p>
    </div>
  );
};

export default StandingsPage;
