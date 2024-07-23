"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffCard() {
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
    );
}