import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { UiStoreProvider } from "@/providers/ui-store-provider";

export const metadata: Metadata = {
  title: "Alphakin",
  description: "Note briefly, gain greatly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UiStoreProvider>
        <body className="w-screen h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 relative">
              <div className="absolute inset-0 overflow-auto">{children}</div>
            </main>
          </div>
        </body>
      </UiStoreProvider>
    </html>
  );
}
