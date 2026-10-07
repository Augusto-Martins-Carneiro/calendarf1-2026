import { useEffect, useState } from "react";
import { countdownTo, pad } from "@/lib/format";

interface CountdownProps {
  target: string;
  className?: string;
}

const Countdown = ({ target, className = "" }: CountdownProps) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const c = countdownTo(target, now);
  const cells: { value: string; label: string }[] = [
    { value: String(c.days), label: c.days === 1 ? "dia" : "dias" },
    { value: pad(c.hours), label: "hr" },
    { value: pad(c.minutes), label: "min" },
    { value: pad(c.seconds), label: "seg" },
  ];

  return (
    <div className={`flex gap-2 ${className}`} role="timer" aria-live="off">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="min-w-[62px] rounded-lg border border-border bg-background/60 px-3 py-2 text-center"
        >
          <p className="font-mono text-2xl font-bold leading-none text-foreground tabular-nums">
            {cell.value}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            {cell.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
