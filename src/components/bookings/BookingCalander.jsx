"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";
import {
  generateDisabledDates,
  generateDateRanges,
  generateBlockedPeriods,
  defaultSelected,
} from "@/utils/calander";
const BookingCalander = () => {
  const currentDate = new Date();
  const [range, setRange] = useState(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const { toast } = useToast();
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  const unavaliableDates = generateDisabledDates(blockedPeriods);
  useEffect(() => {
    const selectedRange = generateDateRanges(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavaliableDates[date]) {
        setRange(defaultSelected);
        toast({
          description:"Some dates are booked.Please select again",
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range]);
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
};

export default BookingCalander;
