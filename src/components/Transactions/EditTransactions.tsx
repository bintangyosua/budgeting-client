"use client";

import { CategoryState } from "@/redux/features/categories-slice";
import { WalletState } from "@/redux/features/wallets-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  TransactionState,
  setTransactions as postTransactions,
} from "@/redux/features/transactions-slice";

export default function EditTransaction({
  transaction,
}: {
  transaction: TransactionState;
}) {
  const { data: session, status } = useSession();
  const [date, setDate] = useState<string | Date>(transaction.date);
  const [amount, setAmount] = useState<number | string>(transaction.amount);
  const [categoryId, setCategoryId] = useState<number | string>(
    transaction.category_id
  );
  const [walletId, setWalletId] = useState<number | string>(
    transaction.wallet_id
  );
  const [description, setDescription] = useState<string>(
    transaction.description
  );
  const user = useAppSelector((state) => state.authReducer.value);

  const dispatch = useDispatch<AppDispatch>();

  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

  useEffect(() => {
    // Set nilai state saat transaction berubah
    setDate(transaction.date);
    setAmount(transaction.amount);
    setCategoryId(transaction.category_id);
    setWalletId(transaction.wallet_id);
    setDescription(transaction.description);
  }, [transaction]);

  const handleSubmit = () => {
    const body = {
      date: date,
      amount: amount,
      category_id: categoryId,
      wallet_id: walletId,
      description: description,
      user_id: user.id,
    };
    axios
      .post(`http://127.0.0.1:8000/api/transactions/${transaction.id}`, body)
      .then(() => {
        axios
          .get(`http://127.0.0.1:8000/api/users/${user.id}/transactions`)
          .then((res) => {
            dispatch(postTransactions(res.data));
            console.log("transactions diupdate");
          });
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Transaction</Dialog.Title>
        <form>
          <Flex direction="column" className="space-y-3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Date
              </Text>
              <TextField.Input
                type="date"
                defaultValue={`${date}`}
                placeholder="Enter the transaction's date"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setDate(event.target.value);
                }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Input
                type="number"
                defaultValue={amount}
                placeholder="Enter the amount of transaction"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setAmount(event.target.value)
                }
              />
            </label>
            <div className="flex justify-between space-x-3 ">
              <div className="flex flex-col w-1/2 space-y-3">
                <label htmlFor="category">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Category
                  </Text>
                  <Select.Root
                    defaultValue={`${categoryId}`}
                    size="2"
                    name="category"
                    onValueChange={(event) => {
                      setCategoryId(event);
                    }}>
                    <Select.Trigger className="w-full" />
                    <Select.Content position="popper">
                      <Select.Group>
                        <Select.Label>Expenses</Select.Label>
                        {categories &&
                          categories.map((val) => {
                            if (val.category_type_id === 1)
                              return (
                                <Select.Item value={`${val.id}`} key={val.id}>
                                  {val.name}
                                </Select.Item>
                              );
                          })}
                      </Select.Group>
                      <Select.Group>
                        <Select.Label>Incomes</Select.Label>
                        {categories &&
                          categories.map((val) => {
                            if (val.category_type_id === 2)
                              return (
                                <Select.Item value={`${val.id}`} key={val.id}>
                                  {val.name}
                                </Select.Item>
                              );
                          })}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </label>
              </div>
              <div className="flex flex-col w-1/2 space-y-3">
                <label htmlFor="wallet">
                  <Text as="div" size="2" mb="1" weight="bold">
                    Wallet
                  </Text>
                  <Select.Root
                    defaultValue={`${walletId}`}
                    size="2"
                    name="wallet"
                    onValueChange={(event) => {
                      setWalletId(event);
                    }}>
                    <Select.Trigger className="w-full" />
                    <Select.Content position="popper">
                      {wallets &&
                        wallets.map((val) => (
                          <Select.Item value={`${val.id}`} key={val.id}>
                            {val.name}
                          </Select.Item>
                        ))}
                    </Select.Content>
                  </Select.Root>
                </label>
              </div>
            </div>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                placeholder="Enter the description"
                value={description}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(event.target.value)
                }
              />
            </label>
          </Flex>
        </form>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => handleSubmit()}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
