import { setTransactions } from "@/redux/features/transactions-slice";
import { AppDispatch } from "@/redux/store";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function DeleteTransaction({
  transactionId,
}: {
  transactionId: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/transactions/${transactionId}`)
      .then((res) => {
        dispatch(setTransactions(res.data));
      });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" color="red">
          Delete
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete</Dialog.Title>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => handleDelete()}>Delete</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
