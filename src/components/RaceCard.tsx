import { MapPin, Clock, RotateCcw } from "lucide-react";
import CountryFlag from "./CountryFlag";
import type { Race } from "@/data/f1Data";

interface RaceCardProps {
  race: Race;
  index: number;
}

const RaceCard = ({ race, index }: RaceCardProps) => {
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
            <p className="text-muted-foreground text-sm">{race.country}</p>
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

        {/* Date, Time and Laps */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-foreground font-semibold text-sm">{race.date}</p>
              <p className="text-muted-foreground text-xs">{race.time} (Horário de Brasília)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <RotateCcw className="w-4 h-4 text-primary" />
            <span className="text-foreground font-bold">{race.laps}</span>
            <span className="text-muted-foreground text-sm">voltas</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            Próxima
          </span>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
