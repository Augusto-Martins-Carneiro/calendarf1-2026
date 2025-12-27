interface CountryFlagProps {
  countryCode: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CountryFlag = ({ countryCode, size = "md", className = "" }: CountryFlagProps) => {
  const sizeClasses = {
    sm: "w-6 h-4",
    md: "w-8 h-6",
    lg: "w-12 h-8",
  };

  return (
    <img
      src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
      alt={`Bandeira ${countryCode}`}
      className={`${sizeClasses[size]} object-cover rounded shadow-sm ${className}`}
    />
  );
};

export default CountryFlag;
