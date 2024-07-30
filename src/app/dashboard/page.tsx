"use client";

import React from "react";
import AdminDashboard from "@/app/dashboard/admin/AdminDashboard";
import { useSession } from "next-auth/react";
import StaffDashboard from "@/app/dashboard/staff/StaffDashboard";

const DashboardPage = () => {

  const { data: session } = useSession();

  if (!session) {
    return <h1>Not Logged In</h1>;
  }

  return (
    <div>
      {session.user?.role === "Admin" && <AdminDashboard />}
      {session.user?.role === "Staff" && <StaffDashboard />}
      {session.user?.role === "Student" && <h1>Student Dashboard</h1>}
    </div>
  );
};

export default DashboardPage;
