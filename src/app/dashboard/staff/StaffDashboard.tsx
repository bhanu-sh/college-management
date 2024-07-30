"use client";
import AdminCard from "@/app/components/Admin/Card";
import CollegeCard from "@/app/components/College/Card";
import StaffCard from "./StaffCard";

export default function StaffDashboard() {

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">Staff Dashboard</h1>
      <div className="flex flex-wrap justify-around">
        <StaffCard />
        <CollegeCard />
      </div>
      
    </div>
  );
}
