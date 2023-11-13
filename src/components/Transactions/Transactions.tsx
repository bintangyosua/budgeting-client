"use client";
import {
  TransactionState,
  setTransactions,
} from "@/redux/features/transactions-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AddTransaction from "./AddTransaction";
import { useEffect, useState } from "react";

export default function Transactions() {
  const { data: session, status } = useSession();

  // const data = store.dispatch(getUserTransactions(session?.user?.email));
  // console.log(data);

  const dispatch = useDispatch<AppDispatch>();
  const trans: TransactionState[] = useAppSelector(
    (state) => state.transactionReducer.value
  );

  const [transactions, setTransactions] = useState<TransactionState[]>([]);

  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/users/${session?.user?.email}/transactions`
      )
      .then((res) => {
        setTransactions(res.data);
      });
  }, [trans]);

  return (
    <div>
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
          {transactions.map((value, key) => {
            return (
              <Table.Row key={key}>
                <Table.RowHeaderCell>
                  {value.date as unknown as string}
                </Table.RowHeaderCell>
                <Table.Cell>{value.amount}</Table.Cell>
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
                <Table.Cell></Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
