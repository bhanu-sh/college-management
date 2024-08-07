"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

export default function StudentPage({ params }: any) {
  const { id } = params;
  const router = useRouter();

  const { data: session } = useSession();

  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState<Number>(0);
  const [paidFee, setPaidFee] = useState<Number>(0);
  const [addedFee, setAddedFee] = useState({
    name: "",
    description: "",
    amount: "",
    type: "fee",
    student_id: id,
    college_id: session?.user.college_id,
  });
  const [payFee, setPayFee] = useState({
    name: "Fee Payment",
    amount: "",
    method: "cash",
    student_id: id,
    college_id: session?.user.college_id,
  });

  const getStudent = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/student/getbyid`, {
        params: { id },
      });
      const fetchedStudent = res.data.data;
      setStudent(fetchedStudent);
      let total = 0;
      let paid = 0;
      fetchedStudent.fees.forEach((fee: any) => {
        if (fee.type === "fee") {
          total += fee.amount;
        } else {
          paid += fee.amount;
        }
      });

      console.log("Total", total);
      setTotal(total);
      setPaidFee(paid);
      console.log("Student", res.data);
    } catch (error: any) {
      console.error("Error fetching student:", error);
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addFee = async () => {
    try {
      const res = await axios.post("/api/fee/add", addedFee);
      console.log("Fee Added", res.data);
      toast.success("Fee Added");
      getStudent(id);
    } catch (error: any) {
      console.error("Error adding fee:", error);
      toast.error("Error adding fee");
    }
  };

  const payingFee = async () => {
    try {
      setPayFee({ ...payFee, college_id: session?.user.college_id });
      const res = await axios.post("/api/fee/pay", payFee);
      console.log("Fee Paid", res.data);
      toast.success("Fee Paid");
      getStudent(id);
    } catch (error: any) {
      console.error("Error paying fee:", error);
      toast.error("Error paying fee");
    }
  };

  useEffect(() => {
    getStudent(id);
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
                {student.fees.map((fee: any) => (
                  <>
                    {fee.type === "fee" && (
                      <p className="py-2 text-1xl" key={fee._id}>
                        {fee.name}: &#8377; {fee.amount}
                      </p>
                    )}
                  </>
                ))}
                <hr />
                <p className="py-2 text-1xl font-semibold">
                  Total Fee: &#8377; {Number(total)}
                </p>
                <p className="py-2 text-1xl text-green-600 font-semibold">
                  Paid Fee: &#8377; {Number(paidFee)}
                </p>
                <p className="py-2 text-1xl text-red-600 font-bold">
                  Remaining Fee: &#8377; {Number(total) - Number(paidFee)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-20">
            <Button
              variant={"warning"}
              onClick={() => router.push(`/students/edit/${id}`)}
            >
              Edit
            </Button>

            <Dialog>
              <DialogTrigger>
                <Button variant={"info"}>Add Fee</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Fees</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-2 justify-center">
                      <Input
                        placeholder="Fee Name"
                        value={addedFee.name}
                        onChange={(e) =>
                          setAddedFee({ ...addedFee, name: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Description"
                        value={addedFee.description}
                        onChange={(e) =>
                          setAddedFee({
                            ...addedFee,
                            description: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Amount"
                        value={addedFee.amount}
                        onChange={(e) =>
                          setAddedFee({ ...addedFee, amount: e.target.value })
                        }
                      />
                      <Button
                        variant={"info"}
                        onClick={() => {
                          addFee();
                        }}
                      >
                        Add Fee
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button variant={"success"}>Pay Fee</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pay Fees</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-2 justify-center">
                      <Select
                        value={payFee.method}
                        onValueChange={(value) =>
                          setPayFee({ ...payFee, method: value })
                        }
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Method of Payment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Amount"
                        onChange={(e) =>
                          setPayFee({ ...payFee, amount: e.target.value })
                        }
                      />
                      <Button
                        variant={"info"}
                        onClick={() => {
                          payingFee();
                        }}
                      >
                        Add Fee
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
