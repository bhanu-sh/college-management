"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface College {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  slug: string;
  detailsLocked: boolean;
  feesLocked: boolean;
}

export default function CollegeDashboard() {
  const { data: session } = useSession();
  const [college, setCollege] = useState<College | null>(null);
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollege = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/college/getbyid`, {
        college_id: session?.user.college_id,
      });
      setCollege(response.data);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log("Error", error.response.data.error);
    }
    setLoading(false);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/user/student/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setStudents(response.data.data);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log("Error", error.response.data.error);
    }
    setLoading(false);
  };

  const lockDetails = async (type: string) => {
    try {
      if (type === "details") {
        const response = await axios.post(`/api/college/lockdetails`, {
          college_id: session?.user.college_id,
        });
        console.log("Details Locked", response.data);
      } else {
        const response = await axios.post(`/api/college/lockfees`, {
          college_id: session?.user.college_id,
        });
        console.log("Fees Locked", response.data);
      }
    } catch (error: any) {
      console.log("Error", error.response.data.error);
    } finally {
      fetchCollege();
    }
  };

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/user/staff/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setStaffs(response.data.data);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log("Error", error.response.data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchCollege();
      fetchStudents();
      fetchStaffs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {session?.user.college_id === "" || error ? (
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-semibold text-gray-500 mb-5">
            No College Added
          </h1>
          <Link href="/add/college">
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Add College
            </button>
          </Link>
        </div>
      ) : (
        <>
          {loading ? (
            <h1 className="text-2xl text-center font-semibold">Loading...</h1>
          ) : (
            <>
              {error ? (
                <h1 className="text-2xl text-center font-semibold text-red-500">
                  {error}
                </h1>
              ) : (
                <>
                  <h1 className="text-2xl text-center font-semibold">
                    Welcome, {session?.user.f_name + " " + session?.user.l_name}
                  </h1>
                  <h1 className="text-lg text-center font-semibold">
                    {college?.name}
                  </h1>
                  <div className="flex flex-wrap justify-around">
                    <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
                      <div className="p-4 text-center">
                        <h2 className="text-xl  font-semibold">Total Staffs</h2>
                        <h1 className="text-4xl">{staffs.length}</h1>
                        <div className="flex justify-between items-center mt-4 ">
                          <Link
                            href={`/dashboard/staffs`}
                            className="mx-auto"
                          >
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
                      <div className="p-4 text-center">
                        <h2 className="text-xl  font-semibold">
                          Total Students
                        </h2>
                        <h1 className="text-4xl">{students.length}</h1>
                        <div className="flex justify-between items-center mt-4 ">
                          <Link
                            href={`/dashboard/students`}
                            className="mx-auto"
                          >
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Lock Status:</h2>
                    <div className="flex justify-around flex-col md:flex-row">
                      <div className="flex sm:w-1/2 md:w-80 justify-between">
                        <p className="text-xl font-semibold">Student Details</p>
                        {!college?.detailsLocked ? (
                          <button
                            onClick={() => lockDetails("details")}
                            className="bg-green-500 text-white px-2 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            Unlocked
                          </button>
                        ) : (
                          <button
                            onClick={() => lockDetails("details")}
                            className="bg-red-500 text-white px-2 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Locked
                          </button>
                        )}
                      </div>
                      <div className="flex sm:w-1/2 md:w-80 justify-between">
                        <p className="text-xl font-semibold">Fee Details</p>
                        {!college?.feesLocked ? (
                          <button
                            onClick={() => lockDetails("fee")}
                            className="bg-green-500 text-white px-2 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            Unlocked
                          </button>
                        ) : (
                          <button
                            onClick={() => lockDetails("fee")}
                            className="bg-red-500 text-white px-2 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Locked
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
