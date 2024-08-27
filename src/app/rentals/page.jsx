import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import formatCurrency from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Submit";
import {
  fetchBookings,
  deleteBookingAction,
  fetchRentals,
  deletePropertyAction,
} from "@/utils/action";
const RentalPage = async () => {
  const rentals = await fetchRentals();
  if (rentals.length === 0) {
    return (
      <EmptyList heading="No rentals to dispaly" message="Create new Rentals" />
    );
  }
  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">active properties:{rentals.length}</h4>
      <Table>
        <TableCaption>A list of all the your properties</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nigths Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price } = rental;
            const { totalNightsSum, orderTotalSum } = rental;
            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/rentals/${propertyId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteRental propertyId={propertyId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export const DeleteRental = ({ propertyId }) => {
  const DeleteRentalAction = deletePropertyAction.bind(null, {
    propertyId,
  });
  return (
    <FormContainer action={DeleteRentalAction}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
export default RentalPage;
