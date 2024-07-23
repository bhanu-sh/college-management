"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [staffs, setStaffs] = useState([]);

  const getStaffs = async () => {
    try {
      const res = await axios.get("/api/staff/getall");
      setStaffs(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="flex flex-wrap justify-around">
        <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
          <div className="p-4 text-center">
            <h2 className="text-xl  font-semibold">Total Staffs</h2>
            <h1 className="text-4xl">
              {staffs.length}
            </h1>
            <div className="flex justify-between items-center mt-4 ">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mx-auto focus:ring-blue-400">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
          <div className="p-4 text-center">
            <h2 className="text-xl  font-semibold">Total Staffs</h2>
            <h1 className="text-4xl">
              {staffs.length}
            </h1>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mx-auto focus:ring-blue-400">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
          <div className="p-4 text-center">
            <h2 className="text-xl  font-semibold">Total Staffs</h2>
            <h1 className="text-4xl">
              {staffs.length}
            </h1>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 mx-auto focus:ring-blue-400">
                Learn More
              </button>
            </div>
          </div>
        </div>
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
                Role
              </th>
            </tr>
          </thead>
          <tbody className="">
            {staffs.map((staff: any) => (
              <tr key={staff._id} className="border-b border-gray-700">
                <td className="px-6 py-4 bg-gray-50 ">{staff.f_name}</td>
                <td className="px-6 py-4">{staff.l_name}</td>
                <td className="px-6 py-4 bg-gray-50 ">{staff.phone}</td>
                <td className="px-6 py-4">{staff.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
