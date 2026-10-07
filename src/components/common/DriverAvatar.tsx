import { getDriverPhoto } from "@/data/driverPhotos";

interface DriverAvatarProps {
  driverId: string;
  name: string;
  color: string;
  /** Diâmetro em pixels. */
  size?: number;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** Retrato circular do piloto, recortado no topo da foto de corpo inteiro. */
const DriverAvatar = ({ driverId, name, color, size = 44 }: DriverAvatarProps) => {
  const photo = getDriverPhoto(driverId);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-secondary"
      style={{ width: size, height: size, boxShadow: `inset 0 0 0 2px ${color}` }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="absolute left-1/2 w-[190%] max-w-none -translate-x-1/2"
          style={{ top: `-${size * 0.08}px` }}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-bold text-muted-foreground"
          style={{ fontSize: size * 0.36 }}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
};

export default DriverAvatar;
