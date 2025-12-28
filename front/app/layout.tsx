import "../styles/global.css";
import type { Metadata } from "next";
import { SWRProvider } from "@/provider/StoreProvider";
import { Assistant } from "next/font/google";
import Sidelbar from "./components/organism/Sidebar";
import ThemeProvider from "@/provider/ThemeProvider";


const assistant = Assistant({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Cash",
  description: "My Cash App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${assistant.variable} antialiased w-full min-h-screen flex 
        bg-light-bg text-light-text-main 
        dark:bg-dark-bg dark:text-dark-text-main`}
      >
        <ThemeProvider>
          <SWRProvider>
            <Sidelbar />
            <div className="w-full">{children}</div>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
