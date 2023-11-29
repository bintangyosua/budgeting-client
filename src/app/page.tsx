"use client";

import HomeNavbar from "@/components/HomeNavbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HomeNavbar />
      <div className="z-10 max-w-7xl w-full items-center justify-between text-sm lg:flex">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font md:text-5xl sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Mari atur keuanganmu
                <br className="hidden lg:inline-block" />
                Sebelum tekor
              </h1>
              <p className="mb-8 leading-relaxed text-md">
                &quot;Optimalkan Pengelolaan Keuangan Anda dengan Budgeting
                Dashboard! Pantau dan kelola anggaran dengan mudah, lihat grafik
                interaktif, dan raih kontrol penuh atas keuangan Anda. Temukan
                kebijakan keuangan yang efisien dengan visualisasi yang intuitif
                dan rencanakan masa depan finansial Anda. Dengan Budgeting
                Dashboard, jadikan setiap pengeluaran dan tabungan Anda
                menghasilkan keputusan yang cerdas dan membawa kebebasan
                finansial lebih dekat!&quot;
              </p>
              <div className="flex justify-center">
                <Link href={"/dashboard"}>
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Dashboard
                  </button>
                </Link>
                {!session ? (
                  <Link href={"/api/auth/signin"}>
                    <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                      Login
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image
                className="object-cover object-center rounded"
                alt="hero"
                src="/graph.svg"
                height={450}
                width={450}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
