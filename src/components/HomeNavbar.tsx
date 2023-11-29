"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomeNavbar() {
  const { data: session, status } = useSession();
  return (
    <header className="text-gray-600 body-font w-full border-b-2">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href={"/"}>
          <Image src="/wallet.svg" width={50} alt="" />
          <span className="ml-3 text-xl">Budgeting</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" href="/dashboard">
            Dashboard
          </Link>
        </nav>
        {session ? (
          <Link
            href={"/api/auth/signout"}
            onClick={(e) => {
              e.preventDefault();

              signOut({ redirect: true });
            }}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Sign Out
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        ) : (
          <Link
            href={"/api/auth/signin"}
            onClick={(e) => {
              e.preventDefault();

              signIn();
            }}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Sign In
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        )}
        <Link href={"/api/auth/signin"}></Link>
      </div>
    </header>
  );
}
