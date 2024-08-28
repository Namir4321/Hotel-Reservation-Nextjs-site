import { fetchStatus } from "@/utils/action";
import StatusCard from "@/components/admin/StatusCard";
const StatusContainer = async () => {
  const data = await fetchStatus();
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatusCard title="user" value={data.usersCount || 0} />
      <StatusCard title="properties" value={data.propertiesCount || 0} />
      <StatusCard title="bookings" value={data.bookingsCount || 0} />
    </div>
  );
};

export default StatusContainer;
