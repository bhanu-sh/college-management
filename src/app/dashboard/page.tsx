"use client";

import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { useAuth } from "@/contexts/authContext";

const DashboardPage = () => {
  const { loggedin, role } = useAuth();

  if (!loggedin) {
    return <h1>Not Logged In</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "Admin" && <AdminDashboard />}
      {role === "Staff" && <h1>Staff Dashboard</h1>}
      {role === "Student" && <h1>Student Dashboard</h1>}
    </div>
  );
};

export default DashboardPage;
