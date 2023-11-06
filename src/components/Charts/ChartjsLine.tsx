"use client";
import { Line } from "react-chartjs-2";
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

type row = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
};

export default function ChartjsLine(props: {
  data: {
    labels: string[];
    datasets: {
      fill: boolean;
      label: string;
      backgroundColor: string;
      borderColor: string;
      data: number[];
    }[];
  };
  classname?: string | "";
}) {
  return (
    <Line
      className={props.classname}
      data={props.data}
      // style={{ width: "100%" }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Spends",
          },
        },
        scales: {},
      }}></Line>
  );
}
