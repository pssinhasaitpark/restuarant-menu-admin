import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Sun", orders: 30 },
  { name: "Mon", orders: 40 },
  { name: "Tue", orders: 50 },
  { name: "Wed", orders: 60 },
  { name: "Thu", orders: 70 },
  { name: "Fri", orders: 80 },
  { name: "Sat", orders: 90 },
];

const BarChartComponent = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="orders" fill="#82ca9d" />
    </BarChart>
  );
};

export default BarChartComponent;
