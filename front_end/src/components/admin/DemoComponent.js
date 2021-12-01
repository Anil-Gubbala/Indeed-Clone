import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function DemoComponent() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      amt: 2100,
    },
  ];
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid vertical />
      <XAxis
        dataKey="name"
        textAnchor="end"
        sclaeToFit="true"
        verticalAnchor="start"
        interval={0}
        angle="-30"
        label={{ value: 'random text', position: 'bottom', offset: 15 }}
      />
      <YAxis
        label={{ value: 'pv of page', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}
      />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey="pv" fill="#8884d8" /> */}
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    // </ResponsiveContainer>
  );
}

export default DemoComponent;
