"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function CollegeDashboard() {
  const { data: session } = useSession();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch college details
  const fetchCollege = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/collegesbyid`, {
        college_id: session?.user.college_id,
      });
      setCollege(response.data);
    } catch (error: any) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">
        College Admin Dashboard
      </h1>
      {!session?.user.college_id ? (
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-semibold text-gray-500 mb-5">
            No College Added
          </h1>
          <Link href="/app/college-admin/add-college">
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Add College
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
