import { Table } from "@radix-ui/themes";
import EditTransaction from "./EditTransactions";
import DeleteTransaction from "./DeleteTransaction";
import { useAppSelector } from "@/redux/store";
import { TransactionState } from "@/zustand/useTransactionsStore";

export default function TransactionsTable({
  transactions,
}: {
  transactions: TransactionState[];
}) {
  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

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
  );
}
