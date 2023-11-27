"use client";
import {
  TransactionState,
  getTransactions,
  setTransactions as setTransacts,
} from "@/redux/features/transactions-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Box, Button, Table, Tabs, Text } from "@radix-ui/themes";
import axios, { AxiosDefaults, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AddTransaction from "./AddTransaction";
import { useEffect, useState } from "react";
import DeleteTransaction from "./DeleteTransaction";
import EditTransaction from "./EditTransactions";
import TransactionsTable from "./TransactionsTable";

export default function Transactions() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const transactions: TransactionState[] = useAppSelector(
    (state) => state.transactionReducer.value
  );

  // const [transactions, setTransactions] = useState<TransactionState[]>([]);
  const [pickedTransaction, setPickedTransaction] =
    useState<TransactionState>();
  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

  // useEffect(() => {
  //   setTransactions(trans);
  // }, [trans]);

  return (
    <div className="w-full">
      <div className="block md:hidden">
        <AddTransaction />
      </div>
      <Tabs.Root defaultValue="all">
        <div className="flex justify-between">
          <Tabs.List>
            <Tabs.Trigger value="all">All</Tabs.Trigger>
            <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
            <Tabs.Trigger value="incomes">Incomes</Tabs.Trigger>
          </Tabs.List>
          <div className="hidden md:block">
            <AddTransaction />
          </div>
        </div>
        <Box pt="3" pb="2">
          <Tabs.Content value="all">
            <TransactionsTable transactions={transactions} />
          </Tabs.Content>

          <Tabs.Content value="expenses">
            <TransactionsTable
              transactions={
                transactions
                  ? transactions
                      .map((value) => {
                        const matchingCategory = categories.find(
                          (category) =>
                            value.category_id === category.id &&
                            category.category_type_id === 1
                        );

                        return matchingCategory ? value : undefined;
                      })
                      .filter((transaction) => transaction !== undefined) // Filter out undefined entries
                      .map((transaction) => transaction!) // Non-null assertion
                  : []
              }
            />
          </Tabs.Content>

          <Tabs.Content value="incomes">
            <TransactionsTable
              transactions={
                transactions
                  ? transactions
                      .map((value) => {
                        const matchingCategory = categories.find(
                          (category) =>
                            value.category_id === category.id &&
                            category.category_type_id === 2
                        );

                        return matchingCategory ? value : undefined;
                      })
                      .filter((transaction) => transaction !== undefined) // Filter out undefined entries
                      .map((transaction) => transaction!) // Non-null assertion
                  : []
              }
            />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
