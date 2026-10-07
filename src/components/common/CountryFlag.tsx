interface CountryFlagProps {
  countryCode: string;
  className?: string;
}

/** Bandeira em proporção 4:3 servida pelo flagcdn. */
const CountryFlag = ({ countryCode, className = "w-8 h-6" }: CountryFlagProps) => (
  <img
    src={`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`}
    alt={`Bandeira: ${countryCode}`}
    loading="lazy"
    className={`${className} object-cover rounded-[3px] ring-1 ring-white/15`}
  />
);

export default CountryFlag;
