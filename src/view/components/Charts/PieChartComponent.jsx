import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

const data = [
  { name: "Total Orders", value: 50, color: "#FF6384" },
  { name: "Customer Growth", value: 22, color: "#36A2EB" },
  { name: "Total Revenue", value: 62, color: "#FFCE56" },
];

const PieChartComponent = () => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartComponent;
