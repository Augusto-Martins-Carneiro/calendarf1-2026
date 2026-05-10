import { useEffect, useMemo, useState } from "react";
import { Trophy, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { teams } from "@/data/f1Data";
import { getDriverPhoto } from "@/data/driverPhotos";

interface RaceResultRow {
  race_id: number;
  session_type: "race" | "sprint";
  position: number;
  driver_name: string;
  team_name: string;
  points: number;
}

const teamColor = (teamName: string) =>
  teams.find((t) => t.name === teamName)?.color ?? "#888888";

const StandingsView = () => {
  const [tab, setTab] = useState<"drivers" | "constructors">("drivers");
  const [rows, setRows] = useState<RaceResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("race_results")
        .select("race_id, session_type, position, driver_name, team_name, points");
      if (error) setError(error.message);
      else setRows((data ?? []) as RaceResultRow[]);
      setLoading(false);
    })();
  }, []);

  const driverStandings = useMemo(() => {
    const map = new Map<string, { driver: string; team: string; points: number; wins: number; podiums: number }>();
    rows.forEach((r) => {
      const cur = map.get(r.driver_name) ?? { driver: r.driver_name, team: r.team_name, points: 0, wins: 0, podiums: 0 };
      cur.points += Number(r.points);
      if (r.session_type === "race" && r.position === 1) cur.wins += 1;
      if (r.session_type === "race" && r.position <= 3) cur.podiums += 1;
      cur.team = r.team_name;
      map.set(r.driver_name, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.points - a.points);
  }, [rows]);

  const constructorStandings = useMemo(() => {
    const map = new Map<string, { team: string; points: number; wins: number }>();
    rows.forEach((r) => {
      const cur = map.get(r.team_name) ?? { team: r.team_name, points: 0, wins: 0 };
      cur.points += Number(r.points);
      if (r.session_type === "race" && r.position === 1) cur.wins += 1;
      map.set(r.team_name, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.points - a.points);
  }, [rows]);

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
            Pontuação calculada a partir dos resultados oficiais cadastrados na base de dados.
          </p>
        </div>

        {/* Tab switcher */}
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

        {error && (
          <p className="text-center text-destructive">Erro ao carregar: {error}</p>
        )}

        {!loading && !error && tab === "drivers" && (
          <div className="max-w-3xl mx-auto bg-gradient-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[48px_1fr_80px_80px_80px] md:grid-cols-[60px_1fr_100px_100px_100px] gap-2 px-4 py-3 bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <div>Pos</div>
              <div>Piloto</div>
              <div className="text-center">Vit.</div>
              <div className="text-center">Pód.</div>
              <div className="text-right">Pontos</div>
            </div>
            {driverStandings.map((d, i) => {
              const photo = getDriverPhoto(d.driver);
              const color = teamColor(d.team);
              return (
                <div
                  key={d.driver}
                  className="grid grid-cols-[48px_1fr_80px_80px_80px] md:grid-cols-[60px_1fr_100px_100px_100px] gap-2 px-4 py-3 items-center border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <div className="font-black text-lg text-foreground">{i + 1}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    {photo ? (
                      <img
                        src={photo}
                        alt={d.driver}
                        className="w-10 h-10 rounded-full object-cover border-2 shrink-0"
                        style={{ borderColor: color }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{d.driver}</p>
                      <p className="text-xs truncate" style={{ color }}>{d.team}</p>
                    </div>
                  </div>
                  <div className="text-center text-foreground font-semibold">{d.wins}</div>
                  <div className="text-center text-foreground font-semibold">{d.podiums}</div>
                  <div className="text-right font-black text-primary">{d.points}</div>
                </div>
              );
            })}
            {driverStandings.length === 0 && (
              <p className="text-center py-10 text-muted-foreground">Sem resultados ainda.</p>
            )}
          </div>
        )}

        {!loading && !error && tab === "constructors" && (
          <div className="max-w-3xl mx-auto bg-gradient-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[48px_1fr_80px_100px] md:grid-cols-[60px_1fr_100px_120px] gap-2 px-4 py-3 bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <div>Pos</div>
              <div>Equipe</div>
              <div className="text-center">Vit.</div>
              <div className="text-right">Pontos</div>
            </div>
            {constructorStandings.map((c, i) => {
              const color = teamColor(c.team);
              return (
                <div
                  key={c.team}
                  className="grid grid-cols-[48px_1fr_80px_100px] md:grid-cols-[60px_1fr_100px_120px] gap-2 px-4 py-3 items-center border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <div className="font-black text-lg text-foreground">{i + 1}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <p className="font-semibold text-foreground truncate" style={{ color }}>{c.team}</p>
                  </div>
                  <div className="text-center text-foreground font-semibold">{c.wins}</div>
                  <div className="text-right font-black text-primary">{c.points}</div>
                </div>
              );
            })}
            {constructorStandings.length === 0 && (
              <p className="text-center py-10 text-muted-foreground">Sem resultados ainda.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsView;
