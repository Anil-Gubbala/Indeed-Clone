import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
} from "recharts";
import { get } from "../../utils/serverCall";

function ReviewsPerDay() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const today = new Date();
    const past = new Date();
    past.setDate(past.getDate() - 7);
    get("/getReviewsCountByDay", { start: past, end: today })
      .then((result) => {
        const data = result.map((each) => ({
          date: each.dateOnly.substring(0, 10),
          count: each.total,
        }));
        console.log(data);
        setData(data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <Typography variant="h6" gutterBottom component="div">
        No of reviews per day
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
            value: "Review Count",
            angle: -90,
            position: "insideBottomLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </>
  );
}

export default ReviewsPerDay;
