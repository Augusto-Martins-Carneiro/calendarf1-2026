import DriverAvatar from "@/components/common/DriverAvatar";
import type { RaceResult } from "@/hooks/useSeason";
import { teamColor } from "@/data/f1Data";

const MEDALS = ["#D4AF37", "#C0C4CC", "#B06A32"];

interface PodiumStripProps {
  podium: RaceResult[];
  size?: "sm" | "md";
}

/** Os três primeiros colocados em linha, do 1º ao 3º. */
const PodiumStrip = ({ podium, size = "sm" }: PodiumStripProps) => {
  const avatar = size === "sm" ? 28 : 38;

  return (
    <ul className="space-y-1.5">
      {podium.map((p, i) => {
        const color = teamColor(p.team_id);
        return (
          <li key={p.driver_id} className="flex items-center gap-2.5">
            <span
              className="w-5 shrink-0 text-center text-xs font-black tabular-nums"
              style={{ color: MEDALS[i] }}
            >
              {i + 1}
            </span>
            <DriverAvatar driverId={p.driver_id} name={p.driver_name} color={color} size={avatar} />
            <div className="min-w-0 flex-1">
              <p
                className={`truncate font-semibold text-foreground ${
                  size === "sm" ? "text-sm" : "text-base"
                }`}
              >
                {p.driver_name}
              </p>
              <p className="truncate text-[11px]" style={{ color }}>
                {p.team_name}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PodiumStrip;
