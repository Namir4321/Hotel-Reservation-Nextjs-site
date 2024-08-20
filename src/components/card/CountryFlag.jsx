import { findCountryByCode } from "@/utils/countries";
const CountryFlag = ({ countryCode }) => {
  const validCountry = findCountryByCode(countryCode);
  const countryName =
    validCountry.name.length > 20
      ? `${validCountry.substring(0, 20)}...`
      : validCountry.name;
  return <span className="flex justify-between items-center gap-2 text-sm">
    {validCountry.flag}
   {" "} {countryName}
  </span>;
};

export default CountryFlag;
