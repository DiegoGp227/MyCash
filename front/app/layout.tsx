import "../styles/global.css";
import type { Metadata } from "next";
// import { Assistant } from "next/font/google";
// import Header from "./components/organisms/layout/Header";
// import Footer from "./components/organisms/layout/Footer";
import { SWRProvider } from "@/provider/StoreProvider";

const assistant = Assistant({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impact",
  description: "Impact app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${assistant.variable} antialiased bg-main-gray w-full min-h-screen flex flex-col`}
      >
        <SWRProvider>
          <Header />
          <div className="max-w-screen-2xl mx-auto flex-1 w-full">
            {children}
          </div>
          <Footer />
        </SWRProvider>
      </body>
    </html>
  );
}
