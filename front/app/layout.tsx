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
        className={`${assistant.variable} antialiased w-full min-h-screen flex relative
        text-light-text-main dark:text-dark-text-main`}
      >
        {/* Degradado diagonal suave para toda la aplicación */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #f5f5f5 0%, #ddd6fe 40%, #8b5cf6 100%)',
          }}
        />
        <div
          className="fixed inset-0 -z-10 dark:opacity-100 opacity-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a0a28 50%, #3d2663 100%)',
          }}
        />

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
