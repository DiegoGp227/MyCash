"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useAppStoreActions, useAppStoreState } from "@/store/hooks";
import { clearAuthToken } from "@/src/auth/utils/authToken";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const router = useRouter();

  const { user } = useAppStoreState((state) => state.auth);
  const { clearAuth } = useAppStoreActions((actions) => actions.auth);

  const handleOpen = () => setOpen((prev) => !prev);

  // Sigue la posición del botón frame a frame mientras el menú esté abierto
  // (necesario porque el sidebar tiene una transición CSS que mueve el botón)
  useEffect(() => {
    if (!open) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const track = () => {
      if (buttonRef.current && menuRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          menuRef.current.style.bottom = `${window.innerHeight - rect.top + 8}px`;
          menuRef.current.style.left = `${rect.left}px`;
        } else {
          menuRef.current.style.bottom = `${window.innerHeight - rect.bottom}px`;
          menuRef.current.style.left = `${rect.right + 12}px`;
        }
      }
      rafRef.current = requestAnimationFrame(track);
    };

    rafRef.current = requestAnimationFrame(track);
    return () => cancelAnimationFrame(rafRef.current);
  }, [open]);

  // Cierra al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    clearAuthToken();
    clearAuth();
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("dark");
    router.push("/auth");
  };

  const initials = user?.userInfo.name
    ? user.userInfo.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "?";

  const menu = open ? (
    <div
      ref={menuRef}
      style={{ bottom: 0, left: 0 }}
      className="fixed z-[9999] min-w-[220px] rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-xl overflow-hidden"
    >
      {/* Info del usuario */}
      <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-primary-purple flex items-center justify-center text-white text-sm font-bold shrink-0">
            {initials}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-light-text-main dark:text-dark-text-main text-sm font-semibold truncate">
              {user?.userInfo.name}
            </span>
            <span className="text-light-text-secondary dark:text-dark-text-secondary text-xs truncate">
              {user?.userInfo.email}
            </span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="py-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className={`
          flex items-center gap-3 px-4 py-3 w-full transition-colors
          text-light-text-main dark:text-dark-text-main
          hover:bg-gray-bg dark:hover:bg-light-purple-bg
          ${open ? "bg-gray-bg dark:bg-light-purple-bg" : ""}
        `}
        aria-label="User menu"
      >
        <span className="w-6 h-6 shrink-0 rounded-full bg-primary-purple flex items-center justify-center text-white text-[10px] font-bold">
          {initials}
        </span>
        <span className="whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-sm truncate max-w-[140px]">
          {user?.userInfo.name ?? "User"}
        </span>
      </button>

      {typeof window !== "undefined" && createPortal(menu, document.body)}
    </>
  );
}
