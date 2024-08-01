"use client";

import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { useSession } from "next-auth/react";
import StaffDashboard from "./staff/StaffDashboard";
import CollegeDashboard from "./college-admin/CollegeDashboard";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role === "Admin" && <AdminDashboard />}
      {session?.user?.role === "Staff" && <StaffDashboard />}
      {session?.user?.role === "Student" && <h1>Student Dashboard</h1>}
      {session?.user?.role === "CollegeAdmin" && <CollegeDashboard />}
    </div>
  );
}
