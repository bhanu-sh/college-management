"use client";

import React, { useState } from "react";
import { excelToJson } from "@/helpers/excelToJson";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddStudents() {
  const router = useRouter();

  const { data: session } = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [collegeLock, setCollegeLock] = useState(false);
  const [json, setJson] = useState<any>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getCollegeLock = async () => {
    try {
      console.log("College ID", session?.user.college_id);
      const response = await axios.post("/api/college/getbyid", {
        college_id: session?.user.college_id,
      });
      console.log("College Lock", response.data);
      setCollegeLock(response.data.lock);
    } catch (error: any) {
      console.log("Getting lock failed", error.response);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handlePreview = async () => {
    if (file) {
      const json = await excelToJson(file);
      setJson(json);
      setPreview(true);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        setLoading(true);
        toast.loading("Uploading Students...");
        const json = await excelToJson(file);

        // Convert phone numbers and passwords to strings
        const formattedJson = (json as any[]).map((student: any) => ({
          ...student,
          phone: "" + student.phone,
          password: "" + student.password,
        }));

        console.log("Converted JSON:", formattedJson); // Log the formatted JSON

        const res = await axios.post("/api/student/bulkadd", {
          user: formattedJson,
        });

        if (res.status !== 200) {
          const errorData = res.data;
          console.error("Error:", errorData);
          // Handle error, possibly update state to reflect the error
          return;
        }

        const data = res.data;
        console.log("Response data:", data); // Log the response data
        toast.remove();
        toast.success("Students uploaded successfully");
        router.push("/dashboard/students");
        // Handle success, possibly update state to reflect successful upload
      } catch (error) {
        console.error("An error occurred:", error);
        toast.remove();
        toast.error("An error occurred while uploading Students");
        // Handle error, possibly update state to reflect the error
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No file selected");
      toast.error("No file selected");
      // Handle case where no file is selected
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-red-500">
        Add Students
      </h1>
      <div className="grid w-full max-w-xs items-center gap-1.5">
        <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Upload File
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium file:cursor-pointer"
          id="file_input"
          type="file"
          onChange={handleInput}
        />
      </div>

      <div className="mt-5">
        <button
          className="ml p-2 bg-slate-800 rounded-lg text-white"
          id="preview_button"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button
          className="ml-5 p-2 bg-green-700 rounded-lg text-white"
          id="upload_button"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {loading && <p className="mt-5">Loading...</p>}
      {json && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold text-red-500">JSON Data</h2>
          {/* //table should not exceed 100% of the parent container */}
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full mt-5">
              <thead className="bg-gray-200">
                <tr className="text-left">
                  {Object.keys(json[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {json.map((user: any, index: number) => (
                  <tr key={index} className="border-b">
                    {Object.values(user).map((value: any, index: number) => (
                      <td key={index} className="p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
