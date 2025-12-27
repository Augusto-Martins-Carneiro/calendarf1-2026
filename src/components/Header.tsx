import { Calendar, Users } from "lucide-react";

interface HeaderProps {
  activeTab: "calendar" | "drivers";
  onTabChange: (tab: "calendar" | "drivers") => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-f1 rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-black text-lg md:text-xl">F1</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Temporada <span className="text-primary">2026</span>
              </h1>
              <p className="text-xs text-muted-foreground">Calendário e Pilotos</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2">
            <button
              onClick={() => onTabChange("calendar")}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === "calendar"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Calendário</span>
            </button>
            <button
              onClick={() => onTabChange("drivers")}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === "drivers"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Pilotos & Equipes</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
