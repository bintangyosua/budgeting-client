"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function ChartjsPie(props: { data: number[] }) {
  const state = {
    type: "doughnut",
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        backgroundColor: ["#22C55E", "#EF4444"],
        borderColor: ["#22C55E", "#EF4444"],
        data: props.data,
      },
    ],
  };

  return (
    <Pie
      itemType="doughnut"
      data={state}
      style={{ width: "100%" }}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Income vs Expense",
          },
          legend: {
            position: "right",
          },
        },
      }}></Pie>
  );
}
