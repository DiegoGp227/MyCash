import { TransactionsTable } from "@/src/home/tables/TransactionsTable";
import HeaderTransacctionTable from "../molecules/HeaderTransacctionTable";

export default function TransactionsOrganism() {
  return (
    <div className="flex w-full flex-col gap-8 p-6 ">
      <div className="flex flex-col rounded-lg border-2 bg-light-bg p-6 shadow-md dark:bg-black border-primary-purple gap-4">
        <HeaderTransacctionTable />
        <TransactionsTable />
      </div>
    </div>
  );
}


       