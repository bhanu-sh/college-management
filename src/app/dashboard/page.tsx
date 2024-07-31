import React from "react";
import Dashboard from "./Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Streamlining Success in Higher Education",
};

export default function DashboardPage() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
