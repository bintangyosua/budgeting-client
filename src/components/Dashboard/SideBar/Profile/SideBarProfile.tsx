"use client";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsBank2 } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function SideBarProfile() {
  const { data: session, status } = useSession();

  const username = useAppSelector((state) => state.authReducer.value.username);
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
        <span className="text-xl">Rp120.000,-</span>
      </div>
      <div className="">
        <h2 className="pb-2 text-2xl text-white">Assets</h2>
        <div className="space-y-3">
          <div className="flex flex-row items-center space-x-3">
            <BsBank2 size={40} />
            <div className="flex flex-col space-between">
              <span>Bank</span>
              <span className="text-white text-md">Rp1.345.000</span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <RiMoneyDollarCircleFill size={40} />
            <div className="flex flex-col space-between">
              <span>Cash</span>
              <span className="text-white text-md">Rp534.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
