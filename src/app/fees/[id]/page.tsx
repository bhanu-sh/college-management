"use client";
import Loader from "@/app/components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeesPage({ params }: any) {
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [fee, setFee] = useState<any | null>(null);

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/fee/getbyid`, {
        params: { id },
      });
      setFee(res.data.data);
      console.log(res.data);
    } catch (error: any) {
      setError(error);
      console.error("Error fetching fee details:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex w-full justify-center">
      {loading && <Loader />}
      {fee ? (
        <div className="bg-white p-8 max-w-md w-full">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {fee.college_id.name}
            </h1>
            <div className="text-center text-gray-500 mb-4">
              <span className="text-black font-semibold">Address:</span>{" "}
              {fee.college_id.address}, {fee.college_id.city},{" "}
              {fee.college_id.state} - {fee.college_id.pincode}
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Receipt No:</span>
              <span>123456</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date:</span>
              <span>
                {new Date(fee.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Student Name:</span>
              <span>
                {fee.student_id?.f_name} {fee.student_id?.l_name}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Course:</span>
              <span>{fee.student_id?.course}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Amount Paid:</span>
              <span>{formatCurrency(fee.amount)}</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
          </div>
          <div className="text-center">
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
              Print Receipt
            </button>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          Invalid Fee ID
        </div>
      ) : null}
    </div>
  );
}
