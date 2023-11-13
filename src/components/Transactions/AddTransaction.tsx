"use client";

import { getCategories } from "@/redux/features/categories-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Dialog, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import * as Select from "@radix-ui/react-select";
import { useDispatch } from "react-redux";
import { FormEventHandler, SetStateAction, useEffect, useState } from "react";
import { CategoryState as CategoryType } from "@/redux/features/categories-slice";
import { Input, Text } from "@chakra-ui/react";
import { FormEvent } from "react";

export default function AddTransaction() {
  const id = useAppSelector((state) => state.authReducer.value.id);
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [value, setValue] = useState("");
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  const [categoryId, setCategoryId] = useState<number>();
  const [walletId, setWalletId] = useState<number>();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/categories`).then((res) => {
      setCategories(res.data);
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
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="border border-slate-600 rounded-md p-1"
            />
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border border-slate-600 rounded-md p-1"
              placeholder="The amount of this transaction"
            />
            <div className="flex justify-between space-x-3 ">
              <div className="flex flex-col w-1/2 space-y-3">
                <label htmlFor="category">Category</label>
                <select
                  name="category_id"
                  id="category"
                  className="border border-slate-600 rounded-md p-1">
                  <option value="1">Makan</option>
                </select>
              </div>
              <div className="flex flex-col w-1/2 space-y-3">
                <label htmlFor="wallet">Wallet</label>
                <select
                  name="wallet_id"
                  id="wallet"
                  className="border border-slate-600 rounded-md p-1">
                  <option value="1">Makan</option>
                </select>
              </div>
            </div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              className="border border-slate-600 rounded-md p-1"
              placeholder="What is the description?"
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
