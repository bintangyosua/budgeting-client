import { expenses } from "@/data/expense";
import { incomes } from "@/data/income";
import { useState } from "react";
import transaction from "@/data/expense";

export function fetchExpenses() {
  const [startDate, setStartDate] = useState(new Date());
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
  expenses.map((item: transaction, i: number) => {
    if (item.date === labels[i]) {
      expenseData.push(item.amount);
    } else {
      expenseData.push(0);
    }
  });

  let pieData: number[] = [];
  let count = 0;
  incomeData.forEach((item, i) => {
    count += item;
  });
  pieData.push(count);
  count = 0;
  expenseData.forEach((item, i) => {
    count += item;
  });
  pieData.push(count);

  const doughnutData = {
    datasets: [
      {
        label: "Total",
        data: pieData,
        backgroundColor: ["#397EE8", "#EF4444"],
        borderColor: ["#397EE8", "#EF4444"],
        borderWidth: 1,
      },
    ],
    labels: ["Income", "Expense"],
  };

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

  return doughnutData;
}
