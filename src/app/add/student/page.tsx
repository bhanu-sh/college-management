"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddStudent() {
  const { data: session } = useSession();

  const router = useRouter();
  const [student, setStudent] = useState({
    f_name: "",
    l_name: "",
    father_name: "",
    mother_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    roll: "",
    aadhar: "",
    course: "",
    session_start_year: "",
    session_end_year: "",
    college_id: session?.user.college_id,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      setStudent({ ...student, college_id: session?.user.college_id });
      const response = await axios.post("/api/student/add", student);
      console.log("Student Added Successfully", response.data);
      toast.success("Student Added");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Adding failed", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      student.f_name.length > 0 &&
      student.l_name.length > 0 &&
      student.father_name.length > 0 &&
      student.mother_name.length > 0 &&
      student.email.length > 0 &&
      student.phone.length > 0 &&
      student.dob.length > 0 &&
      student.gender.length > 0 &&
      student.address.length > 0 &&
      student.city.length > 0 &&
      student.state.length > 0 &&
      student.pincode.length > 0 &&
      student.aadhar.length > 0 &&
      student.course.length > 0 &&
      student.session_start_year.length > 0 &&
      student.session_end_year.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [student]);

  return (
    <div className="flex flex-col w-96 mx-auto justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold mb-3">Add College</h1>
      <hr />
      <div className="flex justify-around items-center">
        <p>Add using Excel?</p>
        <Link className="" href={"/add/student/bulk"}>
          <button className="p-2 border mt-3 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-200">
            Bulk Add
          </button>
        </Link>
      </div>
      <hr />
      <label htmlFor="name">First Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        required
        value={student.f_name}
        placeholder="Name"
        onChange={(e) => {
          setStudent({ ...student, f_name: e.target.value });
        }}
      />
      <label htmlFor="name">Last Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="name"
        type="text"
        required
        value={student.l_name}
        placeholder="Name"
        onChange={(e) => {
          setStudent({ ...student, l_name: e.target.value });
        }}
      />
      <label htmlFor="father_name">Father&apos;s Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="father_name"
        type="text"
        required
        value={student.father_name}
        placeholder="Father's Name"
        onChange={(e) => {
          setStudent({ ...student, father_name: e.target.value });
        }}
      />
      <label htmlFor="mother_name">Mother&apos;s Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="mother_name"
        type="text"
        required
        value={student.mother_name}
        placeholder="Mother's Name"
        onChange={(e) => {
          setStudent({ ...student, mother_name: e.target.value });
        }}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        required
        value={student.email}
        placeholder="Email"
        onChange={(e) => setStudent({ ...student, email: e.target.value })}
      />
      <label htmlFor="phone">Phone</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="phone"
        type="text"
        required
        value={student.phone}
        placeholder="Phone"
        onChange={(e) => setStudent({ ...student, phone: e.target.value })}
      />
      <label htmlFor="dob">Date of Birth</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="dob"
        type="date"
        required
        value={student.dob}
        placeholder="Date of Birth"
        onChange={(e) => setStudent({ ...student, dob: e.target.value })}
      />
      <label htmlFor="gender">Gender</label>
      <select
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="gender"
        required
        value={student.gender}
        onChange={(e) => setStudent({ ...student, gender: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <label htmlFor="address">Address</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="address"
        type="text"
        required
        value={student.address}
        placeholder="Address"
        onChange={(e) => setStudent({ ...student, address: e.target.value })}
      />
      <label htmlFor="city">City</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="city"
        type="text"
        required
        value={student.city}
        placeholder="City"
        onChange={(e) => setStudent({ ...student, city: e.target.value })}
      />
      <label htmlFor="state">State</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="state"
        type="text"
        required
        value={student.state}
        placeholder="State"
        onChange={(e) => setStudent({ ...student, state: e.target.value })}
      />
      <label htmlFor="pincode">Pincode</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="pincode"
        type="text"
        required
        value={student.pincode}
        placeholder="Pincode"
        onChange={(e) => setStudent({ ...student, pincode: e.target.value })}
      />
      <label htmlFor="roll">Roll Number</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="roll"
        type="text"
        value={student.roll}
        placeholder="Roll Number"
        onChange={(e) => setStudent({ ...student, roll: e.target.value })}
      />
      <label htmlFor="aadhar">Aadhar Number</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="aadhar"
        type="text"
        required
        value={student.aadhar}
        placeholder="Aadhar Number"
        onChange={(e) => setStudent({ ...student, aadhar: e.target.value })}
      />
      <label htmlFor="course">Course</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="course"
        type="text"
        required
        value={student.course}
        placeholder="Course"
        onChange={(e) => setStudent({ ...student, course: e.target.value })}
      />
      <label htmlFor="session_start_year">Session Start Year</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="session_start_year"
        type="text"
        required
        value={student.session_start_year}
        placeholder="Session Start Year"
        onChange={(e) =>
          setStudent({ ...student, session_start_year: e.target.value })
        }
      />
      <label htmlFor="session_end_year">Session End Year</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="session_end_year"
        type="text"
        required
        value={student.session_end_year}
        placeholder="Session End Year"
        onChange={(e) =>
          setStudent({ ...student, session_end_year: e.target.value })
        }
      />
      <hr />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
        disabled={buttonDisabled || loading}
        onClick={onSignup}
      >
        Submit
      </button>
    </div>
  );
}
