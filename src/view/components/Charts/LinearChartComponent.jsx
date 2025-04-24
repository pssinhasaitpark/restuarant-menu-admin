import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ totalOrders }) => {
  const [chartData, setChartData] = useState([
    { day: 'Sunday', orders: 0 },
    { day: 'Monday', orders: 0 },
    { day: 'Tuesday', orders: 0 },
    { day: 'Wednesday', orders: 0 },
    { day: 'Thursday', orders: 0 },
    { day: 'Friday', orders: 0 },
    { day: 'Saturday', orders: 0 },
  ]);

  useEffect(() => {

    if (totalOrders) {
      const updatedChartData = [
        { day: 'Sunday', orders: Math.round(totalOrders * 0.1) },
        { day: 'Monday', orders: Math.round(totalOrders * 0.15) },
        { day: 'Tuesday', orders: Math.round(totalOrders * 0.12) },
        { day: 'Wednesday', orders: Math.round(totalOrders * 0.1) },
        { day: 'Thursday', orders: Math.round(totalOrders * 0.15) },
        { day: 'Friday', orders: Math.round(totalOrders * 0.18) },
        { day: 'Saturday', orders: Math.round(totalOrders * 0.2) },
      ];

      setChartData(updatedChartData);
    }
  }, [totalOrders]); 

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
          }}
        >
          <p style={{ fontWeight: 500, margin: '0 0 2px 0' }}>{`${payload[0].value} Orders`}</p>
          <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>October 2023</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis hide={true} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            fill="url(#colorOrders)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
