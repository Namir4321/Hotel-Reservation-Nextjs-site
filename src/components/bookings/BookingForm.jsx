import { useProperty } from "@/utils/store";
import { calculateTotals } from "@/utils/CalculateTotals";
import formatCurrency from "@/utils/format";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
const BookingForm = () => {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from;
  const checkOut = range?.to;

  const { totalNights, subTotal, cleaning, service, tax, orderTotal } =
    calculateTotals({
      checkIn,
      checkOut,
      price,
    });
  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <FormRow label={`${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label={`Cleaning Fee`} amount={cleaning} />
      <FormRow label={`Service Fee`} amount={service} />
      <FormRow label={`Tax`} amount={tax} />
      <Separator className="mb-4" />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
};

export const FormRow=({label,amount})=>{
  return <p className="flex justify-between text-sm mb-2">
    <span>{label}</span>
    <span>{formatCurrency(amount)}</span>
  </p>
}


export default BookingForm;
