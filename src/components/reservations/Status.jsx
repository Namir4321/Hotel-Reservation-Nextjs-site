import StatusCard from "@/components/admin/StatusCard";
import {fetchReservationStatus} from "@/utils/action"
import formatCurrency from "@/utils/format";

const Status = async () => {
  const stats = await fetchReservationStatus();

  return (
    <>
      <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatusCard title="properties" value={stats.properties} />
        <StatusCard title="Nights" value={stats.nights} />
        <StatusCard title="Amount" value={formatCurrency(stats.amount)} />
      </div>
    </>
  );
};

export default Status;
