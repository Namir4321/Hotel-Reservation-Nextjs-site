import {
  StatusLoadingContainer,
  ChartLoadingContainer,
} from "@/components/admin/Loading"
import  StatusContainer  from "@/components/admin/StatusContainer"
import  ChartContainer  from "@/components/admin/ChartContainer"
import { Suspense } from "react";

const AdminPage = () => {
  return (
    <>
      <Suspense fallback={<StatusLoadingContainer />}>
        <StatusContainer />
      </Suspense>
      <Suspense fallback={<ChartLoadingContainer />}>
        <ChartContainer />
      </Suspense>
    </>
  );
};

export default AdminPage;
