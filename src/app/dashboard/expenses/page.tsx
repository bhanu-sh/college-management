/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ExpensesPage() {
  const { data: session } = useSession();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await axios.post("/api/expense/getbycollege", {
        college_id: session?.user.college_id,
      });
      setExpenses(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchExpenses();
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl font-semibold">Expenses</h1>
    </div>
  );
}
