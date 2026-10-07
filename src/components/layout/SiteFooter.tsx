import { localTimeZoneLabel } from "@/lib/format";

const SiteFooter = () => (
  <footer className="mt-16 border-t border-border bg-card/40">
    <div className="container mx-auto flex flex-col gap-2 px-4 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
      <p>
        Temporada 2026 da Fórmula 1 · Horários exibidos no seu fuso ({localTimeZoneLabel()})
      </p>
      <p>
        Resultados da API Jolpica/Ergast. Projeto de fã, sem vínculo com a Formula One World
        Championship Ltd.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
