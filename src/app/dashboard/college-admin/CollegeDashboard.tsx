"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import CountCard from "@/app/components/CountCard";
import CollegeLock from "@/app/components/CollegeLock";
import ExpenseCard from "@/app/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/app/components/Loader";
import toast from "react-hot-toast";

interface College {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  slug: string;
  detailsLocked: boolean;
  feesLocked: boolean;
}

const initialExpenseState = {
  name: "",
  description: "",
  amount: 0,
  type: "sent",
  date: new Date(),
};

export default function CollegeDashboard() {
  const { data: session } = useSession();
  const [college, setCollege] = useState<College | null>(null);
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingFees, setPendingFees] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [newExpense, setNewExpense] = useState(initialExpenseState);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const [
        collegeRes,
        studentsRes,
        feesRes,
        staffsRes,
        expensesRes,
        courseRes,
      ] = await Promise.all([
        axios.post(`/api/college/getbyid`, {
          college_id: session?.user.college_id,
        }),
        axios.post(`/api/student/getbycollege`, {
          college_id: session?.user.college_id,
        }),
        axios.post(`/api/fee/getbycollege`, {
          college_id: session?.user.college_id,
        }),
        axios.post(`/api/user/staff/getbycollege`, {
          college_id: session?.user.college_id,
        }),
        axios.post(`/api/expense/getbycollege`, {
          college_id: session?.user.college_id,
        }),
        axios.post(`/api/course/getbycollege`, {
          college_id: session?.user.college_id,
        }),
      ]);

      setCollege(collegeRes.data);
      setStudents(studentsRes.data.data);
      setStaffs(staffsRes.data.data);
      setCourse(courseRes.data.data);

      const totalFees = feesRes.data.data.reduce(
        (acc: number, fee: any) =>
          acc + (fee.type === "fee" ? fee.amount : -fee.amount),
        0
      );
      setPendingFees(totalFees);

      const totalExpenses = expensesRes.data.data.reduce(
        (acc: number, expense: any) =>
          acc + (expense.type === "sent" ? expense.amount : 0),
        0
      );
      setExpenses(totalExpenses);
    } catch (error: any) {
      setError(error.response.data.error);
      console.log("Error", error.response.data.error);
    }
    setLoading(false);
  };

  const handleAddExpense = async () => {
    try {
      await axios.post(`/api/expense/add`, {
        college_id: session?.user.college_id,
        ...newExpense,
      });
      toast.success("Expense Added Successfully");
      setNewExpense(initialExpenseState);
      handleFetchData(); // Refresh data after adding new expense
    } catch (error: any) {
      console.log("Adding failed", error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    if (
      session?.user.college_id &&
      session.user.college_id.length > 0 &&
      session &&
      session.user.college_id !== "undefined"
    ) {
      handleFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    setDisabled(!(newExpense.name && newExpense.amount > 0));
  }, [newExpense]);

  if (
    !session ||
    !session?.user.college_id ||
    session.user.college_id === "undefined"
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-semibold text-gray-500 mb-5">
          No College Added
        </h1>
        <Link href="/dashboard/add/college">
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Add College
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl text-center font-semibold">
            Welcome, {`${session.user.f_name} ${session.user.l_name}`}
          </h1>
          <h1 className="text-lg text-center font-semibold">{college?.name}</h1>
          <div className="flex flex-col justify-center py-5 border-y-2 border-gray-300">
            <h2 className="text-3xl font-bold text-center">Stats:</h2>
            <div className="flex flex-wrap justify-around">
              <CountCard
                title="Students"
                count={students.length}
                link="/dashboard/students"
              />
              <CountCard
                title="Courses"
                count={course.length}
                link="/dashboard/courses"
              />
              <CountCard
                title="Staffs"
                count={staffs.length}
                link="/dashboard/staffs"
              />
            </div>
          </div>
          <hr />
          <div className="flex justify-center gap-8 items-end py-5 border-b-2 border-gray-300">
            <h2 className="text-3xl font-bold">Lock Status:</h2>
            <CollegeLock collegeId={String(session.user.college_id)} />
          </div>
          <hr />
          <div className="flex flex-col justify-center py-5 border-b-2 border-gray-300">
            <h2 className="text-3xl font-bold text-center">Finance:</h2>
            <div className="mx-auto mt-3">
              <Dialog onOpenChange={() => setNewExpense(initialExpenseState)}>
                <DialogTrigger>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400">
                    Add Expense
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col gap-2 justify-center">
                        <Label htmlFor="name">Expense Name *</Label>
                        <Input
                          placeholder="Expense Name"
                          required
                          value={newExpense.name}
                          onChange={(e) =>
                            setNewExpense((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                        <Label htmlFor="description">Description</Label>
                        <Input
                          placeholder="Description"
                          value={newExpense.description}
                          onChange={(e) =>
                            setNewExpense((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                          type="number"
                          placeholder="Amount"
                          required
                          value={newExpense.amount}
                          onChange={(e) =>
                            setNewExpense((prev) => ({
                              ...prev,
                              amount: Number(e.target.value),
                            }))
                          }
                        />
                        <Label htmlFor="date">Date</Label>
                        <Input
                          type="date"
                          value={newExpense.date.toISOString().substring(0, 10)}
                          onChange={(e) =>
                            setNewExpense((prev) => ({
                              ...prev,
                              date: new Date(e.target.value),
                            }))
                          }
                        />
                        <Button
                          disabled={disabled}
                          variant="info"
                          onClick={handleAddExpense}
                        >
                          Add
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap justify-around">
              <ExpenseCard
                title="Spent"
                amount={formatCurrency(expenses)}
                link="/dashboard/expenses"
              />
              <ExpenseCard
                title="Pending Fees"
                amount={formatCurrency(pendingFees)}
                link="/dashboard/fees"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
