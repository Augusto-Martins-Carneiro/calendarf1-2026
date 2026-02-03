import { Heart } from "lucide-react";
import CountryFlag from "./CountryFlag";
import type { Driver, Team } from "@/data/f1Data";
import { getDriverPhoto } from "@/data/driverPhotos";

interface DriverCardProps {
  driver: Driver;
  team: Team;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const DriverCard = ({ driver, team, isFavorite, onToggleFavorite }: DriverCardProps) => {
  const driverPhoto = getDriverPhoto(driver.name);

  return (
    <div
      className="relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-opacity-50 group"
      style={{ borderColor: isFavorite ? team.color : undefined }}
    >
      {/* Team Color Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: team.color }}
      />

      <div className="p-4">
        {/* Driver Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Driver Photo or Initials */}
            {driverPhoto ? (
              <div 
                className="w-14 h-14 rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105"
                style={{ borderColor: team.color }}
              >
                <img 
                  src={driverPhoto} 
                  alt={driver.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div 
                className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-lg border-2"
                style={{ borderColor: team.color }}
              >
                {driver.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h4 className="text-foreground font-bold">{driver.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <CountryFlag countryCode={driver.countryCode} size="sm" />
                <span className="text-muted-foreground text-sm">{driver.nationality}</span>
              </div>
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isFavorite
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-300 ${
                isFavorite ? "fill-current scale-110" : "group-hover:scale-110"
              }`}
            />
          </button>
        </div>

        {/* Team Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: `${team.color}20`, color: team.color }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: team.color }}
          />
          {team.name}
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
