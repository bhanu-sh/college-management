"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CoursesPage() {
  const { data: session } = useSession();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/course/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setCourses(res.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      handleFetchData();
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap justify-around">
        {courses.length > 0 ? (
          <>
            {courses.map((course: any) => (
              <div
                key={course._id}
                className="w-80 p-4 bg-green-100 rounded-lg shadow-md my-5"
              >
                <div className="p-4 text-center">
                  <h2 className="text-xl  font-semibold">Course 1</h2>
                  <h1 className="text-4xl">4</h1>
                  <div className="flex justify-between items-center mt-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-2xl font-semibold text-gray-500 mb-5">
            No Courses Added
          </h1>
        )}
      </div>
      <button>
        <Link href="dashboard/add/course">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mt-4 focus:ring-green-400">
            Add Course
          </button>
        </Link>
      </button>
    </div>
  );
}
