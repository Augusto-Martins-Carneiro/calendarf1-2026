import DriverCard from "./DriverCard";
import type { Team } from "@/data/f1Data";

interface TeamSectionProps {
  team: Team;
  favorites: string[];
  onToggleFavorite: (driverName: string) => void;
  index: number;
}

const TeamSection = ({ team, favorites, onToggleFavorite, index }: TeamSectionProps) => {
  return (
    <div
      className="animate-slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Team Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: team.color }}
        />
        <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.drivers.map((driver) => (
          <DriverCard
            key={driver.name}
            driver={driver}
            team={team}
            isFavorite={favorites.includes(driver.name)}
            onToggleFavorite={() => onToggleFavorite(driver.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
