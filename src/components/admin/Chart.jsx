"use client";

import {
  BarChart,
  Bar,
  XAxis,
  yAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
const Chart = ({ data }) => {
  let {date,count}=data;
  return <section className="mt-24">
    <h1 className="text-4xl font-semibold text-center">Monthly Bookings</h1>
 <ResponsiveContainer width="100%" height={300}>
  <BarChart data={data} margin={{top:50}}>
    <CartesianGrid strokeDasharray={'3 3'}/>
    <XAxis dataKey='date'/>
    <YAxis allowDecimals={false}/>
    <Tooltip/>
    <Bar dataKey='count'fill="#0000FF"barSize={75}/>
  </BarChart>
 </ResponsiveContainer>
  </section>;
};

export default Chart;
