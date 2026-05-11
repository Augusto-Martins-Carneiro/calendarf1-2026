import { useEffect, useMemo, useState } from "react";
import { Trophy, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { teams } from "@/data/f1Data";
import { getDriverPhoto } from "@/data/driverPhotos";

interface DriverStanding {
  position: number;
  driver_name: string;
  team_name: string;
  points: number;
}

interface ConstructorStanding {
  position: number;
  team_name: string;
  points: number;
}

const teamColor = (teamName: string) =>
  teams.find((t) => t.name === teamName)?.color ?? "#888888";

const StandingsView = () => {
  const [tab, setTab] = useState<"drivers" | "constructors">("drivers");
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [d, c] = await Promise.all([
        supabase
          .from("driver_standings")
          .select("position, driver_name, team_name, points")
          .order("position", { ascending: true }),
        supabase
          .from("constructor_standings")
          .select("position, team_name, points")
          .order("position", { ascending: true }),
      ]);
      if (d.error) setError(d.error.message);
      else setDrivers((d.data ?? []) as DriverStanding[]);
      if (c.error) setError(c.error.message);
      else setConstructors((c.data ?? []) as ConstructorStanding[]);
      setLoading(false);
    })();
  }, []);

  // Ensure all 22 drivers / 11 teams render even if missing in DB (extra safety)
  const fullDrivers = useMemo<DriverStanding[]>(() => {
    const byName = new Map(drivers.map((d) => [d.driver_name, d]));
    const all: DriverStanding[] = [];
    teams.forEach((t) =>
      t.drivers.forEach((dr) => {
        const existing = byName.get(dr.name);
        if (existing) all.push(existing);
        else
          all.push({
            position: 99,
            driver_name: dr.name,
            team_name: t.name,
            points: 0,
          });
      })
    );
    return all.sort((a, b) => b.points - a.points || a.position - b.position);
  }, [drivers]);

  const fullConstructors = useMemo<ConstructorStanding[]>(() => {
    const byName = new Map(constructors.map((c) => [c.team_name, c]));
    const all: ConstructorStanding[] = teams.map((t) => {
      const existing = byName.get(t.name);
      return existing ?? { position: 99, team_name: t.name, points: 0 };
    });
    return all.sort((a, b) => b.points - a.points || a.position - b.position);
  }, [constructors]);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Campeonato 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Classificação
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pontuação oficial após o Grande Prêmio de Miami.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setTab("drivers")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              tab === "drivers"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            <Users className="w-4 h-4" />
            Pilotos
          </button>
          <button
            onClick={() => setTab("constructors")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              tab === "constructors"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Construtores
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {error && <p className="text-center text-destructive">Erro ao carregar: {error}</p>}

        {!loading && !error && tab === "drivers" && (
          <div className="max-w-3xl mx-auto bg-gradient-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[48px_1fr_90px] md:grid-cols-[60px_1fr_120px] gap-2 px-4 py-3 bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <div>Pos</div>
              <div>Piloto</div>
              <div className="text-right">Pontos</div>
            </div>
            {fullDrivers.map((d, i) => {
              const photo = getDriverPhoto(d.driver_name);
              const color = teamColor(d.team_name);
              return (
                <div
                  key={d.driver_name}
                  className="grid grid-cols-[48px_1fr_90px] md:grid-cols-[60px_1fr_120px] gap-2 px-4 py-3 items-center border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <div className="font-black text-lg text-foreground">{i + 1}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    {photo ? (
                      <img
                        src={photo}
                        alt={d.driver_name}
                        className="w-11 h-11 rounded-full object-cover border-2 shrink-0 bg-secondary"
                        style={{ borderColor: color, objectPosition: "50% 12%" }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full bg-secondary shrink-0 border-2"
                        style={{ borderColor: color }}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{d.driver_name}</p>
                      <p className="text-xs truncate" style={{ color }}>
                        {d.team_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-black text-primary">{d.points}</div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && tab === "constructors" && (
          <div className="max-w-3xl mx-auto bg-gradient-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[48px_1fr_100px] md:grid-cols-[60px_1fr_120px] gap-2 px-4 py-3 bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <div>Pos</div>
              <div>Equipe</div>
              <div className="text-right">Pontos</div>
            </div>
            {fullConstructors.map((c, i) => {
              const color = teamColor(c.team_name);
              return (
                <div
                  key={c.team_name}
                  className="grid grid-cols-[48px_1fr_100px] md:grid-cols-[60px_1fr_120px] gap-2 px-4 py-3 items-center border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <div className="font-black text-lg text-foreground">{i + 1}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-1.5 h-10 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <p className="font-bold truncate" style={{ color }}>
                      {c.team_name}
                    </p>
                  </div>
                  <div className="text-right font-black text-primary">{c.points}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsView;
