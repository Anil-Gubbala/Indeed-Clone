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
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { get } from '../../utils/serverCall';

function MostReviewedCompanies() {
  const [data, setData] = useState([]);

  const getMostReviewedCompanies = () => {
    get('/getMostReviewedCompanies', {})
      .then((result) => {
        console.log(result);
        // const temp = result.map((each) => ({ name: each.name, count: each.views[input] }));
        setData(result);
        // setData(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMostReviewedCompanies();
  }, []);

  return (
    <>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
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
          dataKey="date"
          textAnchor="end"
          sclaeToFit="true"
          verticalAnchor="start"
          interval={0}
          angle="-30"
          // label={{ value: 'random text', position: 'bottom', offset: 15 }}
        />
        <YAxis
          label={{
            value: 'No of Views',
            angle: -90,
            position: 'insideLeft',
            textAnchor: 'middle',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>{' '}
    </>
    // </ResponsiveContainer>
  );
}

export default MostReviewedCompanies;
