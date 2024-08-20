import { formatQuantity } from "@/utils/format";
import { BedSingleIcon } from "lucide-react";
const PropertiesDetails = ({ details }) => {
  const { bedrooms, baths, guests, beds } = details;
  return (
    <p className="text-md font-light space-x-1">
      <span>{formatQuantity(bedrooms, "Bedroom")} </span>
      <span>{formatQuantity(baths, "Bath")} </span>
      <span>{formatQuantity(guests, "Guest")} </span>
      <span>{formatQuantity(beds, "Bed")} </span>
    </p>
  );
};

export default PropertiesDetails;
