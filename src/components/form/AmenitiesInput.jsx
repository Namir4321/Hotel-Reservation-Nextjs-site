"use client";
import { useState } from "react";
import { conservativeAmenities} from "../../utils/amenities";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const AmenitiesInput = ({ defaultValue }) => {
  const [selectedAminities, setSelectedAmenities] = useState(defaultValue||conservativeAmenities);
  const handleChange = (amenities) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenities.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };
  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(selectedAminities)}
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {selectedAminities.map((amenities) => {
          return (
            <div key={amenities.name} className="flex items-center space-x-2">
              <Checkbox
                id={amenities.name}
                checked={amenities.selected}
                onCheckedChange={() => handleChange(amenities)}
              />
              <label
                htmlFor={amenities.name}
                className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
              >
                {amenities.name}
                {amenities.icon()}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AmenitiesInput;
