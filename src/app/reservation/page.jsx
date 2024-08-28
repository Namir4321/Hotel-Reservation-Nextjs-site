import EmptyList from "@/components/home/EmptyList";
import CountryFlag from "@/components/card/CountryFlag";
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
import { fetchReservations } from "@/utils/action";
import Status from "@/components/reservations/Status";
const ReservationPage = async () => {
  const reservation = await fetchReservations();
  if (!reservation.length === 0) return <EmptyList />;
  return (<>
  <Status/>
    <div className="mt-16">
      <h4 className="mb-4 capitalize">
        total reservation:{reservation.length}
      </h4>
      <Table>
        <TableCaption>A list of your recent reservation</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservation.map((item) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = item;
            const { id: propertyId, name, country } = item.property;

            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlag countryCode={country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
               
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </>
  );
};

export default ReservationPage;
