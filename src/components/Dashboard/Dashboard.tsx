"use client";

import { incomes } from "@/data/income";
import ChartjsBar from "../Charts/ChartjsBar";
import { expenses } from "@/data/expense";
import { fetchExpenses } from "@/services/fetchData";
import ChartjsDoughnut from "../Charts/ChartjsDoughnut";
import TopTransaction from "../Dashboard/TopTransaction/TopTransaction";

export default function Dashboard() {
  const doughnutData = fetchExpenses();
  return (
    <div className="w-full text-black">
      <div className="flex justify-between">
        <h1 className="pb-5 text-4xl font-bold text-black">Rp717,000</h1>
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
        <TopTransaction name="Saved" amount={5500000} percentage={7} />
        <TopTransaction
          name="Incoming Transfer"
          amount={2375000}
          percentage={-10}
        />
        <TopTransaction name="Other Income" amount={12000000} percentage={20} />
        <TopTransaction name="Other Income" amount={12000000} percentage={20} />
        <TopTransaction name="Other Income" amount={12000000} percentage={20} />
      </div>
      <div className="py-6">
        <h3 className="px-1 text-xl font-semibold text-zinc-900">
          Spending Report
        </h3>
        <div className="justify-between w-full xl:flex">
          <div className="xl:w-[64%] px-8 py-5 my-3 rounded-3xl">
            <ChartjsBar data={data} />
          </div>
          <div className="xl:w-[35%] px-8 my-3 rounded-3xl">
            <ChartjsDoughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}

const labels: string[] = [];

incomes.map((item, i) => {
  labels.push(item.date);
});

expenses.map((item, i) => {
  if (!labels.includes(item.date)) {
    labels.push(item.date);
  }
});

let incomeData: number[] = [];

incomes.map((item, i) => {
  if (item.date === labels[i]) {
    incomeData.push(item.amount);
  } else {
    incomeData.push(0);
  }
});

let expenseData: number[] = [];
expenses.map((item, i) => {
  if (item.date === labels[i]) {
    expenseData.push(item.amount);
  } else {
    expenseData.push(0);
  }
});

const datasets = [
  {
    fill: true,
    label: "Income",
    backgroundColor: "rgb(57,126,232, 0.7)",
    borderColor: "#397EE8",
    data: incomeData,
  },
  {
    fill: true,
    label: "Expense",
    backgroundColor: "rgb(239,68,68, 0.7)",
    borderColor: "#EF4444",
    data: expenseData,
  },
];

const data = {
  labels: labels,
  datasets: datasets,
};
