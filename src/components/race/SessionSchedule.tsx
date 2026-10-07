import type { Race, Session } from "@/data/f1Data";
import { formatTime, formatWeekday, formatDayMonth, localTimeZoneLabel } from "@/lib/format";

interface SessionScheduleProps {
  race: Race;
  /** Destaca a próxima sessão ainda não iniciada. */
  highlightNext?: boolean;
}

const isMainSession = (s: Session) => s.kind === "race" || s.kind === "sprint";

const SessionSchedule = ({ race, highlightNext = true }: SessionScheduleProps) => {
  const now = Date.now();
  const nextIndex = highlightNext
    ? race.sessions.findIndex((s) => new Date(s.start).getTime() > now)
    : -1;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between bg-secondary/40 px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Programação
        </span>
        <span className="text-[11px] text-muted-foreground">{localTimeZoneLabel()}</span>
      </div>
      <ul className="divide-y divide-border">
        {race.sessions.map((s, i) => {
          const past = new Date(s.start).getTime() < now;
          return (
            <li
              key={s.kind}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                i === nextIndex ? "bg-primary/10" : ""
              } ${past && i !== nextIndex ? "opacity-55" : ""}`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  isMainSession(s) ? "bg-primary" : "bg-muted-foreground/50"
                }`}
              />
              <span
                className={`flex-1 truncate ${
                  isMainSession(s) ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatWeekday(s.start)} {formatDayMonth(s.start)}
              </span>
              <span className="w-12 shrink-0 text-right font-mono font-semibold tabular-nums text-foreground">
                {formatTime(s.start)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SessionSchedule;
