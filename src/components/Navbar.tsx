"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthState, logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTransactions } from "@/redux/features/transactions-slice";
import { setCategories } from "@/redux/features/categories-slice";
import { setWallets } from "@/redux/features/wallets-slice";
import { setLineArea } from "@/redux/features/graphs-slice";

export default function Navbar() {
  const { data: session, status } = useSession();

  const user_state = useAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<AuthState>();

  const transactions = useAppSelector(
    (state) => state.transactionReducer.value
  );

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users?email=${session?.user?.email}`)
      .then((res) => {
        const user: AuthState = res.data;
        dispatch(
          logIn({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );

        axios
          .get(`http://127.0.0.1:8000/api/users/${user.id}/transactions`)
          .then((res) => {
            dispatch(setTransactions(res.data));
          });

        axios
          .get(
            `http://127.0.0.1:8000/api/users/${user.id}/transactions?firstdate=2023-1-1&lastdate=2024-1-1`
          )
          .then((res) => {
            dispatch(setLineArea(res.data));
          });

        axios.get(`http://127.0.0.1:8000/api/categories`).then((res) => {
          dispatch(setCategories(res.data));
        });

        axios.get(`http://127.0.0.1:8000/api/wallets`).then((res) => {
          dispatch(setWallets(res.data));
        });
      });
  }, []);

  return (
    <div className="flex flex-row justify-between px-10 py-6 bg-[#0f0f0f] sticky top-0">
      <div className="flex items-center space-x-4">
        <span>HOMEPAGE</span>
        <a href="/dashboard">
          <span className="text-white">DASHBOARD</span>
        </a>
      </div>
      <div className="my-auto">
        <span className="text-white">
          {session ? (
            <Link
              href={"/api/auth/signout"}
              onClick={(e) => {
                e.preventDefault();

                signOut({ redirect: true });
              }}>
              LOG OUT
            </Link>
          ) : (
            <Link
              href={"/api/auth/signin"}
              onClick={(e) => {
                e.preventDefault();

                signIn();
              }}>
              LOGIN
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
