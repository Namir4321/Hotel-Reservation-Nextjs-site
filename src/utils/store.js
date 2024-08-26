import { create } from "zustand";
// import { DateRange } from "react-day-picker";

export const useProperty = create(() => {
  return {
    propertyId: "",
    price: 0,
    bookings: [],
    range: undefined,
  };
});
