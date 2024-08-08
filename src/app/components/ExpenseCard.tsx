import Link from "next/link";
import React from "react";

export default function ExpenseCard({
  title,
  amount,
  link,
}: {
  title: string;
  amount: number;
  link: string;
}) {
  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md my-5">
      <div className="p-4 text-center">
        <h2 className="text-xl  font-semibold">{title}</h2>
        <h1 className="text-4xl">&#8377; {String(amount)}</h1>
        <div className="flex justify-between items-center mt-4">
          <Link href={link} className="mx-auto">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
