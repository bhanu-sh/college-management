"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StaffCard from "@/app/components/Staff/Card";

export default function StaffTable() {
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
  );
}
