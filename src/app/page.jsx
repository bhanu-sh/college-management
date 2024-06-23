"use client";
import { useAuth } from "@/contexts/authContext";
import React from "react";

export default function Home() {
  const { darkMode, setDarkMode } = useAuth();
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen dark:bg-black">
        <div className="flex flex-col mx-auto justify-center w-96 min-h-screen  dark:text-white">
          <h1 className="text-4xl font-semibold text-center">Login</h1>

          <label htmlFor="email">E-Mail</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            id="password"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
