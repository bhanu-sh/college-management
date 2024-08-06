"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import CountCard from "@/app/components/CountCard";
import CollegeLock from "@/app/components/CollegeLock";

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
      const response = await axios.post(`/api/student/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setStudents(response.data.data);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log("Error", error.response.data.error);
    }
    setLoading(false);
  };

  const lockDetails = async () => {
    try {
      const response = await axios.post(`/api/college/lock`, {
        college_id: session?.user.college_id,
      });
      console.log("Details Locked", response.data);
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
                    <CountCard
                      title="Students"
                      count={students.length}
                      link="/dashboard/students"
                    />
                    <CountCard
                      title="Staffs"
                      count={staffs.length}
                      link="/dashboard/staffs"
                    />
                  </div>
                  <hr />
                  <div className="flex justify-center gap-8 items-end">
                    <h2 className="text-3xl font-bold">Lock Status:</h2>
                    <CollegeLock collegeId={session?.user.college_id || ""} />
                  </div>
                  <hr />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
