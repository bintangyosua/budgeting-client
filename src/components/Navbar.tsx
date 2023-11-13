"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthState, logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<AuthState>();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${session?.user?.email}`)
      .then((res) => setUser(res.data));
  }, []);

  if (status) {
    dispatch(logIn(user?.id!));
  } else {
    dispatch(logOut());
  }

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
