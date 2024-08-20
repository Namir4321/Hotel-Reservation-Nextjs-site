"use client";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
const BookingCalander = () => {
  const currentDate = new Date();
  const defaultSelected = { from: "", to: "" };
  const [range, setRange] = useState(defaultSelected);
  return (
    <Calendar mode="range" defaultMonth={currentDate} selected={range} onSelect={setRange} />
  );
};
 
export default BookingCalander;
