import SideBar from "@/components/Dashboard/SideBar/SideBar";
import Navbar from "@/components/Navbar";
import Transactions from "@/components/Transactions/Transactions";
import { Table } from "@radix-ui/themes";

export default async function Page() {
  return (
    <div className="h-full">
      <div className="flex flex-row text-zinc-300">
        <SideBar href="transactions" />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex flex-row justify-start px-4 py-6 space-x-12 overflow-y-hidden md:px-10">
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
}
