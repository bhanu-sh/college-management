"use client"

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TestFeePage() {
  const [fee, setFee] = useState({
    name: "",
    description: "",
    amount: "",
    college_id: "",
    student_id: "",
  });

  return (
    <div>
      <h1> Test Fee Page </h1>
      <label htmlFor="Name">Name</label>
      <input
        type="text"
        id="Name"
        value={fee.name}
        onChange={(e) => setFee({ ...fee, name: e.target.value })}
      />
      <br />
      <label htmlFor="Description">Description</label>
      <input
        type="text"
        id="Description"
        value={fee.description}
        onChange={(e) => setFee({ ...fee, description: e.target.value })}
      />
      <br />
      <label htmlFor="Amount">Amount</label>
      <input
        type="number"
        id="Amount"
        value={fee.amount}
        onChange={(e) => setFee({ ...fee, amount: e.target.value })}
      />
      <br />
      <label htmlFor="CollegeId">College Id</label>
      <input
        type="text"
        id="CollegeId"
        value={fee.college_id}
        onChange={(e) => setFee({ ...fee, college_id: e.target.value })}
      />
      <br />
      <label htmlFor="StudentId">Student Id</label>
      <input
        type="text"
        id="StudentId"
        value={fee.student_id}
        onChange={(e) => setFee({ ...fee, student_id: e.target.value })}
      />
      <br />
      <button
        onClick={async () => {
          try {
            const response = await axios.post("/api/fee/add", fee);
            if (response.data.error) {
              return toast.error(response.data.error);
            }
            toast.success("Fee created successfully");
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      >
        Create Fee
      </button>
    </div>
  );
}
