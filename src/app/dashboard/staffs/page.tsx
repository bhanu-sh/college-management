"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function StaffsPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);

  const getStaffs = async () => {
    try {
      console.log(session?.user.college_id);
      const response = await axios.post(`/api/user/staff/getbycollege`, {
        college_id: session?.user.college_id,
      });
      setUser(response.data.data);
    } catch (error: any) {
      console.log("Error", error.response.data.error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await axios.post("/api/user/delete", {
        user: [userId], // Send the single ID as an array
      });
      if (res.status === 200) {
        toast.success("User deleted successfully");
        getStaffs();
      } else {
        toast.error("Failed to delete User");
      }
    } catch (error) {
      console.error(
        "Delete error:",
        (error as any).response
          ? (error as any).response.data
          : (error as any).message
      );
      toast.error("Failed to delete User");
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      const res = await axios.post("/api/user/delete", {
        user: selected,
      });
      if (res.status === 200) {
        toast.success("Users deleted successfully");
        getStaffs();
      } else {
        toast.error("Failed to delete Users");
      }
    } catch (error) {
      console.error(
        "Delete error:",
        (error as any).response
          ? (error as any).response.data
          : (error as any).message
      );
      toast.error("Failed to delete Users");
    }
  };

  useEffect(() => {
    if (session) {
      getStaffs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      {!session && <div>loading...</div>}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-gray-700 text-center">Staffs</h1>
        <div className="flex justify-between">
          <Link href="/add/staff">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
              Add Staff
            </button>
          </Link>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md ml-2 disabled:opacity-50"
            disabled={selected.length === 0}
            onClick={deleteSelectedUsers}
          >
            Delete Selected
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr className="border-b text-center">
                <th scope="col" className="py-3">
                  Select
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 ">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {user.map((user: any) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-2 py-4 text-center ">
                    <input
                      type="checkbox"
                      value={user._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected([...selected, user._id]);
                        } else {
                          setSelected(selected.filter((id) => id !== user._id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 bg-gray-50 ">
                    {user.f_name + " " + user.l_name}
                  </td>
                  <td className="px-6 py-4  ">{user.phone}</td>
                  <td className="px-6 py-4 bg-gray-50 ">{user.dob}</td>
                  <td className="px-6 py-4 ">
                    {user.address +
                      ", " +
                      user.city +
                      ", " +
                      user.state +
                      " (" +
                      user.pincode +
                      ")"}
                  </td>
                  {session && session.user?.role === "CollegeAdmin" && (
                    <td className="px-6 py-3 bg-gray-50 flex flex-col">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 mb-2">
                        <Link href={`/colleges/${user.slug}`}>View</Link>
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2">
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
