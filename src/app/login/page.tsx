"use client";

import { useAuth } from "@/contexts/authContext";
import Link from "next/link";

const LoginPage = () => {
  const { loggedin } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Link
        href="/login/staff"
        className="block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40"
      >
        Staff
      </Link>

      <Link
        href="/login/student"
        className="block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline w-40"
      >
        Student
      </Link>
    </div>
  );
};

export default LoginPage;
