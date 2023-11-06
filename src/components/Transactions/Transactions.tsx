import transaction from "@/data/expense";
import { Table } from "@radix-ui/themes";
import axios from "axios";

export default async function Transactions() {
  const res = await axios.get("http://127.0.0.1:8000/api/transactions");
  const data: transaction[] = res.data;
  console.log(data);
  return (
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
        {data.map((value, key) => (
          <Table.Row key={key}>
            <Table.RowHeaderCell>{value.date}</Table.RowHeaderCell>
            <Table.Cell>{value.amount}</Table.Cell>
            <Table.Cell>{value.category}</Table.Cell>
            <Table.Cell>{value.description}</Table.Cell>
            <Table.Cell>{value.wallet}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
