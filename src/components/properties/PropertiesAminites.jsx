import Title from "./Title";
import { Amenity } from "@/utils/amenities";
import { LuFolderCheck } from "react-icons/lu";
const PropertiesAminites = ({ amenities }) => {
  const amenitieList = JSON.parse(amenities);
  const noAmenities = amenitieList.every((amenity) => !amenity.selected);
  if (noAmenities) return null;
  return (
    <div className="mt-4">
      <Title text="what this place offers" />
      <div className="grid md:grid-cols-2 gap-x-4">
        {amenitieList.map((amenity) => {
          if (!amenity.selected) return null;
          return (
            <div key={amenity.name} className="flex items-center gap-x-4 mb-2">
              <LuFolderCheck className="h-6 w-6 text-primary" />
              <span className="font-light text-sm capitalize">
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesAminites;
