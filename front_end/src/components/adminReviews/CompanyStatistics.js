import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { get } from '../../utils/serverCall';

function TopRatedCompanies() {
  const [data, setData] = useState([]);

  const getTopRatedCompanies = () => {
    get('/getTopRatedCompanies', {})
      .then((result) => {
        console.log(result);
        // const temp = result.map((each) => ({ name: each.name, count: each.views[input] }));
        setData(result);
        // setData(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getTopRatedCompanies();
  }, []);

  return (
    <>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <Typography variant="h6" gutterBottom component="div">
        Top rated companies
      </Typography>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 30,
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
          // label={{ value: 'random text', position: 'bottom', offset: 15 }}
        />
        <YAxis
          label={{
            value: 'Avg ratings',
            angle: -90,
            position: 'insideBottomLeft',
            textAnchor: 'middle',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>{' '}
    </>
    // </ResponsiveContainer>
  );
}

export default TopRatedCompanies;
