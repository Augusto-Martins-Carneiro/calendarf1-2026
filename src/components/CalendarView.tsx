import { Calendar as CalendarIcon, Flag } from "lucide-react";
import RaceCard from "./RaceCard";
import { races } from "@/data/f1Data";

const CalendarView = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Temporada 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Calendário de Corridas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todas as 24 corridas da temporada 2026 da Fórmula 1. Acompanhe cada Grande Prêmio ao redor do mundo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-black text-primary">24</p>
            <p className="text-muted-foreground text-sm">Corridas</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-black text-foreground">21</p>
            <p className="text-muted-foreground text-sm">Países</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-black text-foreground">5</p>
            <p className="text-muted-foreground text-sm">Continentes</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <div className="flex items-center justify-center gap-1">
              <Flag className="w-5 h-5 text-primary" />
              <p className="text-xl font-black text-foreground">Mar-Dez</p>
            </div>
            <p className="text-muted-foreground text-sm">Duração</p>
          </div>
        </div>

        {/* Races Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race, index) => (
            <RaceCard key={race.id} race={race} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
