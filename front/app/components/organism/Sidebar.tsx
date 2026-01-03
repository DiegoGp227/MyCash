"use client";

import {
  ArrowLeftRight,
  Calculator,
  Goal,
  House,
  Moon,
  Receipt,
  Settings,
  Sun,
  Tags,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    // Ocultar sidebar solo en la ruta de autenticación
    setIsLogin(pathname === "/auth");
  }, [pathname]);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = !isDark;

    html.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsDark(newTheme);
  };

  return (
    <aside
      className={`
    group w-14 hover:w-64 h-screen overflow-hidden
    transition-all duration-300 ease-in-out
    bg-light-surface dark:bg-dark-surface
    border-r border-light-border dark:border-dark-border
    ${isLogin ? "hidden" : ""}
  `}
    >
      <nav className="h-screen">
        <ul className="flex flex-col justify-between py-4 h-screen">
          {/* Parte superior */}
          <div>
            {[
              { label: "Dashboard", icon: House },
              { label: "Transactions", icon: ArrowLeftRight },
              { label: "Accounts", icon: Wallet },
              { label: "Categories", icon: Tags },
              { label: "Budgets", icon: Calculator },
              { label: "Goals", icon: Goal },
              { label: "Debts", icon: Receipt },
            ].map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href=""
                  className="
                    flex items-center gap-3 px-4 py-3 transition-colors
                    text-light-text-main dark:text-dark-text-main
                    hover:bg-primary-purple-soft dark:hover:bg-dark-border
                  "
                >
                  <Icon className="w-6 h-6 shrink-0 text-primary-purple" />
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </div>

          {/* Parte inferior */}
          <div>
            <li>
              <button
                onClick={toggleTheme}
                className="
                  flex items-center gap-3 px-4 py-3 w-full transition-colors
                  text-light-text-main dark:text-dark-text-main
                  hover:bg-primary-purple-soft dark:hover:bg-dark-border
                "
              >
                {isDark ? (
                  <Sun className="w-6 h-6 shrink-0 text-primary-purple" />
                ) : (
                  <Moon className="w-6 h-6 shrink-0 text-primary-purple" />
                )}

                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isDark ? "Light mode" : "Dark mode"}
                </span>
              </button>
            </li>

            <li>
              <a
                href=""
                className="
                  flex items-center gap-3 px-4 py-3 transition-colors
                  text-light-text-main dark:text-dark-text-main
                  hover:bg-primary-purple-soft dark:hover:bg-dark-border
                "
              >
                <Settings className="w-6 h-6 shrink-0 text-primary-purple" />
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
