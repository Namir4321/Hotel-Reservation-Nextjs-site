import { Card, CardHeader } from "@/components/ui/card";
const StatusCard = ( {title, value} ) => {
  return (
    <Card className="bg-mutedd">
      <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="capitalize text-3xl font-bold">{title}</h3>
        <span className="text-primary text-5xl font-extrabold">{value}</span>
      </CardHeader>
    </Card>
  );
};

export default StatusCard;
