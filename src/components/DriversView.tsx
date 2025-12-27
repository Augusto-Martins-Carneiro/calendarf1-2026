import { useState, useEffect } from "react";
import { Users, Heart, Star } from "lucide-react";
import TeamSection from "./TeamSection";
import DriverCard from "./DriverCard";
import { teams, getAllDrivers } from "@/data/f1Data";

const DriversView = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("f1-favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("f1-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (driverName: string) => {
    setFavorites((prev) =>
      prev.includes(driverName)
        ? prev.filter((name) => name !== driverName)
        : [...prev, driverName]
    );
  };

  const allDrivers = getAllDrivers();
  const favoriteDrivers = allDrivers.filter(({ driver }) =>
    favorites.includes(driver.name)
  );

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Grid 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Pilotos & Equipes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça os 22 pilotos e 11 equipes que disputarão o campeonato mundial de Fórmula 1 em 2026.
          </p>
        </div>

        {/* Favorites Toggle & Counter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              showFavoritesOnly
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            <Heart className={`w-5 h-5 ${showFavoritesOnly ? "fill-current" : ""}`} />
            {showFavoritesOnly ? "Ver Todos" : "Ver Favoritos"}
          </button>

          {favorites.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground font-semibold">{favorites.length}</span>
              <span className="text-muted-foreground text-sm">
                {favorites.length === 1 ? "favorito" : "favoritos"}
              </span>
            </div>
          )}
        </div>

        {/* Favorites Section (when filter is active) */}
        {showFavoritesOnly && (
          <div className="mb-12">
            {favoriteDrivers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteDrivers.map(({ driver, team }) => (
                  <DriverCard
                    key={driver.name}
                    driver={driver}
                    team={team}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(driver.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Nenhum favorito selecionado
                </h3>
                <p className="text-muted-foreground">
                  Clique no coração nos cards dos pilotos para adicionar aos favoritos.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Teams Grid (when showing all) */}
        {!showFavoritesOnly && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <TeamSection
                key={team.name}
                team={team}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversView;
