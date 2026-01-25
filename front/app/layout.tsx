import "../styles/global.css";
import type { Metadata } from "next";
import { SWRProvider } from "@/provider/StoreProvider";
import { Assistant } from "next/font/google";
import ThemeProvider from "@/provider/ThemeProvider";
import LayoutContent from "./LayoutContent";

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
        {/* Fondo de la aplicación */}
        <div
          className="fixed inset-0 -z-10 transition-colors duration-300"
          style={{
            background: 'var(--color-purple-bg)',
          }}
        />
        <div
          className="fixed inset-0 -z-10 dark:opacity-100 opacity-0 transition-opacity duration-300"
          style={{
            background: 'var(--color-dark-purple-bg)',
          }}
        />

        <ThemeProvider>
          <SWRProvider>
            <LayoutContent>{children}</LayoutContent>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
