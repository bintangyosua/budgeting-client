"use client";

import { CategoryState } from "@/redux/features/categories-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Select,
  Text,
  TextArea,
} from "@radix-ui/themes";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { WalletState } from "@/redux/features/wallets-slice";
import { setCategories as postCategories } from "@/redux/features/categories-slice";
import { setWallets as postWallets } from "@/redux/features/wallets-slice";
import { useDispatch } from "react-redux";
import { setTransactions } from "@/redux/features/transactions-slice";

export default function AddTransaction() {
  const id = useAppSelector((state) => state.authReducer.value.id);
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [date, setDate] = useState<string | Date>(getFormattedDate());
  const [amount, setAmount] = useState<number | string>("0");
  const [categoryId, setCategoryId] = useState<number | string>("1");
  const [walletId, setWalletId] = useState<number | string>("1");
  const [description, setDescription] = useState<string>("No description");
  const user = useAppSelector((state) => state.authReducer.value);

  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [wallets, setWallets] = useState<WalletState[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const body = {
      date: date,
      amount: amount,
      category_id: categoryId,
      wallet_id: walletId,
      description: description,
      user_id: user.id,
    };

    axios.post("http://127.0.0.1:8000/api/transactions", body).then((res) => {
      dispatch(setTransactions(res.data));
    });
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/categories`).then((res) => {
      setCategories(res.data);
      dispatch(postCategories(res.data));
    });
    axios.get(`http://127.0.0.1:8000/api/wallets`).then((res) => {
      setWallets(res.data);
      dispatch(postWallets(res.data));
    });
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size={"3"} variant="solid">
          Add Transaction
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Add Transaction</Dialog.Title>
        <form>
          <Flex direction="column" className="space-y-3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Date
              </Text>
              <TextField.Input
                type="date"
                defaultValue={getFormattedDate()}
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
                defaultValue=""
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
                      {categories &&
                        categories.map((val) => (
                          <Select.Item value={`${val.id}`} key={val.id}>
                            {val.name}
                          </Select.Item>
                        ))}
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
