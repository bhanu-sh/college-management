"use client";

import { useAuth } from "@/contexts/authContext";
import Link from "next/link";

export default function Home() {
  const { loggedin } = useAuth();

  return (
    <div>
      Home Page
    </div>
  );
}
