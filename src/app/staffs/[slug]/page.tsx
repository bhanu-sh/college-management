"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface College {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  slug: string;
}

interface Staff {
  _id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  collegeId: string;
}

export default function StaffPage({ params }: any) {
  const { slug } = params;

  const router = useRouter();

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);

  const getCollege = async (slug: string) => {
    setLoading(true);
    try {
      const collegeRes = await axios.get(`/api/college/getbyslug`, {
        params: { slug },
      });
      const fetchedCollege = collegeRes.data.data;
      setCollege(fetchedCollege);

      try {
        const staffRes = await axios.get("/api/staff/getall");
        const staffs = staffRes.data.data.filter(
          (staff: any) => staff.college_id === fetchedCollege?._id
        );
        console.log(staffs);
        setStaffs(staffs);
      } catch (error: any) {
        console.error("Error fetching staffs:", error);
        console.log(error.message);
      }
    } catch (error: any) {
      console.error("Error fetching college:", error);
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getStudents = async () => {
    try {
      const res = await axios.get("/api/student/getall");
      setStudents(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCollege(slug);
    getStudents();
  }, [slug]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {error ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold">College not found</h1>
              <button
                onClick={() => router.push("/colleges")}
                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go back to colleges
              </button>
            </div>
          ) : (
            <div>
              <h1>Staffs of {college?.name}</h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pincode
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffs.map((staff: Staff) => (
                      <tr key={staff._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {staff.f_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {staff.l_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.city}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {staff.pincode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link href={`/staffs/${staff._id}`}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
