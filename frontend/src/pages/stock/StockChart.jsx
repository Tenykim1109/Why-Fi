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
const buildChartData = (data, stockType) => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.A) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[stockType][date],
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[stockType][date];
    console.log("라스트데이터포인트", data[stockType]);
  }
  return chartData;
};

function StockChart({ companyType, stockType, ...props }) {
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
      // await fetch("list.json")
      await fetch("https://k6d108.p.ssafy.io/api/bankbooks/stockgraph/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, stockType);
          setData(chartData);
          // console.log(stockType, data);
        });
    };
    fetchData();
  }, [stockType]);

  return (
    <div>
      <h3>{companyType}주의 주식차트</h3>
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
