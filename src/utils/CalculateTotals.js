import { calculateDaysBetween } from "@/utils/calander";

export const calculateTotals = ({ checkIn, checkOut, price }) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const cleaning = 21;
  const service = 40;
  const tax = subTotal * 0.1;
  const orderTotal = subTotal + cleaning + service + tax;
  return { totalNights, subTotal, cleaning, service, tax, orderTotal };
};
