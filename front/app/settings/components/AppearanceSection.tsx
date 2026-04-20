"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppearanceSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsDark(newTheme);
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-purple/10 dark:bg-primary-purple/20 flex items-center justify-center">
          <Palette className="w-5 h-5 text-primary-purple" />
        </div>
        <div>
          <h2 className="font-semibold text-light-text-main dark:text-white">Appearance</h2>
          <p className="text-sm text-hard-gray">Choose your preferred theme</p>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-dark-border" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isDark ? (
            <Moon className="w-5 h-5 text-primary-purple" />
          ) : (
            <Sun className="w-5 h-5 text-primary-purple" />
          )}
          <div>
            <p className="font-medium text-light-text-main dark:text-white">
              {isDark ? "Dark mode" : "Light mode"}
            </p>
            <p className="text-sm text-hard-gray">
              {isDark ? "Switch to light theme" : "Switch to dark theme"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          role="switch"
          aria-checked={isDark}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-purple ${
            isDark ? "bg-primary-purple" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
