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
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { get } from "../../utils/serverCall";
import { Typography } from "@mui/material";

function MostViewedCompanies() {
  const getDate = (date = new Date()) =>{
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().substring(0, 10)
  };
  const [date, setDate] = useState(getDate());
  const [data, setData] = useState([]);

  const getMostViewedCompanies = (input) => {
    get("/getMostViewedCompanies", { date: input })
      .then((result) => {
        const temp = result.map((each) => ({
          name: each.name,
          count: each.views[input],
        }));
        setData(temp);
        // setData(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMostViewedCompanies(date);
  }, []);

  const onDateChange = (e) => {
    setDate(e.target.value);
    getMostViewedCompanies(e.target.value);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Most viewed companies
      </Typography>
      <FloatingLabel
        style={{ width: "fit-content" }}
        controlId="dob"
        label="Date of Birth"
        className="mb-3"
      >
        <Form.Control
          name="dob"
          type="date"
          required
          value={date}
          onChange={onDateChange}
        />
      </FloatingLabel>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
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
            value: "No of Views",
            angle: -90,
            position: "insideBottomLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>{" "}
    </>
    // </ResponsiveContainer>
  );
}

export default MostViewedCompanies;
