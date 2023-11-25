import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { doughnutType } from "../Dashboard/Dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

type dataset = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};

export default function ChartjsDoughnut(props: { data: doughnutType }) {
  return (
    <Doughnut
      data={props.data}
      options={{
        plugins: {
          legend: {
            position: "right" as const,
          },
        },
      }}
      className="w-full p-0 mx-auto"
    />
  );
}
