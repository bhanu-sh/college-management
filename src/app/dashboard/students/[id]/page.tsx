"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function StudentPage({ params }: any) {
  const { id } = params;
  const router = useRouter();

  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState<Number>(0);
  const [feeInput, setFeeInput] = useState(false);
  const [feeDataInput, setFeeDataInput] = useState(false);
  const [feeData, setFeeData] = useState<any | null>(null);
  const [fee, setFee] = useState(0);

  const getStudent = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/student/getbyid`, {
        params: { id },
      });
      const fetchedStudent = res.data.data;
      setStudent(fetchedStudent);
      setTotal(
        fetchedStudent.course_fee +
          fetchedStudent.exam_fee +
          fetchedStudent.library_fee +
          fetchedStudent.practical_fee +
          fetchedStudent.security_fee -
          fetchedStudent.con_fee
      );
    } catch (error: any) {
      console.error("Error fetching student:", error);
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getFeeData = async (id: string) => {
    try {
      const res = await axios.post(`/api/fee/getbystudent`, {
        student_id: id,
      });
      setFeeData(res.data.data);
      console.log("Fee", res.data);
    } catch (error: any) {
      console.error("Error fetching fee data:", error);
      console.log(error.message);
    }
  };

  const payFee = async (fee: number) => {
    try {
      const res = await axios.post(`/api/user/student/payfee`, {
        id,
        fee,
      });
      console.log(res.data);
      setFeeInput(false);
      getStudent(id);
      toast.success(`Fee of Amount "₹${fee}" paid successfully`);
    } catch (error: any) {
      console.error("Error paying fee:", error);
      console.log(error.message);
    }
  };

  const editFee = async () => {
    try {
      const res = await axios.post(`/api/user/student/editfee`, feeData);
      console.log(res.data);
      setFeeDataInput(false);
      getStudent(id);
      toast.success("Fee edited successfully");
    } catch (error: any) {
      console.error("Error editing fee:", error);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStudent(id);
    getFeeData(id);
  }, [id]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-center mt-8">
        Student Profile
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching student</p>}
      {student && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col border-b-2 sm:border-b-0 sm:border-r-2 mt-12">
              <p className="py-2 text-1xl">
                Name: {student.f_name} {student.l_name}
              </p>
              <p className="py-2 text-1xl">Roll No: {student.roll_no}</p>
              <p className="py-2 text-1xl">Course: {student.course}</p>
              <p className="py-2 text-1xl">
                Session: {student.session_start_year} -{" "}
                {student.session_end_year}
              </p>
              <p className="py-2 text-1xl">
                Father Name: {student.father_name}
              </p>
              <p className="py-2 text-1xl">
                Mother Name: {student.mother_name}
              </p>
              <div className="flex">
                <p className="py-2 text-1xl">Contact:</p>

                <div className="pl-12 pt-1 text-1xl flex flex-col">
                  <Link href={`mailto:${student.email}`} className="py-2">
                    Email: {student.email}
                  </Link>
                  <Link href={`tel:${student.phone}`} className="py-2">
                    Phone: {student.phone}
                  </Link>
                  <p className="py-2">
                    Address: {student.address}, {student.city}, {student.state}{" "}
                    ({student.pincode})
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:pl-8">
              <div className="flex flex-col mt-12">
                <p className="py-2 text-1xl">
                  Course Fee: &#8377; {student.course_fee}
                </p>
                <p className="py-2 text-1xl">
                  Bus Fee: &#8377; {student.bus_fee}
                </p>
                <p className="py-2 text-1xl">
                  Hostel Fee: &#8377; {student.hostel_fee}
                </p>
                <p className="py-2 text-1xl">
                  Exam Fee: &#8377; {student.exam_fee}
                </p>
                <p className="py-2 text-1xl">
                  Library Fee: &#8377; {student.library_fee}
                </p>
                <p className="py-2 text-1xl">
                  Practical Fee: &#8377; {student.practical_fee}
                </p>
                <p className="py-2 text-1xl">
                  Security Fee: &#8377; {student.security_fee}
                </p>
                <p className="py-2 text-1xl">
                  Con: (-) &#8377; {student.con_fee}
                </p>
                <p className="py-2 text-2xl text-red-600 font-semibold">
                  Total Fee: &#8377; {total.toString()}
                </p>
                <p className="py-2 text-2xl text-green-600 font-semibold">
                  Paid Fee: (-) &#8377; {student.paid_fee}
                </p>
                <p className="py-2 text-2xl text-red-600 font-bold">
                  Remaining Fee: &#8377;{" "}
                  {Number(total) - Number(student.paid_fee)}
                </p>
              </div>
            </div>
            <div className="md:flex flex-col mt-12 hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={200}
                height={200}
                src={student.avatar}
                alt="profile-pic"
                className="w-48 h-48 rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-around mt-20">
            <button
              onClick={() => router.push(`/students/${id}/edit`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setFeeDataInput(!feeDataInput)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Fee
            </button>
            <button
              onClick={() => setFeeInput(!feeInput)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Fee
            </button>
          </div>
          {feeInput && (
            <div className="flex flex-col w-96 mx-auto justify-center mt-12">
              <input
                type="number"
                placeholder="Enter amount"
                className="border-2 border-gray-500 rounded"
                onChange={(e) => setFee(Number(e.target.value))}
              />
              <button
                onClick={() => payFee(fee)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          )}
          {feeDataInput && (
            <div className="flex flex-col mt-4 mb-20">
              <h1 className="text-2xl pb-2">
                Fee Edit{" "}
                <span className="text-xl text-gray-5 00">
                  (Only change what necessary)
                </span>
              </h1>
              <input
                type="number"
                placeholder="Course Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.course_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, course_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Bus Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.bus_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, bus_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Hostel Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.hostel_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, hostel_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Exam Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.exam_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, exam_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Library Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.library_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, library_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Practical Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.practical_fee}
                onChange={(e) =>
                  setFeeData({
                    ...feeData,
                    practical_fee: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Security Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.security_fee}
                onChange={(e) =>
                  setFeeData({
                    ...feeData,
                    security_fee: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Con Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.con_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, con_fee: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Paid Fee"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={feeData.paid_fee}
                onChange={(e) =>
                  setFeeData({ ...feeData, paid_fee: e.target.value })
                }
              />
              <button
                onClick={() => editFee()}
                className="bg-blue-500 mx-auto w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
