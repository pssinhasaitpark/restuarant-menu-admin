import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = () => {
  // Sample data matching the chart in the image
  const data = [
    { day: 'Sunday', orders: 320 },
    { day: 'Monday', orders: 380 },
    { day: 'Tuesday', orders: 450 },
    { day: 'Wednesday', orders: 320 },
    { day: 'Thursday', orders: 380 },
    { day: 'Friday', orders: 350 },
    { day: 'Saturday', orders: 450 }
  ];

  // Custom tooltip component to match the design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '8px', 
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
          border: '1px solid #e0e0e0'
        }}>
          <p style={{ fontWeight: 500, margin: '0 0 2px 0' }}>{`${payload[0].value} Order`}</p>
          <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>Oct 15th, 2023</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>456 Order</h3>
        <p style={{ fontSize: '0.875rem', color: '#777', margin: '0' }}>Oct 15th, 2023</p>
      </div>

      <div style={{ width: '500', height: 240 }}>
        <ResponsiveContainer>
          <LineChart 
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              fill="url(#colorOrders)"
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;