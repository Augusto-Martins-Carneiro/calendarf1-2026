import { getTeamLogo } from "@/data/teamLogos";
import { getTeam } from "@/data/f1Data";

interface TeamBadgeProps {
  teamId: string;
  /** Altura do escudo em pixels. */
  size?: number;
  className?: string;
}

/**
 * Escudo oficial da equipe. Cai para a sigla quando não há imagem
 * (por exemplo em dados vindos do banco com um id desconhecido).
 */
const TeamBadge = ({ teamId, size = 24, className = "" }: TeamBadgeProps) => {
  const logo = getTeamLogo(teamId);
  const team = getTeam(teamId);

  if (!logo) {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold tracking-wider ${className}`}
        style={{ height: size, fontSize: size * 0.5, color: team?.color ?? "#8E8E93" }}
      >
        {team?.abbr ?? teamId.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={team?.name ?? teamId}
      loading="lazy"
      className={`object-contain ${className}`}
      style={{ height: size, width: "auto", maxWidth: size * 3 }}
    />
  );
};

export default TeamBadge;
