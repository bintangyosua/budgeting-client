import Dashboard from "@/components/Dashboard/Dashboard";
import SideBar from "@/components/Dashboard/SideBar/SideBar";
import Navbar from "@/components/Navbar";

export default async function Page() {
  return (
    <div className="h-full">
      <div className="flex flex-row text-black dark:text-zinc-300">
        <SideBar href="stats" />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex flex-row justify-start px-4 py-6 space-x-12 overflow-y-auto md:px-10">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
