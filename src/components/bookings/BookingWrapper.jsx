"use client"
import { useProperty } from "@/utils/store";
import BookingCalander from "@/components/bookings/BookingCalander";
import BookingContainer from "@/components/bookings/BookingContainer";
import { useEffect } from "react";
const BookingWrapper = ({ propertyId, price, bookings }) => {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    });
  });
  return <>
<BookingCalander/>
<BookingContainer/>
  </>;
};

export default BookingWrapper;
