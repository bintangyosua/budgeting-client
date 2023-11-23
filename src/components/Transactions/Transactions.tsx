"use client";
import {
  TransactionState,
  getTransactions,
  setTransactions as setTransacts,
} from "@/redux/features/transactions-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button, Table } from "@radix-ui/themes";
import axios, { AxiosDefaults, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AddTransaction from "./AddTransaction";
import { useEffect, useState } from "react";
import DeleteTransaction from "./DeleteTransaction";
import EditTransaction from "./EditTransactions";

export default function Transactions() {
  const { data: session, status } = useSession();

  // const data = store.dispatch(getUserTransactions(session?.user?.email));

  const dispatch = useDispatch<AppDispatch>();
  const trans: TransactionState[] = useAppSelector(
    (state) => state.transactionReducer.value
  );

  const [transactions, setTransactions] = useState<TransactionState[]>([]);
  const [pickedTransaction, setPickedTransaction] =
    useState<TransactionState>();
  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/users/${session?.user?.email}/transactions`
      )
      .then((res: AxiosResponse) => {
        setTransactions(res.data);
      });
    console.log("getTransactions selesai di transactions");
  }, [trans]);

  return (
    <div className="w-full">
      <AddTransaction />
      <Table.Root size={"3"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Wallet</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.length > 0 ? (
            transactions.map((value, key) => {
              return (
                <Table.Row key={key}>
                  <Table.RowHeaderCell>
                    {value.date as unknown as string}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {value.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    {categories.map((val) =>
                      val.id === value.category_id ? val.name : ""
                    )}
                  </Table.Cell>
                  <Table.Cell>{value.description}</Table.Cell>
                  <Table.Cell>
                    {wallets.map((val) =>
                      val.id === value.wallet_id ? val.name : ""
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <span>
                        <EditTransaction transaction={value} />
                      </span>
                      <DeleteTransaction transaction={value} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6}>No transactions made</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
