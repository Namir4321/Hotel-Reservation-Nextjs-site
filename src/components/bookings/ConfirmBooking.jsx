"use client";
import { createBookingAction, getAuthUser } from "@/utils/action";
import { useProperty } from "@/utils/store";
import SubmitButton, { ReserveSigninButton } from "../form/Submit";
import FormContainer from "../form/FormContainer";

const ConfirmBooking = async () => {
  const { propertyId, range } = useProperty((state) => state);
  const userId = await getAuthUser();
  const checkIn = range?.from;
  const checkOut = range?.to;
  if (!userId) {
    return <ReserveSigninButton />;
  }
  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });
  return <section>
    <FormContainer action={createBooking}>
      <SubmitButton text='Reserve' className='w-full'/>
    </FormContainer>
  </section>;
};

export default ConfirmBooking;
