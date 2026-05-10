import { Calendar, Users, Trophy } from "lucide-react";

export type Tab = "calendar" | "drivers" | "standings";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const tabs: { id: Tab; label: string; icon: typeof Calendar }[] = [
    { id: "calendar", label: "Calendário", icon: Calendar },
    { id: "drivers", label: "Pilotos & Equipes", icon: Users },
    { id: "standings", label: "Classificação", icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-f1 rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-black text-lg md:text-xl">F1</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Temporada <span className="text-primary">2026</span>
              </h1>
              <p className="text-xs text-muted-foreground">Calendário, Pilotos e Pontos</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 md:gap-2 flex-wrap justify-end">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeTab === id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
