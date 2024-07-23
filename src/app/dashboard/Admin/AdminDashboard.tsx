"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StaffCard from "@/app/components/Staff/Card";
import StaffTable from "@/app/components/Staff/Table";
import AdminCard from "@/app/components/Admin/Card";
import CollegeCard from "@/app/components/College/Card";

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
        <AdminCard />
        <CollegeCard />
      </div>
      
    </div>
  );
}
