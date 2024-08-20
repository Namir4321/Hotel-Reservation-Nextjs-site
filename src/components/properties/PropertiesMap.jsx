"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import {findCountryByCode} from "@/utils/countries"
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});
import { findByCountryCode } from "@/utils/countries";
import CountryFlag from "../card/CountryFlag";
import Title from "./Title";

const PropertiesMap = ({ CountryCode }) => {
  const defaultLocation = [51.505, -0.09];
  const location = findCountryByCode(CountryCode)?.location;
  return (
    <div className="mt-4">
      <div className="mb-4">
        <Title text="where you would be staying" />
        <CountryFlag countryCode={CountryCode} />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-[50vh] rounded-lg relative z-0 "
        center={location || defaultLocation}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker position={location || defaultLocation} icon={markerIcon} />
      </MapContainer>
    </div>
  );
};

export default PropertiesMap;
