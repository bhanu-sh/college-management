"use client";

import { useAuth } from "@/contexts/authContext";
import LoginPage from "./components/Login/Login";
import Link from "next/link";

export default function Home() {
  const { loggedin } = useAuth();

  return (
    <div>
      {/* Landing Page */}
      <div className="flex flex-col items-center justify-center h-screen">
        {loggedin ? (
          <div>
            <h1 className="text-4xl text-center font-bold">Hello,</h1>
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold">
              Welcome to College Management System
            </h1>
            <div className="mt-5">
              <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Login
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
