import Link from "next/link";
import SideBarProfile from "./Profile/SideBarProfile";

export default function SideBar({ href }: { href: string }) {
  return (
    <div className="sticky top-0 left-0 hidden h-screen py-5 md:flex md:flex-col bg-zinc-900 md:justify-between">
      <div className="flex flex-col justify-center pb-10 space-y-7">
        <span className="px-5 pr-12 text-3xl font-bold text-white">
          <span className="text-blue-500">Dash</span>board
        </span>
        <div className="text-lg">
          <p className="px-6 py-2 text-xl text-white">MAIN MENU</p>
          <ul>
            <Link href={`/dashboard`}>
              <li
                className={`px-8 py-2 text-white ${
                  href === "stats" ? "bg-blue-600" : ""
                }`}>
                Stats
              </li>
            </Link>
            <Link href={`/dashboard/transactions`}>
              <li
                className={`px-8 py-2 text-white ${
                  href === "transactions" ? "bg-blue-600" : ""
                }`}>
                Transactions
              </li>
            </Link>
          </ul>
        </div>
        <SideBarProfile />
      </div>
      <div className="flex flex-col text-lg">
        <div className="text-lg">
          <p className="px-6 py-2 text-xl text-white">ACCOUNT</p>
        </div>
        <ul>
          <li className="px-8 py-2">Help</li>
          <li className="px-8 py-2">Settings</li>
          <li className="px-8 py-2">Logout</li>
        </ul>
      </div>
    </div>
  );
}
