"use client"

import axios from "axios";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  // const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/staff/logout");
      toast.success("Logout successful!");
      // localStorage.removeItem("user");
      // setLoggedin(false);
      // router.push("/login");
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  };
  return (
    <div>
      {/* front page with options for staff, student to login using tailwind */}

      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">College Management</h1>
          <div className="mt-10">
            <a
              href="/staff/login"
              className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Staff Login
            </a>
            <a
              href="/student/login"
              className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
            >
              Student Login
            </a>
          </div>
        </div>
        <button className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
