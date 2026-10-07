import alpineLogo from "@/assets/teams/alpine.webp";
import astonLogo from "@/assets/teams/aston.webp";
import audiLogo from "@/assets/teams/audi.webp";
import cadillacLogo from "@/assets/teams/cadillac.webp";
import ferrariLogo from "@/assets/teams/ferrari.webp";
import haasLogo from "@/assets/teams/haas.webp";
import mclarenLogo from "@/assets/teams/mclaren.webp";
import mercedesLogo from "@/assets/teams/mercedes.webp";
import racingBullsLogo from "@/assets/teams/racingbulls.webp";
import redBullLogo from "@/assets/teams/redbull.webp";
import williamsLogo from "@/assets/teams/williams.webp";

/**
 * Escudos oficiais das equipes na temporada 2026, em versão monocromática
 * branca (media.formula1.com). Indexados pelo id da equipe.
 */
export const teamLogos: Record<string, string> = {
  alpine: alpineLogo,
  aston_martin: astonLogo,
  audi: audiLogo,
  cadillac: cadillacLogo,
  ferrari: ferrariLogo,
  haas: haasLogo,
  mclaren: mclarenLogo,
  mercedes: mercedesLogo,
  rb: racingBullsLogo,
  red_bull: redBullLogo,
  williams: williamsLogo,
};

export const getTeamLogo = (teamId: string): string | undefined => teamLogos[teamId];
