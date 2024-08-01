"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function StudentsPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);

  const getStudents = async () => {
    try {
      console.log(session?.user.college_id);
      const response = await axios.post(`/api/user/student/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setUser(response.data.data);
    } catch (error: any) {
      console.log("Error", error.response.data.error);
    }
  };

  useEffect(() => {
    if (session) {
      getStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      {!session && <div>loading...</div>}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          Students
        </h1>
        <div className="flex justify-end">
          <Link href="/add/student">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
              Add Student
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr className="border-b">
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Course
                </th>
                <th scope="col" className="px-6 py-3">
                  Session
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Roll No
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {user.map((user: any) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-6 py-4 bg-gray-50 ">{user.f_name}</td>
                  <td className="px-6 py-4">{user.l_name}</td>
                  <td className="px-6 py-4 bg-gray-50 ">{user.phone}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 bg-gray-50 ">{user.course}</td>
                  <td className="px-6 py-4">{user.session_start_year}</td>
                  <td className="px-6 py-4 bg-gray-50 ">{user.roll_no}</td>
                  <td className="px-6 py-4">
                    <Link href={`/edit/student/${user._id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
