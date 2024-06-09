import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { CommonStoreProvider } from "@/providers/common";
import { Analytics } from "./hoc/analytics";
import { UserStoreProvider } from "@/providers/user";
import { NotesProvider } from "@/providers/notes";
import DataFetching from "./hoc/DataFetching";

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
      <Analytics>
        <CommonStoreProvider>
          <UserStoreProvider>
            <NotesProvider>
              <DataFetching>
                <body className="w-screen h-screen flex flex-col">
                  <Header />
                  <div className="flex-1 flex">
                    <Sidebar />
                    <main className="flex-1 relative">
                      <div className="absolute inset-0 overflow-auto">
                        {children}
                      </div>
                    </main>
                  </div>
                </body>
              </DataFetching>
            </NotesProvider>
          </UserStoreProvider>
        </CommonStoreProvider>
      </Analytics>
    </html>
  );
}
