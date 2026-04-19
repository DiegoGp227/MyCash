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
  const isOnboardingPage = pathname.startsWith("/onboarding");
  const showSidebar = !isAuthPage && !isOnboardingPage;

  return (
    <>
      {showSidebar && <Sidebar />}
      <div className={`w-full ${showSidebar ? "ml-14" : ""}`}>{children}</div>
    </>
  );
}
