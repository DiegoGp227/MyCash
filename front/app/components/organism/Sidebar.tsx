import {
  ArrowLeftRight,
  Calculator,
  Goal,
  House,
  Receipt,
  Settings,
  Tags,
  Wallet,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="group w-14 hover:w-64 h-screen bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden">
      <nav className="h-screen">
        <ul className="flex flex-col justify-between py-4 h-screen">
          {/* Parte superior */}
          <div>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <House className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <ArrowLeftRight className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Transactions
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Wallet className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Accounts
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Tags className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Categories
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Calculator className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Budgets
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Goal className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Goals
                </span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Receipt className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Debs
                </span>
              </a>
            </li>
          </div>

          {/* Parte inferior */}
          <div>
            <li>
              <a
                href=""
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-6 h-6 shrink-0 text-purple-500" />
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Configuración
                </span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  );
}
