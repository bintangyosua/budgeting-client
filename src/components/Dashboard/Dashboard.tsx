"use client";

import ChartjsBar from "../Charts/ChartjsBar";
import { fetchExpenses } from "@/services/fetchData";
import ChartjsDoughnut from "../Charts/ChartjsDoughnut";
import TopTransaction from "../Dashboard/TopTransaction/TopTransaction";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { TransactionState } from "@/zustand/useTransactionsStore";

type lineAreaType = {
  labels: string[];
  datasets: {
    fill: boolean;
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
  }[];
};

export type doughnutType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export default function Dashboard() {
  const transactions = useAppSelector((state) => [
    ...state.transactionReducer.value,
  ]);

  const [lineAreaData, setLineAreaData] = useState<lineAreaType>();
  const [doughnutData, setDoughnutData] = useState<doughnutType>();
  const [differ, setDiffer] = useState<number>();

  const graph = useAppSelector((state) => state.graphReducer.value);

  useEffect(() => {
    const getMonthName = (monthNumber: number) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Assuming monthNumber is 1-indexed (January is 1, February is 2, etc.)
      return months[monthNumber - 1];
    };

    const labels: string[] = graph.map((value) => getMonthName(value.month));
    const datasets = [
      {
        fill: true,
        label: "Income",
        backgroundColor: "#397EE8",
        borderColor: "#397EE8",
        data: graph.map((value) => value.sum_category_2),
      },
      {
        fill: true,
        label: "Expense",
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        data: graph.map((value) => value.sum_category_1),
      },
    ];

    setLineAreaData({
      labels,
      datasets,
    });

    console.log({ graph });

    const sumCategory2 = graph
      .map((value) => Number(value.sum_category_2 || 0))
      .reduce((acc, item) => acc + item, 0);

    const sumCategory1 = graph
      .map((value) => Number(value.sum_category_1 || 0))
      .reduce((acc, item) => acc + item, 0);

    setDiffer(sumCategory2 - sumCategory1);

    setDoughnutData({
      datasets: [
        {
          label: "Total",
          borderColor: ["#EF4444", "#397EE8"],
          backgroundColor: ["#EF4444", "#397EE8"],
          borderWidth: 1,
          data: [sumCategory1, sumCategory2],
        },
      ],
      labels: ["Expenses", "Incomes"],
    });
  }, [graph]);
  return (
    <div className="w-full text-black">
      <div className="flex justify-between">
        <h1 className="pb-5 text-4xl font-bold text-black">
          {differ?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </h1>
      </div>
      <div className="px-8 py-5 bg-zinc-200 rounded-3xl md:hidden">
        <h3 className="text-2xl">My Wallets</h3>
        <hr className="my-3" />
        <div className="flex flex-col justify-between space-y-2 text-lg">
          <div className="flex justify-between">
            <span>Cash</span>
            <span>Rp 717.000</span>
          </div>
          <div className="flex justify-between">
            <span>Banks</span>
            <span>Rp 834.000</span>
          </div>
          <div className="flex justify-between">
            <span>E-Wallets</span>
            <span>Rp 215.000</span>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex xl:flex-row xl:justify-between xl:space-x-3 max-h-48">
        {/* <TopTransaction
          name="Incoming Transfer"
          amount={2375000}
          percentage={-10}
        />
        <TopTransaction name="Other Income" amount={12000000} percentage={20} />
        <TopTransaction name="Other Income" amount={12000000} percentage={20} /> */}
      </div>
      <div className="py-6">
        <h3 className="px-1 text-xl font-semibold text-zinc-900">
          Spending Report
        </h3>
        <div className="justify-between w-full xl:flex">
          <div className="xl:w-[64%] px-8 py-5 my-3 rounded-3xl">
            {lineAreaData && <ChartjsBar data={lineAreaData} />}
          </div>
          <div className="xl:w-[35%] px-8 my-3 rounded-3xl">
            {doughnutData && <ChartjsDoughnut data={doughnutData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
