import { useState } from "react";
import { MapPin, Clock, RotateCcw, ChevronDown, ChevronUp, Zap, Trophy } from "lucide-react";
import CountryFlag from "./CountryFlag";
import type { Race } from "@/data/f1Data";
import { getScheduleForRace } from "@/data/raceSchedules";
import { getPodiumForRace, type PodiumEntry } from "@/data/racePodiums";

const PodiumBlock = ({ title, entries, accent }: { title: string; entries: PodiumEntry[]; accent: string }) => {
  const medal = ["bg-yellow-500/20 text-yellow-400 border-yellow-500/40", "bg-gray-400/20 text-gray-300 border-gray-400/40", "bg-amber-700/20 text-amber-500 border-amber-700/40"];
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className={`w-4 h-4 ${accent}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${accent}`}>{title}</span>
      </div>
      <div className="space-y-1.5">
        {entries.sort((a, b) => a.position - b.position).map((e) => (
          <div key={e.position} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border ${medal[e.position - 1]}`}>
            <span className="font-black text-sm w-5">P{e.position}</span>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-sm font-semibold truncate">{e.driver}</p>
              <p className="text-muted-foreground text-xs truncate">{e.team}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface RaceCardProps {
  race: Race;
  index: number;
}

const RaceCard = ({ race, index }: RaceCardProps) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const schedule = getScheduleForRace(race.id);
  const podium = getPodiumForRace(race.id);
  const isFinished = !!podium?.race;

  return (
    <div
      className="group relative bg-gradient-card rounded-xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-glow racing-stripe animate-slide-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Race Number Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
        <span className="text-primary font-black text-lg">{race.id}</span>
      </div>

      <div className="p-5 md:p-6 pl-6 md:pl-8">
        {/* Header with Flag and Country */}
        <div className="flex items-center gap-3 mb-4">
          <div className="transform group-hover:animate-flag-wave">
            <CountryFlag countryCode={race.countryCode} size="lg" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">{race.country}</p>
              {schedule?.isSprint && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs font-bold rounded-full">
                  <Zap className="w-3 h-3" />
                  SPRINT
                </span>
              )}
            </div>
            <h3 className="text-foreground font-bold text-lg md:text-xl leading-tight">
              {race.name.replace("Grande Prêmio ", "GP ")}
            </h3>
          </div>
        </div>

        {/* Circuit Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{race.circuit}</span>
          </div>
          <p className="text-xs text-muted-foreground/70 pl-6">{race.city}</p>
        </div>

        {/* Date and Laps */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-foreground font-semibold text-sm">
                {schedule?.dates || race.date}
              </p>
              <p className="text-muted-foreground text-xs">Horário Local</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <RotateCcw className="w-4 h-4 text-primary" />
            <span className="text-foreground font-bold">{race.laps}</span>
            <span className="text-muted-foreground text-sm">voltas</span>
          </div>
        </div>

        {/* Schedule Toggle Button */}
        {schedule && (
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-lg transition-all duration-300"
          >
            <span className="text-sm font-medium">
              {showSchedule ? "Ocultar Programação" : "Ver Programação Completa"}
            </span>
            {showSchedule ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Session Schedule */}
        {showSchedule && schedule && (
          <div className="mt-4 bg-secondary/30 rounded-lg overflow-hidden animate-slide-in">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">
                    Sessão
                  </th>
                  <th className="text-center py-2 px-3 text-muted-foreground font-semibold">
                    Dia
                  </th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-semibold">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.sessions.map((session, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-border/50 ${
                      session.name === "Corrida"
                        ? "bg-primary/10"
                        : session.name === "Sprint"
                        ? "bg-accent/10"
                        : ""
                    }`}
                  >
                    <td className="py-2 px-3 text-foreground font-medium">
                      {session.name === "Corrida" && (
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                      )}
                      {session.name === "Sprint" && (
                        <Zap className="inline-block w-3 h-3 text-accent mr-2" />
                      )}
                      {session.name}
                    </td>
                    <td className="py-2 px-3 text-center text-muted-foreground">
                      {session.day}
                    </td>
                    <td className="py-2 px-3 text-right text-foreground font-semibold">
                      {session.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Podium */}
        {podium?.sprint && (
          <PodiumBlock title="Pódio Sprint" entries={podium.sprint} accent="text-accent" />
        )}
        {podium?.race && (
          <PodiumBlock title="Pódio da Corrida" entries={podium.race} accent="text-primary" />
        )}

        {/* Status Badge */}
        <div className="mt-4">
          {isFinished ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full">
              <Trophy className="w-3 h-3" />
              Finalizada
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              Próxima
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
