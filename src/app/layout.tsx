import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "@/contexts/authProvider";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusEase",
  description: "Streamlining Success in Higher Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <div>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
  </div>
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className + " bg-gray-100"}>
          <Toaster position="top-center" />
          <Navbar />
          <div className="flex-grow px-4 container mx-auto ">{children}</div>
          <div className=" min-w-full "></div>
        </body>
      </AuthProvider>
    </html>
  );
}
