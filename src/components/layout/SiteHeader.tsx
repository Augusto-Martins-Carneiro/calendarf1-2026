import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/calendario", label: "Calendário" },
  { to: "/classificacao", label: "Classificação" },
  { to: "/pilotos", label: "Pilotos" },
  { to: "/equipes", label: "Equipes" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    } after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:bg-primary after:transition-transform ${
      isActive ? "after:scale-x-100" : "after:scale-x-0"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-12 items-center justify-center rounded-md bg-primary text-base font-black italic tracking-tighter text-primary-foreground">
            F1
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold uppercase tracking-widest text-foreground">
              Temporada 2026
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Calendário, resultados e classificação
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="ml-auto rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-l-2 py-3 pl-3 text-sm font-semibold uppercase tracking-wide ${
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
