import { ScanEye, SquarePlus } from "lucide-react";

export default function HeaderTransacctionTable() {
  return (
    <div className="flex justify-between border-b-2 border-gray-300 pb-4">
      <div>
        <p className="text-2xl font-bold">Transacciones Recientes</p>
      </div>
      <div className="flex gap-5">
        <button className="rounded-lg flex border-2 border-primary-purple py-0.5 px-2 hover:bg-white hover:-translate-y-1 transition-all duration-300 gap-2">
          <ScanEye />
          Show All
        </button>
        <button className="bg-primary-purple rounded-lg flex border-2 border-primary-purple py-0.5 px-2 text-white transition-all duration-300 hover:bg-primary-purple-hover hover:-translate-y-1 gap-2">
          <SquarePlus />
          Show All
        </button>
      </div>
    </div>
  );
}
