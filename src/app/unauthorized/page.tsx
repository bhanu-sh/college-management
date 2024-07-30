"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <div>
      <section className="">
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div>
            <p className="text-sm font-medium text-blue-500">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              We can’t find that page
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for doesn&apos;t exist or has been
              moved.
            </p>
            <div className="flex items-center mt-6 gap-x-3">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
              >
                Go back
              </button>
              <Link href="/">
                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
                  Take me home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
