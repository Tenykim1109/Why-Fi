import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineController,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {};
const buildChartData = (data, companyType) => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.엔터) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[companyType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[companyType][date];
    // console.log(lastDataPoint);
  }
  return chartData;
};

function StockChart({ companyType, ...props }) {
  const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch("list.json")
  //       .then((response) => response.json())
  //       .then((data) => console.log("stockchart:", data));
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("list.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, companyType);
          setData(chartData);
          // console.log(data.엔터);
        });
    };
    fetchData();
  }, [companyType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.2)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default StockChart;
