import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";
import Countdown from "@/components/home/Countdown";
import SessionSchedule from "@/components/race/SessionSchedule";
import { getNextSession, getNextRace, type Race, type Session } from "@/data/f1Data";
import { formatFullDateTime } from "@/lib/format";

const NextRaceHero = () => {
  const next = getNextSession();
  const race: Race | undefined = next?.race ?? getNextRace();

  if (!race) {
    return (
      <section className="border-b border-border bg-gradient-hero py-14">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Temporada encerrada
          </p>
          <h1 className="mt-3 text-4xl font-black text-foreground">
            As 23 etapas de 2026 já foram disputadas
          </h1>
        </div>
      </section>
    );
  }

  const session: Session | undefined = next?.session;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(var(--primary))" }}
      />
      <div className="container relative mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Próxima etapa
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Rodada {race.round} de 23
              </span>
              {race.isSprint && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <Zap className="h-3 w-3" />
                  Sprint
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-4">
              <CountryFlag countryCode={race.countryCode} className="h-10 w-14" />
              <h1 className="text-3xl font-black leading-none tracking-tight text-foreground md:text-5xl">
                {race.name}
              </h1>
            </div>

            <p className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {race.circuit}, {race.city}
            </p>

            {session && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {session.label} · {formatFullDateTime(session.start)}
                </p>
                <Countdown target={session.start} className="mt-3 flex-wrap" />
              </div>
            )}

            <Link
              to={`/corrida/${race.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver o fim de semana
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="self-start">
            <SessionSchedule race={race} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextRaceHero;
