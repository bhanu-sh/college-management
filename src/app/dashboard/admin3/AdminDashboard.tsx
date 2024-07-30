"use client";
import AdminCard from "@/app/components/Admin/Card";
import CollegeCard from "@/app/components/College/Card";

export default function AdminDashboard() {

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">Admin Dashboard</h1>
      <div className="flex flex-wrap justify-around">
        <AdminCard />
        <CollegeCard />
      </div>
      
    </div>
  );
}
