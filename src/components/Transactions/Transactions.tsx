"use client";
import transaction from "@/data/expense";
import { getTransactions } from "@/redux/features/transactions-slice";
import { AppDispatch } from "@/redux/store";
import { getUserTransactions, store } from "@/redux/userAction";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AddTransaction from "./AddTransaction";

export default function Transactions() {
  const { data: session, status } = useSession();

  // const data = store.dispatch(getUserTransactions(session?.user?.email));
  // console.log(data);

  const dispatch = useDispatch<AppDispatch>();

  // dispatch(getTransactions());

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
          {/* {data.map((value, key) => (
          <Table.Row key={key}>
            <Table.RowHeaderCell>{value.date}</Table.RowHeaderCell>
            <Table.Cell>{value.amount}</Table.Cell>
            <Table.Cell>{value.category}</Table.Cell>
            <Table.Cell>{value.description}</Table.Cell>
            <Table.Cell>{value.wallet}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))} */}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
