"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/organism/Sidebar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <>
      <Sidebar />
      <div className={`w-full ${!isAuthPage ? "ml-14" : ""}`}>{children}</div>
    </>
  );
}
