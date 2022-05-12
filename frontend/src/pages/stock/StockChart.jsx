// import React from 'react';
// import {Line} from 'react-chartjs-2';

// // const data = {
// //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// //   datasets: [
// //     {
// //       label: 'History',
// //       fill: false,
// //       lineTension: 0.1,
// //       backgroundColor: 'rgba(75,192,192,0.4)',
// //       borderColor: 'rgba(75,192,192,1)',
// //       borderCapStyle: 'butt',
// //       borderDash: [],
// //       borderDashOffset: 0.0,
// //       borderJoinStyle: 'miter',
// //       pointBorderColor: 'rgba(75,192,192,1)',
// //       pointBackgroundColor: '#fff',
// //       pointBorderWidth: 1,
// //       pointHoverRadius: 5,
// //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
// //       pointHoverBorderColor: 'rgba(220,220,220,1)',
// //       pointHoverBorderWidth: 2,
// //       pointRadius: 1,
// //       pointHitRadius: 10,
// //       data: [65, 59, 80, 81, 56, 55, 40]
// //     }
// //   ]
// // };

// // function StockChart() {
// //   return (
// //     <div>
      
// //       <Line data={data} />
// //     </div>


    
// //   );
// // }
//   const StockChart=()=>{
//     return (
//       <div>여기에 차트</div>
//     )
//   }

// export default StockChart;

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
function StockChart() {
  const [data, setData]=useState({});
  useEffect(()=>{
   
    const fetchData =async ()=> {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response)=>response.json())
        .then((data)=>console.log('stockchart:',data));
     
    }
    fetchData();
      
  },[]);
  return (
    <div>여기에 주식차트
      {data?.length > 0 && (
        <Line
          data={{
            datasets:[
              {
                backgroundColor: "rgba(204,16,52,0.2)",
                borderColor : "#CC1034",
                data : data ,
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