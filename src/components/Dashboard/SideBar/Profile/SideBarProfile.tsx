"use client";
import { TransactionState } from "@/redux/features/transactions-slice";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function SideBarProfile() {
  const { data: session, status } = useSession();

  // const username = useAppSelector((state) => state.authReducer.value.id);
  const transactions = useAppSelector(
    (state) => state.transactionReducer.value
  );
  const categories = useAppSelector((state) => state.categoryReducer.value);
  const wallets = useAppSelector((state) => state.walletReducer.value);

  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [banks, setBanks] = useState<number>(0);
  const [eWallets, setEWallets] = useState<number>(0);

  useEffect(() => {
    const fetchTotal = (walletType: number, wallet: number) => {
      if (Array.isArray(transactions)) {
        const { expenses, incomes } = transactions.reduce(
          (acc, val) => {
            categories.forEach((value) => {
              if (val.category_id === value.id) {
                value.category_type_id === 1 && val.wallet_id === walletType
                  ? (acc.expenses += val.amount)
                  : value.category_type_id === 2 && val.wallet_id === walletType
                  ? (acc.incomes += val.amount)
                  : null;
              }
            });
            return acc;
          },
          { expenses: 0, incomes: 0 }
        );

        return incomes - expenses;
      } else {
        return wallet;
      }
    };

    const fetchWallets = () => {
      setCash(fetchTotal(1, cash));
      setBanks(fetchTotal(2, banks));
      setEWallets(fetchTotal(3, eWallets));
    };

    const fetchSavings = () => {
      if (Array.isArray(transactions)) {
        let expenses: number = 0;
        let incomes: number = 0;
        transactions.forEach((value) => {
          categories.forEach((value2) => {
            if (value.category_id === value2.id) {
              value2.category_type_id === 1
                ? (expenses += value.amount)
                : (expenses += 0);
            }
          });
        });
        transactions.forEach((value) => {
          categories.forEach((value2) => {
            if (value.category_id === value2.id) {
              value2.category_type_id === 2
                ? (incomes += value.amount)
                : (incomes += 0);
            }
          });
        });
        setTotalSavings(incomes - expenses);
      } else {
        setTotalSavings(totalSavings);
      }
    };

    fetchWallets();
    fetchSavings();
  }, [transactions]);

  const username = session?.user?.name;
  return (
    <div className="flex flex-col px-5 py-4 space-y-10">
      <div className="flex flex-row justify-start space-x-3 rounded-xl h-[80px] w-[190px]">
        <Image
          src={session?.user?.image ?? ""}
          alt=""
          width={75}
          height={75}
          className="rounded-xl"
        />
        <div className="flex flex-col justify-evenly">
          <span className="text-xl text-white">{username}</span>
          <span>Musician</span>
        </div>
      </div>
      <div className="">
        <h2 className="pb-2 text-2xl text-white">Total Savings</h2>
        <span className="text-xl">
          {totalSavings?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </div>

      <div className="">
        <h2 className="pb-2 text-2xl text-white">Assets</h2>
        <div className="space-y-3">
          <div className="flex flex-row items-center space-x-3">
            <RiMoneyDollarCircleFill size={40} />
            <div className="flex flex-col space-between">
              <span>Cash</span>
              <span className="text-white text-md">
                {cash.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <BsBank2 size={40} />
            <div className="flex flex-col space-between">
              <span>Bank</span>
              <span className="text-white text-md">
                {banks.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <RiMoneyDollarCircleFill size={40} />
            <div className="flex flex-col space-between">
              <span>E-Wallets</span>
              <span className="text-white text-md">
                {eWallets.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
