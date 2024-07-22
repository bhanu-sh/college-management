"use client";

import { useAuth } from "@/contexts/authContext";
import LoginPage from "./components/Login/Login";
import Link from "next/link";

export default function Home() {
  const { loggedin } = useAuth();

  return (
    <div>
      {/* front page with options for staff, student to login using tailwind */}

      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="">
            {loggedin ? (
              <Link
                href="/dashboard"
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <LoginPage />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
