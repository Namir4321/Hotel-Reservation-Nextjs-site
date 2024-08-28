import { fetchChartsData } from "@/utils/action";
import Chart from "@/components/admin/Chart";

const ChartContainer = async () => {
  const bookings = await fetchChartsData();
  console.log(bookings)
  if (bookings.length < 1) return null;
  return <Chart data={bookings} />;
};

export default ChartContainer;
